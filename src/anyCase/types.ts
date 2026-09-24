import type { Prettify } from '../types.ts';

type Separator = '_' | '-' | '.' | ' ';
type IsUpper<C extends string> = C extends Lowercase<C> ? false : true;
type IsLower<C extends string> = C extends Uppercase<C> ? false : true;
type Push<W extends string[], Word extends string> = Word extends '' ? W : [...W, Lowercase<Word>];

/**
 * Splits a string into lowercase words, the same way `words()` does at runtime:
 * on `_`, `-`, `.` and spaces, before an uppercase letter that follows a lowercase
 * letter or a digit (`helloWorld`), and before the last letter of an acronym (`XMLHttp`).
 */
type Words<T extends string, W extends string[] = [], Word extends string = '', Prev extends string = ''> =
  T extends `${infer C}${infer Rest}`
    ? C extends Separator
      ? Words<Rest, Push<W, Word>, '', ''>
      : IsUpper<C> extends true
        ? Word extends ''
          ? Words<Rest, W, C, C>
          : IsUpper<Prev> extends false
            ? Words<Rest, Push<W, Word>, C, C>
            : Rest extends `${infer Next}${string}`
              ? IsLower<Next> extends true
                ? Words<Rest, Push<W, Word>, C, C>
                : Words<Rest, W, `${Word}${C}`, C>
              : Words<Rest, W, `${Word}${C}`, C>
        : Words<Rest, W, `${Word}${C}`, C>
    : Push<W, Word>;

type Join<W, S extends string> =
  W extends [infer A] ? A & string :
  W extends [infer A, ...infer R] ? `${A & string}${S}${Join<R, S>}` :
  '';
type CapitalizeAll<W> = { [K in keyof W]: Capitalize<W[K] & string> };
type CamelWords<W> = W extends [infer F, ...infer R] ? `${F & string}${Join<CapitalizeAll<R>, ''>}` : '';

/** A case that the `toX` functions (e.g. `toSnake`) convert to. */
export type Case = 'Camel' | 'Pascal' | 'Snake' | 'Dash' | 'UpperSnake' | 'UpperDash' | 'Train' | 'Dot' | 'Title' | 'Sentence';

type ConvertKey<K extends string, C extends Case> =
  string extends K ? string :
  C extends 'Camel' ? CamelWords<Words<K>> :
  C extends 'Pascal' ? Join<CapitalizeAll<Words<K>>, ''> :
  C extends 'Snake' ? Join<Words<K>, '_'> :
  C extends 'Dash' ? Join<Words<K>, '-'> :
  C extends 'UpperSnake' ? Uppercase<Join<Words<K>, '_'>> :
  C extends 'UpperDash' ? Uppercase<Join<Words<K>, '-'>> :
  C extends 'Train' ? Join<CapitalizeAll<Words<K>>, '-'> :
  C extends 'Dot' ? Join<Words<K>, '.'> :
  C extends 'Title' ? Join<CapitalizeAll<Words<K>>, ' '> :
  C extends 'Sentence' ? Capitalize<Join<Words<K>, ' '>> :
  never;

/**
 * The type returned by a `toX` function: strings stay `string`, and object keys
 * in any case (deeply, including inside arrays) are renamed to the case `C`.
 */
export type CaseResult<T, C extends Case> =
  T extends string ? string :
  T extends Array<unknown> ? {
    [K in keyof T]: CaseResult<T[K], C>
  } :
  T extends object ? Prettify<{
    [K in keyof T as ConvertKey<K & string, C>]: CaseResult<T[K], C>
  }> :
  T
;
