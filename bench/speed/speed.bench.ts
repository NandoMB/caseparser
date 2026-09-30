import { writeFileSync } from 'node:fs';
import { afterAll, describe, test } from 'vitest';
import { environment, runtime } from '../common/environment.ts';
import { report, type Round, type SpeedResults } from './report.ts';
import { scenarios } from './scenarios.ts';

// The order of the libraries rotates between rounds, so no library is always measured first or last
const ROUNDS = 3;
const OPTIONS = { time: 500, warmupTime: 200 };

const results: SpeedResults['scenarios'] = [];

describe('speed', () => {
  for (const scenario of scenarios) {
    test(scenario.name, { timeout: 600_000 }, async ({ bench }) => {
      const measured = scenario.tasks.filter((task) => task.isCorrect());
      const rounds: Record<string, Round[]> = Object.fromEntries(measured.map((task) => [task.library, []]));
      for (let round = 0; round < ROUNDS; round++) {
        const order = [...measured.slice(round % measured.length), ...measured.slice(0, round % measured.length)];
        const roundResults = await bench.compare(...order.map((task) => bench(task.library, task.run)), OPTIONS);
        for (const task of order) {
          const { latency } = roundResults.get(task.library);
          rounds[task.library].push({ median: latency.p50, p99: latency.p99, rme: latency.rme, samples: latency.samplesCount });
        }
      }
      const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
      results.push({
        name: scenario.name,
        unsupported: scenario.unsupported,
        wrongOutput: scenario.tasks.filter((task) => !measured.includes(task)).map((task) => task.library),
        libraries: Object.fromEntries(
          Object.entries(rounds).map(([library, list]) => [library, { rounds: list, mean: { median: mean(list.map((r) => r.median)), p99: mean(list.map((r) => r.p99)) } }]),
        ),
      });
    });
  }
});

afterAll(() => {
  if (results.length !== scenarios.length) {
    console.warn('Some scenarios were not run (filtered?), so results/ was not updated.');
    return;
  }
  const command = `pnpm bench${runtime.id === 'node' ? '' : `:${runtime.id}`}`;
  const data: SpeedResults = { command, environment: environment(), method: { rounds: ROUNDS, ...OPTIONS }, unit: 'ms', scenarios: results };
  writeFileSync(new URL(`../results/speed-${runtime.id}.json`, import.meta.url), `${JSON.stringify(data, null, 2)}\n`);
  report(runtime.id);
});
