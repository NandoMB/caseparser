// The second argument is the depth: without it, only the first level is converted
import { camelCase, snakeCase } from 'change-case';
import * as keys from 'change-case/keys';
import type { Library } from './types.ts';

export default {
  name: 'change-case',
  packages: ['change-case'],
  keys: {
    camel: (input) => keys.camelCase(input, Infinity),
    pascal: (input) => keys.pascalCase(input, Infinity),
    snake: (input) => keys.snakeCase(input, Infinity),
    kebab: (input) => keys.kebabCase(input, Infinity),
    'upper snake': (input) => keys.constantCase(input, Infinity),
    'upper kebab': (input) => keys.constantCase(input, Infinity, { delimiter: '-' }),
    train: (input) => keys.trainCase(input, Infinity),
    title: (input) => keys.capitalCase(input, Infinity),
    sentence: (input) => keys.sentenceCase(input, Infinity),
    'pascal snake': (input) => keys.capitalCase(input, Infinity, { delimiter: '_' }),
    lower: (input) => keys.noCase(input, Infinity),
    upper: (input) => keys.constantCase(input, Infinity, { delimiter: ' ' }),
    dot: (input) => keys.dotCase(input, Infinity),
    path: (input) => keys.pathCase(input, Infinity),
  },
  strings: { camel: camelCase, snake: snakeCase },
  typedKeys: '❌ `unknown`',
} satisfies Library;
