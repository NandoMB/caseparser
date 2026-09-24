import type { KeepSymbols } from './types.ts';

// ASCII punctuation, except the separators `_`, `-` and `.`
const SYMBOLS = '!"#$%&\'()*+,/:;<=>?@[\\]^`{|}~';

const isSeparator = (c: string) => c === '_' || c === '-' || c === '.' || c === ' ';
const isSymbol = (c: string) => SYMBOLS.indexOf(c) !== -1;
const isUpper = (c: string) => c !== c.toLowerCase();
const isLower = (c: string) => c !== c.toUpperCase();
const isKept = (c: string, keep: KeepSymbols) =>
  keep === true || (typeof keep !== 'boolean' && keep !== undefined && keep !== null && keep.indexOf(c) !== -1);

/**
 * Splits a string in any case into lowercase words: on `_`, `-`, `.` and spaces,
 * before an uppercase letter that follows a lowercase letter or a digit (`helloWorld`),
 * and before the last letter of an acronym (`XMLHttp`). Mirrors the `Words` type.
 *
 * Symbols (ASCII punctuation) also start a new word. They are removed, unless `keep` is
 * `true` or lists them: a kept symbol sticks to the start of the next word (`hello$World`
 * → `hello`, `$world`), or to the end of the previous one when no word follows (`total%`).
 */
export function words(str: string, keep: KeepSymbols = false): string[] {
  const result: string[] = [];
  let word = '';
  let prev = '';
  const push = () => {
    if (word) result.push(word.toLowerCase());
    word = '';
  };
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (isSeparator(c)) {
      push();
      prev = '';
      continue;
    }
    if (isSymbol(c)) {
      let kept = '';
      let j = i;
      for (; j < str.length && isSymbol(str[j]); j++) if (isKept(str[j], keep)) kept += str[j];
      const next = str.charAt(j);
      if (next && !isSeparator(next)) {
        push();
        prev = '';
      }
      word += kept;
      i = j - 1;
      continue;
    }
    const next = str.charAt(i + 1);
    // `prev` is empty at the start of a word, even after kept symbols (`$Hello` is one word)
    if (isUpper(c) && prev && (!isUpper(prev) || (next && isLower(next)))) push();
    word += c;
    prev = c;
  }
  push();
  return result;
}

/** Uppercases the first character that is not a symbol: `'$id'` → `'$Id'`. */
function capitalize(word: string): string {
  let i = 0;
  while (i < word.length && isSymbol(word[i])) i++;
  return word.slice(0, i) + word.charAt(i).toUpperCase() + word.slice(i + 1);
}

type Formatter = (str: string, keep?: KeepSymbols) => string;
export const ToCamel: Formatter = (str, keep) => words(str, keep).map((w, i) => (i ? capitalize(w) : w)).join('');
export const ToPascal: Formatter = (str, keep) => words(str, keep).map(capitalize).join('');
export const ToSnake: Formatter = (str, keep) => words(str, keep).join('_');
export const ToDash: Formatter = (str, keep) => words(str, keep).join('-');
export const ToUpperSnake: Formatter = (str, keep) => words(str, keep).join('_').toUpperCase();
export const ToUpperDash: Formatter = (str, keep) => words(str, keep).join('-').toUpperCase();
export const ToTrain: Formatter = (str, keep) => words(str, keep).map(capitalize).join('-');
export const ToDot: Formatter = (str, keep) => words(str, keep).join('.');
export const ToTitle: Formatter = (str, keep) => words(str, keep).map(capitalize).join(' ');
export const ToSentence: Formatter = (str, keep) => capitalize(words(str, keep).join(' '));
