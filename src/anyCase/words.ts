import type { AllowSymbols, PathSeparator, Transform } from './types.ts';

// ASCII punctuation, except the separators `_`, `-` and `.`
const SYMBOLS = '!"#$%&\'()*+,/:;<=>?@[\\]^`{|}~';

const OTHER = 0;
const SEPARATOR = 1;
const SYMBOL = 2;
const UPPER = 3;
const LOWER = 4;

const KINDS = new Uint8Array(128);
for (let code = 65; code <= 90; code++) KINDS[code] = UPPER;
for (let code = 97; code <= 122; code++) KINDS[code] = LOWER;
for (let i = 0; i < SYMBOLS.length; i++) KINDS[SYMBOLS.charCodeAt(i)] = SYMBOL;
for (const separator of '_-. ') KINDS[separator.charCodeAt(0)] = SEPARATOR;

// In a path, `/` and `\` also separate words
const PATH_KINDS = KINDS.slice();
PATH_KINDS[47] = SEPARATOR;
PATH_KINDS[92] = SEPARATOR;

// Non-ASCII characters are checked by changing their case (e.g. `É`)
function kindAt(str: string, i: number, kinds: Uint8Array): number {
  const code = str.charCodeAt(i);
  if (code < 128) return kinds[code];
  const c = str[i];
  if (c !== c.toLowerCase()) return UPPER;
  return c !== c.toUpperCase() ? LOWER : OTHER;
}

function isLowerAt(str: string, i: number): boolean {
  if (i >= str.length) return false;
  const code = str.charCodeAt(i);
  if (code < 128) return KINDS[code] === LOWER;
  const c = str[i];
  return c !== c.toUpperCase();
}

/** The symbols to keep: `false` (none), `true` (all), or a table by char code of the listed ones. */
export type Keep = boolean | Uint8Array;

export function toKeep(allowSymbols: AllowSymbols | undefined): Keep {
  if (allowSymbols === true) return true;
  if (!allowSymbols) return false;
  const table = new Uint8Array(128);
  for (let i = 0; i < SYMBOLS.length; i++) if (allowSymbols.indexOf(SYMBOLS[i]) !== -1) table[SYMBOLS.charCodeAt(i)] = 1;
  return table;
}

const NONE = 0;
const PREV_UPPER = 1;
const PREV_OTHER = 2;

const HAS_UPPER = 1;
const HAS_NON_ASCII = 2;

export type WordCase = 'lower' | 'upper' | 'keep';

function toCase(word: string, flags: number, wordCase: WordCase): string {
  if (wordCase === 'lower') return flags === 0 ? word : word.toLowerCase();
  if (wordCase === 'upper') {
    return flags & HAS_NON_ASCII ? word.toLowerCase().toUpperCase() : word.toUpperCase();
  }
  return word;
}

/**
 * Splits a string in any case into lowercase words: on `_`, `-`, `.` and spaces,
 * before an uppercase letter that follows a lowercase letter or a digit (`helloWorld`),
 * and before the last letter of an acronym (`XMLHttp`). Mirrors the `Words` type.
 *
 * Symbols (ASCII punctuation) also start a new word. They are removed, unless `keep` is
 * `true` or lists them: a kept symbol sticks to the start of the next word (`hello$World`
 * → `hello`, `$world`), or to the end of the previous one when no word follows (`total%`).
 * Words are uppercased when `wordCase` is `'upper'`, and keep their original case when it's `'keep'`.
 */
