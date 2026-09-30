import snakecaseKeys from 'snakecase-keys';
import type { Convert, Library } from './types.ts';

const withDelimiter = (delimiter: string): Convert => (input) => snakecaseKeys(input, { parsingOptions: { delimiter } });

export default {
  name: 'snakecase-keys',
  packages: ['snakecase-keys'],
  keys: {
    snake: (input) => snakecaseKeys(input),
    kebab: withDelimiter('-'),
    lower: withDelimiter(' '),
    dot: withDelimiter('.'),
    path: withDelimiter('/'),
  },
  skipKey: (input, key) => snakecaseKeys(input as Record<string, unknown>, { exclude: [key] }),
  typedKeys: '✅',
} satisfies Library;
