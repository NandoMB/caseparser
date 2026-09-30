import humps from 'humps';
import type { Convert, Library } from './types.ts';

const withSeparator = (separator: string): Convert => (input) => humps.decamelizeKeys(input, { separator });

export default {
  name: 'humps',
  packages: ['humps'],
  keys: {
    camel: (input) => humps.camelizeKeys(input),
    pascal: (input) => humps.pascalizeKeys(input),
    snake: (input) => humps.decamelizeKeys(input),
    kebab: withSeparator('-'),
    lower: withSeparator(' '),
    dot: withSeparator('.'),
    path: withSeparator('/'),
  },
  strings: { camel: (input) => humps.camelize(input), snake: (input) => humps.decamelize(input) },
  skipKey: (input, key) => humps.camelizeKeys(input, (k, convert) => (k === key ? k : convert(k))),
  typedKeys: '❌ `object`',
} satisfies Library;
