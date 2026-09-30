import * as caseparser from 'caseparser-5.1.0';
import type { Library } from './types.ts';

export default {
  name: 'caseparser@5.1.0',
  packages: ['caseparser-5.1.0'],
  keys: {
    camel: (input) => caseparser.toCamel(input),
    pascal: (input) => caseparser.toPascal(input),
    snake: (input) => caseparser.toSnake(input),
    kebab: (input) => caseparser.toKebab(input),
    'upper snake': (input) => caseparser.toUpperSnake(input),
    'upper kebab': (input) => caseparser.toUpperKebab(input),
    train: (input) => caseparser.toTrain(input),
    title: (input) => caseparser.toTitle(input),
    sentence: (input) => caseparser.toSentence(input),
    'pascal snake': (input) => caseparser.toPascalSnake(input),
    lower: (input) => caseparser.toLower(input),
    upper: (input) => caseparser.toUpper(input),
    dot: (input) => caseparser.toDot(input, { transform: 'lowercase' }),
    path: (input) => caseparser.toPath(input, { transform: 'lowercase' }),
  },
  strings: { camel: (input) => caseparser.toCamel(input), snake: (input) => caseparser.toSnake(input) },
  typedKeys: '✅',
} satisfies Library;
