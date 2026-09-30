import camelcaseKeys from './camelcase-keys.ts';
import caseAnything from './case-anything.ts';
import caseparser from './caseparser.ts';
import caseparser510 from './caseparser-5.1.0.ts';
import changeCase from './change-case.ts';
import esToolkit from './es-toolkit.ts';
import humps from './humps.ts';
import lodash from './lodash.ts';
import snakecaseKeys from './snakecase-keys.ts';
import type { Library } from './types.ts';

export { CASES, type Case, type Convert, type Library } from './types.ts';

export const libraries: Library[] = [caseparser, caseparser510, changeCase, camelcaseKeys, snakecaseKeys, humps, esToolkit, lodash, caseAnything];

export const keysLibraries = libraries.filter((library) => Object.keys(library.keys).length > 0);

export const stringsLibraries = libraries.filter((library) => library.strings);

export { FILES } from './files.ts';
