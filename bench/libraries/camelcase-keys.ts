import camelcaseKeys from 'camelcase-keys';
import type { Library } from './types.ts';

export default {
  name: 'camelcase-keys',
  packages: ['camelcase-keys'],
  keys: {
    camel: (input) => camelcaseKeys(input, { deep: true }),
    pascal: (input) => camelcaseKeys(input, { deep: true, pascalCase: true }),
  },
  skipKey: (input, key) => camelcaseKeys(input as Record<string, unknown>, { deep: true, exclude: [key] }),
  typedKeys: '✅',
} satisfies Library;
