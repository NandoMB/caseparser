import { readFileSync, writeFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const jsr = JSON.parse(readFileSync('jsr.json', 'utf8'));

if (jsr.version !== version) {
  jsr.version = version;
  writeFileSync('jsr.json', JSON.stringify(jsr, null, 2) + '\n');
  console.log(`jsr.json version set to ${version}`);
}
