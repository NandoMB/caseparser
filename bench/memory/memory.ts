import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { environment } from '../common/environment.ts';
import { keysLibraries } from '../libraries/index.ts';
import { report, type MemoryResults } from './report.ts';
import { MEMORY_SCENARIOS, type MemoryScenario, type Target } from './worker.ts';

const ROUNDS = 3;
// A young generation large enough that no garbage collection runs during one call
const NODE_FLAGS = ['--expose-gc', '--max-semi-space-size=64'];
const SEED = 20260928;

// mulberry32, so the order can be reproduced with the seed
let seed = SEED;
const random = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const shuffle = <T>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const measurements: Array<{ library: string; target: Target; scenario: MemoryScenario }> = keysLibraries.flatMap((library) => {
  const targets = (['camel', 'snake'] as const).filter((target) => library.keys[target]);
  return targets.flatMap((target, i) => MEMORY_SCENARIOS.filter((scenario) => scenario !== 'module' || i === 0).map((scenario) => ({ library: library.name, target, scenario })));
});

const rounds = new Map<string, unknown[]>();
const id = (m: (typeof measurements)[number]) => `${m.library} ${m.target} ${m.scenario}`;
for (let round = 0; round < ROUNDS; round++) {
  for (const m of shuffle(measurements)) {
    const output = execFileSync(process.execPath, [...NODE_FLAGS, 'memory/worker.ts', m.library, m.target, m.scenario], { cwd: new URL('..', import.meta.url), encoding: 'utf8' });
    rounds.set(id(m), [...(rounds.get(id(m)) ?? []), JSON.parse(output)]);
    process.stdout.write('.');
  }
}
process.stdout.write('\n');

const data: MemoryResults = {
  command: 'pnpm memory',
  environment: environment(),
  method: { rounds: ROUNDS, nodeFlags: NODE_FLAGS.join(' '), seed: SEED, samplesPerCall: 51 },
  unit: 'bytes',
  measurements: measurements.map((m) => {
    const list = rounds.get(id(m)) as Array<Record<string, number>>;
    const keys = ['bytes', 'allocated', 'result', 'temporary'].filter((key) => typeof list[0][key] === 'number');
    const mean = Object.fromEntries(keys.map((key) => [key, list.reduce((sum, r) => sum + r[key], 0) / list.length]));
    return { ...m, rounds: list, mean } as MemoryResults['measurements'][number];
  }),
};
writeFileSync(new URL('../results/memory.json', import.meta.url), `${JSON.stringify(data, null, 2)}\n`);
report();
