// Runs the projects in examples/ against the current code and compares their output with
// examples/expected-output.txt. Usage: node scripts/test-examples.js [example...]
//
// - npm-based examples install the packed package (the exact tarball that would be published to npm)
// - Deno imports the TypeScript source (what JSR publishes) instead of the published JSR version
// - the browser example gets the local build instead of the CDN file, in headless Chromium
// - the Cloudflare Worker is bundled and served locally by wrangler (workerd runtime), then requested over HTTP
import { execSync, spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const examplesDir = join(root, 'examples');
const expected = readFileSync(join(examplesDir, 'expected-output.txt'), 'utf8').trim();
const examples = process.argv.length > 2
  ? process.argv.slice(2)
  : readdirSync(examplesDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);

const sh = (command, cwd) => execSync(command, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const hasCommand = (command) => {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const tmp = mkdtempSync(join(tmpdir(), 'caseparser-examples-'));
execSync('pnpm run build', { cwd: root, stdio: 'inherit' });
execSync(`pnpm pack --pack-destination ${tmp}`, { cwd: root, stdio: 'ignore' });
const tarball = join(tmp, readdirSync(tmp).find((file) => file.endsWith('.tgz')));

function runNpmExample(dir) {
  sh(`npm install --no-save --no-package-lock --no-audit --no-fund ${tarball}`, dir);
  return sh('npm start --silent', dir);
}

function runDenoExample(dir) {
  const importMap = join(tmp, 'import-map.json');
  writeFileSync(importMap, JSON.stringify({ imports: { '@nandomb/caseparser': pathToFileURL(join(root, 'src/index.ts')).href } }));
  return sh(`deno run --import-map=${importMap} main.ts`, dir);
}

async function runBrowserExample(dir) {
  const { chromium } = await import('playwright');
  const types = { '.html': 'text/html', '.js': 'text/javascript' };
  const server = createServer((req, res) => {
    const file = join(dir, req.url === '/' ? 'index.html' : req.url);
    if (!file.startsWith(dir) || !existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'text/plain' }).end(readFileSync(file));
  });
  await new Promise((done) => server.listen(0, done));

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error));
    await page.route('https://cdn.jsdelivr.net/npm/caseparser@4/dist/index.js', (route) =>
      route.fulfill({ path: join(root, 'dist/index.js'), contentType: 'text/javascript' })
    );
    await page.goto(`http://localhost:${server.address().port}/`);
    await page.waitForSelector('#output[data-done]', { timeout: 10_000 }).catch(() => {
      throw errors[0] ?? new Error('The page did not finish running');
    });
    return await page.textContent('#output');
  } finally {
    await browser.close();
    server.close();
  }
}

async function runWorkerExample(dir) {
  sh(`npm install --no-save --no-package-lock --no-audit --no-fund ${tarball}`, dir);

  const port = await new Promise((done) => {
    const probe = createServer().listen(0, () => {
      const { port } = probe.address();
      probe.close(() => done(port));
    });
  });
  const wrangler = spawn('npx', ['wrangler', 'dev', '--ip', '127.0.0.1', '--port', String(port)], {
    cwd: dir,
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, WRANGLER_SEND_METRICS: 'false' }
  });

  try {
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        if (response.ok) return await response.text();
      } catch {
        // not ready yet
      }
      await new Promise((done) => setTimeout(done, 500));
    }
    throw new Error('wrangler dev did not start within 60s');
  } finally {
    process.kill(-wrangler.pid);
  }
}

const runners = {
  deno: { requires: 'deno', run: runDenoExample },
  bun: { requires: 'bun', run: runNpmExample },
  browser: { run: runBrowserExample },
  'cloudflare-worker': { run: runWorkerExample }
};

let failed = false;
for (const name of examples) {
  const dir = join(examplesDir, name);
  const runner = runners[name] ?? { run: runNpmExample };

  if (runner.requires && !hasCommand(runner.requires)) {
    if (process.env.CI) throw new Error(`${runner.requires} is required to run the ${name} example`);
    console.log(`- ${name}: skipped (${runner.requires} is not installed)`);
    continue;
  }

  let output;
  try {
    output = (await runner.run(dir)).trim();
  } catch (error) {
    failed = true;
    console.error(`✗ ${name}: ${error.stdout || error.message}`);
    continue;
  }

  if (output === expected) {
    console.log(`✓ ${name}`);
  } else {
    failed = true;
    console.error(`✗ ${name}: unexpected output\n--- expected\n${expected}\n--- received\n${output}`);
  }
}

if (failed) process.exit(1);
