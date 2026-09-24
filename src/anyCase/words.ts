import { Capitalize } from '../utils.ts';

const isSeparator = (c: string) => c === '_' || c === '-' || c === '.' || c === ' ';
const isUpper = (c: string) => c !== c.toLowerCase();
const isLower = (c: string) => c !== c.toUpperCase();

/**
 * Splits a string in any case into lowercase words: on `_`, `-`, `.` and spaces,
 * before an uppercase letter that follows a lowercase letter or a digit (`helloWorld`),
 * and before the last letter of an acronym (`XMLHttp`). Mirrors the `Words` type.
 */
export function words(str: string): string[] {
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
    const next = str.charAt(i + 1);
    if (isUpper(c) && word && (!isUpper(prev) || (next && isLower(next)))) push();
    word += c;
    prev = c;
  }
  push();
  return result;
}

export const ToCamel = (str: string): string => words(str).map((w, i) => (i ? Capitalize(w) : w)).join('');
export const ToPascal = (str: string): string => words(str).map(Capitalize).join('');
export const ToSnake = (str: string): string => words(str).join('_');
export const ToDash = (str: string): string => words(str).join('-');
export const ToUpperSnake = (str: string): string => words(str).join('_').toUpperCase();
export const ToUpperDash = (str: string): string => words(str).join('-').toUpperCase();
export const ToTrain = (str: string): string => words(str).map(Capitalize).join('-');
export const ToDot = (str: string): string => words(str).join('.');
export const ToTitle = (str: string): string => words(str).map(Capitalize).join(' ');
export const ToSentence = (str: string): string => Capitalize(words(str).join(' '));
