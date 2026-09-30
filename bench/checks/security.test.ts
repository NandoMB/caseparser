import { expect, test } from 'vitest';
import { keysLibraries } from '../libraries/index.ts';

const libraries = keysLibraries.filter((library) => library.name !== 'caseparser@5.1.0');
const targets = ['camel', 'snake'] as const;

test('Converting untrusted input with a `__proto__` or `constructor` key', async () => {
  const payloads = {
    'At the top level': '{"__proto__":{"is_admin":true,"isAdmin":true},"user_name":"x","userName":"x"}',
    'Inside an array': '[{"__proto__":{"is_admin":true,"isAdmin":true}}]',
  };
  const protoRows: string[] = [];
  const constructorPayload = '{"user_id":1,"userId":1,"constructor":"x","nested_obj":{"constructor":{"inner_key":2}},"nestedObj":{"constructor":{"innerKey":2}}}';
  const constructorRows: string[] = [];

  for (const library of libraries) {
    for (const target of targets) {
      const convert = library.keys[target];
      if (!convert) continue;
      const cells = Object.values(payloads).map((payload) => {
        const result = convert(JSON.parse(payload));
        const object = Array.isArray(result) ? result[0] : result;
        const replaced = Object.getPrototypeOf(object) !== Object.prototype || object.isAdmin === true || object.is_admin === true;
        return replaced ? '❌ prototype replaced, the result inherits `isAdmin: true`' : '✅';
      });
      protoRows.push(`| ${library.name} | ${target} | ${cells.join(' | ')} |`);

      let cell: string;
      try {
        const result = convert(JSON.parse(constructorPayload));
        const nested = result?.[target === 'camel' ? 'nestedObj' : 'nested_obj'];
        if (result === undefined) cell = '❌ returns `undefined`';
        else if (!nested || !((target === 'camel' ? 'innerKey' : 'inner_key') in nested.constructor)) cell = '❌ the object is not converted';
        else cell = '✅';
      } catch (error) {
        cell = `❌ throws \`${(error as Error).message}\``;
      }
      constructorRows.push(`| ${library.name} | ${target} | ${cell} |`);
    }
  }
  expect(({} as Record<string, unknown>).isAdmin).toBeUndefined();

  const content = [
    '### A `__proto__` key',
    '',
    `| Library | To | ${Object.keys(payloads).join(' | ')} |`,
    `| --- | --- |${' --- |'.repeat(Object.keys(payloads).length)}`,
    ...protoRows,
    '',
    '### A `constructor` key',
    '',
    '| Library | To | Object with a `constructor` key |',
    '| --- | --- | --- |',
    ...constructorRows,
    '',
  ].join('\n');
  await expect(content).toMatchFileSnapshot('../results/security.md');
});
