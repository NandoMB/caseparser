// Usage: node --expose-gc --max-semi-space-size=64 memory/worker.ts <library> <camel|snake> <scenario>
import { PerformanceObserver } from 'node:perf_hooks';
import { apiResponse, smallObject, uniqueKeys } from '../common/fixtures.ts';
import { FILES } from '../libraries/files.ts';
import type { Library } from '../libraries/types.ts';

/**
 * - `module`: the heap used by importing the library's file.
 * - `api`, `small`, `unique`: the heap allocated by one call, split into the result and the temporary
 *   memory (garbage) the call leaves behind.
 * - `retained`: the heap still used after converting 256,000 unique keys and dropping the results,
 *   like a cache kept between calls.
 */
export const MEMORY_SCENARIOS = ['module', 'api', 'small', 'unique', 'retained'] as const;
export type MemoryScenario = (typeof MEMORY_SCENARIOS)[number];
export type Target = 'camel' | 'snake';

declare const gc: () => void;
const heap = () => process.memoryUsage().heapUsed;
const collect = () => {
  gc();
  gc();
};
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

// Counts garbage collections, to discard a call during which one ran
let collections = 0;
new PerformanceObserver((list) => (collections += list.getEntries().length)).observe({ entryTypes: ['gc'] });

const SAMPLES = 51;

async function run(name: string, target: Target, scenario: MemoryScenario) {
  const load = async () => ((await import(`../libraries/${FILES[name]}`)).default as Library).keys[target]!;
  const from = target === 'camel' ? 'snake' : 'camel';
  const inputs = { api: apiResponse[from], small: smallObject[from], pool: uniqueKeys[from] };

  if (scenario === 'module') {
    collect();
    const before = heap();
    const convert = await load();
    collect();
    return { bytes: heap() - before, loaded: typeof convert === 'function' };
  }

  const convert = await load();
  if (scenario === 'retained') {
    for (let i = 0; i < 1000; i++) convert(inputs.small);
    collect();
    const before = heap();
    for (const object of inputs.pool) convert(object);
    collect();
    return { bytes: heap() - before };
  }

  let next = 0;
  const input = () => (scenario === 'api' ? inputs.api : scenario === 'small' ? inputs.small : inputs.pool[next++]);
  for (let i = 0; i < (scenario === 'unique' ? 50 : 500); i++) convert(input());

  const overhead = median(
    Array.from({ length: SAMPLES }, () => {
      collect();
      const before = heap();
      return heap() - before;
    }),
  );

  const allocated: number[] = [];
  const result: number[] = [];
  let discarded = 0;
  while (allocated.length < SAMPLES) {
    const value = input();
    collect();
    const gcBefore = collections;
    const before = heap();
    let output: unknown = convert(value);
    const after = heap();
    if (collections !== gcBefore) {
      discarded++;
      continue;
    }
    collect();
    const kept = heap();
    if (output === undefined) throw new Error('No result');
    output = undefined;
    allocated.push(after - before - overhead);
    result.push(kept - before);
  }
  return { allocated: median(allocated), result: median(result), temporary: median(allocated) - median(result), discarded, samples: { allocated, result } };
}

if (import.meta.main) {
  const [name, target, scenario] = process.argv.slice(2) as [string, Target, MemoryScenario];
  if (typeof gc !== 'function') throw new Error('Run with --expose-gc');
  if (!FILES[name] || !['camel', 'snake'].includes(target) || !MEMORY_SCENARIOS.includes(scenario)) {
    throw new Error(`Unknown library, case or scenario: ${process.argv.slice(2).join(' ')}`);
  }
  console.log(JSON.stringify(await run(name, target, scenario)));
}
