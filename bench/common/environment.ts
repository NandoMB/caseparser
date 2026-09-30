import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import { libraries } from '../libraries/index.ts';

declare const Bun: { version: string } | undefined;
declare const Deno: { version: { deno: string; v8: string } } | undefined;

export const runtime =
  typeof Bun !== 'undefined'
    ? { id: 'bun', name: `Bun ${Bun.version} (JavaScriptCore)` }
    : typeof Deno !== 'undefined'
      ? { id: 'deno', name: `Deno ${Deno.version.deno} (V8 ${Deno.version.v8})` }
      : { id: 'node', name: `Node.js ${process.version} (V8 ${process.versions.v8})` };

const readJson = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const git = (command: string) => execSync(`git ${command}`, { encoding: 'utf8', cwd: new URL('.', import.meta.url) }).trim();

export function environment() {
  return {
    date: new Date().toISOString(),
    runtime: runtime.name,
    cpu: `${os.cpus()[0].model} (${os.cpus().length} cores), ${Math.round(os.totalmem() / 2 ** 30)} GB`,
    os: `${os.type()} ${os.release()} (${os.arch()})`,
    caseparser: {
      version: readJson('../../package.json').version,
      commit: git('rev-parse --short HEAD'),
      uncommittedChanges: git('status --porcelain -- ../../src') !== '',
    },
    packages: Object.fromEntries(
      libraries.flatMap((library) => library.packages).map((name) => [name, readJson(`../node_modules/${name}/package.json`).version]),
    ),
  };
}

export function environmentList(env: ReturnType<typeof environment>): string {
  return [
    `- Date: ${env.date.slice(0, 10)}`,
    `- caseparser: ${env.caseparser.version} (commit ${env.caseparser.commit}${env.caseparser.uncommittedChanges ? ', with uncommitted changes in src' : ''}), built with \`pnpm run build\``,
    `- Libraries: ${Object.entries(env.packages).map(([name, version]) => `${name.replace(/-5\.1\.0$/, '')} ${version}`).join(', ')}`,
    `- Runtime: ${env.runtime}`,
    `- CPU: ${env.cpu}`,
    `- OS: ${env.os}`,
  ].join('\n');
}
