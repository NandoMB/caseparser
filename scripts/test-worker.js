// Runs examples/cloudflare-worker on workerd with the packed package, and compares its response with Node.js
import { execSync, spawn } from 'node:child_process';
import { mkdtempSync, readdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

const root = resolve(import.meta.dirname, '..');
const dir = join(root, 'examples/cloudflare-worker');

execSync('pnpm run build', { cwd: root, stdio: 'inherit' });
const tmp = mkdtempSync(join(tmpdir(), 'caseparser-worker-'));
execSync(`pnpm pack --pack-destination ${tmp}`, { cwd: root, stdio: 'ignore' });
const tarball = join(tmp, readdirSync(tmp).find((file) => file.endsWith('.tgz')));
execSync(`npm install --no-save --no-package-lock --no-audit --no-fund ${tarball}`, { cwd: dir, stdio: 'inherit' });

const { conversions } = await import(join(dir, 'src/conversions.js'));
const expected = JSON.parse(JSON.stringify(conversions(await import(join(root, 'dist/index.js')))));

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
  env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
});

let received;
try {
  const deadline = Date.now() + 60_000;
  while (received === undefined) {
    if (Date.now() > deadline) throw new Error('wrangler dev did not start within 60s');
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) received = await response.json();
    } catch {}
    if (received === undefined) await new Promise((done) => setTimeout(done, 500));
  }
} finally {
  process.kill(-wrangler.pid);
}

if (isDeepStrictEqual(received, expected)) {
  console.log('✓ The Worker returned the same conversions as Node.js');
} else {
  console.error(`✗ The Worker returned different conversions\n--- expected\n${JSON.stringify(expected, null, 2)}\n--- received\n${JSON.stringify(received, null, 2)}`);
  process.exit(1);
}