export function words(str: string, keep: Keep = false, wordCase: WordCase = 'lower', path = false): string[] {
  const kinds = path ? PATH_KINDS : KINDS;
  const length = str.length;
  const result: string[] = [];
  let start = 0;
  let prefix = '';
  let flags = 0;
  let prev = NONE;

  for (let i = 0; i < length; i++) {
    const kind = kindAt(str, i, kinds);

    if (kind === SEPARATOR) {
      if (i > start || prefix) result.push(toCase(prefix + str.slice(start, i), flags, wordCase));
      start = i + 1;
      prefix = '';
      flags = 0;
      prev = NONE;
      continue;
    }

    if (kind === SYMBOL) {
      let kept = '';
      let j = i;
      for (; j < length; j++) {
        const code = str.charCodeAt(j);
        if (code >= 128 || kinds[code] !== SYMBOL) break;
        if (keep === true || (keep !== false && keep[code] === 1)) kept += str[j];
      }
      const word = prefix + str.slice(start, i);
      if (j < length && kinds[str.charCodeAt(j)] !== SEPARATOR) {
        if (word) result.push(toCase(word, flags, wordCase));
        prefix = kept;
        prev = NONE;
      } else if (word || kept) {
        result.push(toCase(word + kept, flags, wordCase));
        prefix = '';
      }
      flags = 0;
      start = j;
      i = j - 1;
      continue;
    }

    if (kind === UPPER) {
      if (prev !== NONE && (prev !== PREV_UPPER || isLowerAt(str, i + 1))) {
        const word = prefix + str.slice(start, i);
        if (word) result.push(toCase(word, flags, wordCase));
        start = i;
        prefix = '';
        flags = 0;
      }
      flags |= HAS_UPPER;
      prev = PREV_UPPER;
    } else {
      prev = PREV_OTHER;
    }
    if (str.charCodeAt(i) >= 128) flags |= HAS_NON_ASCII;
  }
  if (length > start || prefix) result.push(toCase(prefix + str.slice(start), flags, wordCase));
  return result;
}

/** Uppercases the first character that is not a symbol: `'$id'` → `'$Id'`. */
function capitalize(word: string): string {
  const code = word.charCodeAt(0);
  if (code >= 97 && code <= 122) return String.fromCharCode(code - 32) + word.slice(1);
  let i = 0;
  while (i < word.length && word.charCodeAt(i) < 128 && KINDS[word.charCodeAt(i)] === SYMBOL) i++;
  return word.slice(0, i) + word.charAt(i).toUpperCase() + word.slice(i + 1);
}

function join(list: string[], separator: string, first: boolean, rest: boolean): string {
  let result = '';
  for (let i = 0; i < list.length; i++) {
    if (i === 0) result = first ? capitalize(list[0]) : list[0];
    else result += separator + (rest ? capitalize(list[i]) : list[i]);
  }
  return result;
}

/** Changes the case of the whole string, or keeps it when `transform` is `undefined`. */
function applyTransform(str: string, transform?: Transform): string {
  if (transform === 'lowercase') return str.toLowerCase();
  if (transform === 'uppercase') return str.toUpperCase();
  return str;
}

type Formatter = (str: string, keep?: Keep) => string;
type TransformFormatter = (str: string, keep?: Keep, transform?: Transform) => string;
type PathFormatter = (str: string, keep?: Keep, transform?: Transform, separator?: PathSeparator) => string;

export const ToCamel: Formatter = (str, keep) => join(words(str, keep), '', false, true);
export const ToPascal: Formatter = (str, keep) => join(words(str, keep), '', true, true);
export const ToSnake: Formatter = (str, keep) => join(words(str, keep), '_', false, false);
export const ToKebab: Formatter = (str, keep) => join(words(str, keep), '-', false, false);
export const ToUpperSnake: Formatter = (str, keep) => join(words(str, keep, 'upper'), '_', false, false);
export const ToUpperKebab: Formatter = (str, keep) => join(words(str, keep, 'upper'), '-', false, false);
export const ToTrain: Formatter = (str, keep) => join(words(str, keep), '-', true, true);
export const ToDot: TransformFormatter = (str, keep, transform) => applyTransform(join(words(str, keep, 'keep'), '.', false, false), transform);
export const ToTitle: Formatter = (str, keep) => join(words(str, keep), ' ', true, true);
export const ToSentence: Formatter = (str, keep) => join(words(str, keep), ' ', true, false);
export const ToPascalSnake: Formatter = (str, keep) => join(words(str, keep), '_', true, true);
export const ToPath: PathFormatter = (str, keep, transform, separator = '/') =>
  applyTransform(join(words(str, keep, 'keep', true), separator, false, false), transform);
export const ToSpace: Formatter = (str, keep) => join(words(str, keep, 'keep'), ' ', false, false);
export const ToLower: Formatter = (str, keep) => join(words(str, keep), ' ', false, false);
export const ToUpper: Formatter = (str, keep) => join(words(str, keep, 'upper'), ' ', false, false);
