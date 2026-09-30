import { toCamelCaseKeys, toConstantCaseKeys, toKebabCaseKeys, toPascalCaseKeys, toSnakeCaseKeys } from 'es-toolkit/object';
import { camelCase, snakeCase } from 'es-toolkit/string';
import type { Library } from './types.ts';

export default {
  name: 'es-toolkit',
  packages: ['es-toolkit'],
  keys: {
    camel: (input) => toCamelCaseKeys(input),
    pascal: (input) => toPascalCaseKeys(input),
    snake: (input) => toSnakeCaseKeys(input),
    kebab: (input) => toKebabCaseKeys(input),
    'upper snake': (input) => toConstantCaseKeys(input),
  },
  strings: { camel: camelCase, snake: snakeCase },
  typedKeys: '⚠️ some keys typed differently from the result',
} satisfies Library;
