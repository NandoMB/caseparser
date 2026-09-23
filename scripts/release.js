import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const run = (command) => execSync(command, { stdio: 'inherit' });
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const tag = `v${version}`;

const remoteTag = execSync(`git ls-remote --tags origin refs/tags/${tag}`, { encoding: 'utf8' }).trim();
if (remoteTag) {
  console.log(`${tag} was already released, nothing to publish.`);
  process.exit(0);
}

run('pnpm run lint');
run('pnpm run test');
run('pnpm run build');
console.log(`GitHub OIDC available: ${Boolean(process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN)}`);
run('npm stage publish --provenance --loglevel verbose');
run('pnpm changeset git-tag');

console.log(`\n${tag} staged on npm. Approve it at https://www.npmjs.com/package/caseparser (Staged Packages tab) to publish it.`);
