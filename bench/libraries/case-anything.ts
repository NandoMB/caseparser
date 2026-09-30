import { camelCase, snakeCase } from 'case-anything';
import type { Library } from './types.ts';

export default {
  name: 'case-anything',
  packages: ['case-anything'],
  keys: {},
  strings: { camel: camelCase, snake: snakeCase },
} satisfies Library;
