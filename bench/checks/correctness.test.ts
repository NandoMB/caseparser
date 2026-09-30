import { describe, expect, test } from 'vitest';
import { apiResponse, apiResponseIn, edgeCases, uniqueKeys, uniqueKeysObjectIn } from '../common/fixtures.ts';
import { stringsLibraries } from '../libraries/index.ts';
import { scenarios } from '../speed/scenarios.ts';

const countKeys = (value: unknown): number => {
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + countKeys(item), 0);
  if (typeof value !== 'object' || value === null) return 0;
  return Object.entries(value).reduce((sum, [, item]) => sum + 1 + countKeys(item), 0);
};

describe('fixtures', () => {
  test('The API response has the number of keys in the scenario name', () => {
    expect(countKeys(apiResponse.snake)).toBe(2104);
    expect(countKeys(apiResponse.camel)).toBe(2104);
  });

  test('The unique keys pool is larger than the camelcase-keys cache (2 × 100,000 keys) and has no repeated key', () => {
    for (const pool of [uniqueKeys.snake, uniqueKeys.camel]) {
      const keys = new Set(pool.flatMap((object) => Object.keys(object)));
      expect(keys.size).toBe(256_000);
    }
  });

  test('The data by case is the same as the data written by hand, in snake_case and camelCase', () => {
    expect(apiResponseIn('snake')).toStrictEqual(apiResponse.snake);
    expect(apiResponseIn('camel')).toStrictEqual(apiResponse.camel);
    uniqueKeys.snake.forEach((object, i) => expect(uniqueKeysObjectIn('snake', i)).toStrictEqual(object));
    uniqueKeys.camel.forEach((object, i) => expect(uniqueKeysObjectIn('camel', i)).toStrictEqual(object));
  });
});

describe('correctness', () => {
  test.each(scenarios.map((scenario) => [scenario.name, scenario] as const))('caseparser returns the expected output: %s', (_, scenario) => {
    for (const task of scenario.tasks.filter((task) => task.library.startsWith('caseparser'))) {
      expect(task.isCorrect(), task.library).toBe(true);
    }
  });

  test('Libraries returning the expected output in each scenario', { timeout: 120_000 }, async () => {
    const rows = scenarios.map((scenario) => {
      const results = scenario.tasks.map((task) => `${task.isCorrect() ? '✅' : '❌'} ${task.library}`);
      return `| ${scenario.name} | ${results.join('<br>')} |`;
    });
    const table = ['| Scenario | Libraries |', '| --- | --- |', ...rows].join('\n');
    await expect(`${table}\n`).toMatchFileSnapshot('../results/correctness.md');
  });

  test('Output of each library for edge cases', async () => {
    const names = stringsLibraries.map((library) => library.name);
    const cell = (value: string) => `\`${value.replace(/\|/g, '\\|')}\``;
    const section = (direction: 'camel' | 'snake') => [
      `| Input | ${names.join(' | ')} |`,
      `| --- |${names.map(() => ' --- |').join('')}`,
      ...edgeCases.map((input) => `| ${cell(input)} | ${stringsLibraries.map((library) => cell(library.strings![direction](input))).join(' | ')} |`),
    ].join('\n');
    const content = `### camelCase\n\n${section('camel')}\n\n### snake_case\n\n${section('snake')}\n`;
    await expect(content).toMatchFileSnapshot('../results/edge-cases.md');
  });
});
