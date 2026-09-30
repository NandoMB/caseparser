import { readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { describe, expect, test } from 'vitest';
import { inputCase } from '../common/fixtures.ts';
import { CASES, keysLibraries, type Case, type Library } from '../libraries/index.ts';

// caseparser 5.1.0 is only compared for speed and memory
const libraries = keysLibraries.filter((library) => library.name !== 'caseparser@5.1.0');

const main = (library: Library) => (library.keys.camel ? { convert: library.keys.camel, target: 'camel' as const } : { convert: library.keys.snake!, target: 'snake' as const });
const key = (target: 'camel' | 'snake', ...words: string[]) =>
  target === 'snake' ? words.join('_') : words.map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word)).join('');

const checks: Array<[string, (library: Library) => boolean | string]> = [
  [
    'Input keys in any case, mixed in one object',
    (library) => {
      const { convert, target } = main(library);
      const input = { user_id: 1, FirstName: 2, 'last-name': 3, ACCOUNT_STATUS: 4, 'Display Name': 5, 'Content-Type': 6, 'billing.address': 7, emailAddress: 8 };
      const expected = { [key(target, 'user', 'id')]: 1, [key(target, 'first', 'name')]: 2, [key(target, 'last', 'name')]: 3, [key(target, 'account', 'status')]: 4, [key(target, 'display', 'name')]: 5, [key(target, 'content', 'type')]: 6, [key(target, 'billing', 'address')]: 7, [key(target, 'email', 'address')]: 8 };
      return isDeepStrictEqual(convert(input), expected);
    },
  ],
  [
    'Nested objects',
    (library) => {
      const { convert, target } = main(library);
      return isDeepStrictEqual(convert({ a_b: { c_d: { e_f: 1 } } }), { [key(target, 'a', 'b')]: { [key(target, 'c', 'd')]: { [key(target, 'e', 'f')]: 1 } } });
    },
  ],
  [
    'Objects inside arrays',
    (library) => {
      const { convert, target } = main(library);
      return isDeepStrictEqual(convert({ a_b: [{ c_d: 1 }, [{ e_f: 2 }]] }), { [key(target, 'a', 'b')]: [{ [key(target, 'c', 'd')]: 1 }, [{ [key(target, 'e', 'f')]: 2 }]] });
    },
  ],
  [
    'An array as the input',
    (library) => {
      const { convert, target } = main(library);
      return isDeepStrictEqual(convert([{ a_b: 1 }]), [{ [key(target, 'a', 'b')]: 1 }]);
    },
  ],
  [
    '`Date` values still work',
    (library) => {
      const result = main(library).convert({ date: new Date(0) });
      try {
        return result.date.getTime() === 0;
      } catch {
        return false;
      }
    },
  ],
  [
    '`Map` values still work',
    (library) => {
      const result = main(library).convert({ map: new Map([['a_b', 1]]) });
      try {
        return result.map instanceof Map && result.map.get('a_b') === 1;
      } catch {
        return false;
      }
    },
  ],
  [
    'Class instances',
    (library) => {
      class User { first_name = 'Ada'; }
      const user = new User();
      const result = main(library).convert({ user }).user;
      if (result === user) return 'kept as they are';
      if (result instanceof User) return 'keys converted, class kept';
      return 'converted to a plain object';
    },
  ],
  [
    "Doesn't change the input",
    (library) => {
      const input = { first_name: 1, list_items: [{ item_id: 1 }], meta_data: { created_at: 1 } };
      const before = JSON.stringify(input);
      main(library).convert(input);
      return JSON.stringify(input) === before;
    },
  ],
  [
    'Option to skip keys',
    (library) => {
      if (!library.skipKey) return false;
      const { target } = main(library);
      return isDeepStrictEqual(library.skipKey({ skip_me: 1, keep_going: 2 }, 'skip_me'), { skip_me: 1, [key(target, 'keep', 'going')]: 2 });
    },
  ],
];

const nodeModules = join(import.meta.dirname, '..', 'node_modules');
function dependencies(name: string, dir = nodeModules, seen = new Set<string>()): Set<string> {
  const packageDir = realpathSync(join(dir, name));
  const siblings = dirname(name.startsWith('@') ? dirname(packageDir) : packageDir);
  const { dependencies: deps = {} } = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
  for (const dep of Object.keys(deps)) {
    if (seen.has(dep)) continue;
    seen.add(dep);
    dependencies(dep, siblings, seen);
  }
  return seen;
}
const version = (library: Library) =>
  library.packages.length
    ? library.packages.map((name) => JSON.parse(readFileSync(join(nodeModules, name, 'package.json'), 'utf8')).version).join(', ')
    : `${JSON.parse(readFileSync(join(import.meta.dirname, '..', '..', 'package.json'), 'utf8')).version} + current source`;

describe('features', () => {
  test.each(libraries.flatMap((library) => Object.entries(library.keys).map(([target, convert]) => [library.name, target, convert] as const)))(
    '%s converts keys to the %s case',
    (_, target, convert) => {
      const from = CASES[inputCase(target as Case)];
      expect(convert({ [from]: 1, nested_obj: { [from]: 2 } })).toEqual(expect.objectContaining({ [CASES[target as Case]]: 1 }));
    },
  );

  test('caseparser has every feature and no dependencies', () => {
    const caseparser = libraries[0];
    expect(Object.fromEntries(checks.map(([name, check]) => [name, check(caseparser)]))).toEqual({
      'Input keys in any case, mixed in one object': true,
      'Nested objects': true,
      'Objects inside arrays': true,
      'An array as the input': true,
      '`Date` values still work': true,
      '`Map` values still work': true,
      'Class instances': 'kept as they are',
      "Doesn't change the input": true,
      'Option to skip keys': true,
    });
    expect(dependencies('..', join(import.meta.dirname, '..')).size).toBe(0);
  });

  test('Features of each library', async () => {
    const cell = (value: boolean | string) => (typeof value === 'string' ? value : value ? '✅' : '❌');
    const rows = [
      ['Version', ...libraries.map(version)],
      ['Target cases', ...libraries.map((library) => `${Object.keys(library.keys).length}: ${Object.keys(library.keys).join(', ')}`)],
      ...checks.map(([name, check]) => [name, ...libraries.map((library) => cell(check(library)))]),
      ['Typed keys', ...libraries.map((library) => library.typedKeys ?? '')],
      ['Dependencies (installed packages)', ...libraries.map((library) => String(library.packages.reduce((all, name) => new Set([...all, ...dependencies(name)]), new Set<string>()).size))],
    ];
    const table = [`| | ${libraries.map((library) => library.name).join(' | ')} |`, `| --- |${' --- |'.repeat(libraries.length)}`, ...rows.map((row) => `| ${row.join(' | ')} |`)].join('\n');
    await expect(`${table}\n`).toMatchFileSnapshot('../results/features.md');
  });
});
