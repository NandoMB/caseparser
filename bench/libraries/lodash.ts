import { camelCase, snakeCase } from 'lodash-es';
import type { Library } from './types.ts';

export default {
  name: 'lodash',
  packages: ['lodash-es'],
  keys: {},
  strings: { camel: camelCase, snake: snakeCase },
} satisfies Library;
