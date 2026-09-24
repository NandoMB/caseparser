import type { Prettify } from '../types.ts';

type Separator = '_' | '-' | '.' | ' ';
/** ASCII punctuation, except the separators `_`, `-` and `.`. */
type SymbolChar =
  | '!' | '"' | '#' | '$' | '%' | '&' | "'" | '(' | ')' | '*' | '+' | ',' | '/' | ':' | ';'
  | '<' | '=' | '>' | '?' | '@' | '[' | '\\' | ']' | '^' | '`' | '{' | '|' | '}' | '~';

/**
 * Which symbols the `toX` functions keep: `true` keeps all of them, `false` (the default)
 * removes all of them, and an array keeps only the listed ones (e.g. `['$', '@']`).
 */
export type KeepSymbols = boolean | readonly string[];

type IsUpper<C extends string> = C extends Lowercase<C> ? false : true;
type IsLower<C extends string> = C extends Uppercase<C> ? false : true;
type Push<L extends boolean, W extends string[], Word extends string> = Word extends '' ? W : [...W, L extends true ? Lowercase<Word> : Word];

type RunText<Run> = Run extends string ? Run : '';

/**
 * Splits a string into lowercase words, the same way `words()` does at runtime:
 * on `_`, `-`, `.` and spaces, before an uppercase letter that follows a lowercase
 * letter or a digit (`helloWorld`), and before the last letter of an acronym (`XMLHttp`).
 * Symbols also start a new word; the ones in `S` are kept (see `words()`). Words are lowercased
 * unless `L` is `false`. `Run` holds the kept symbols of the current run of symbols, or `false`
 * outside of one.
 */
type Words<T extends string, S extends string, L extends boolean = true, W extends string[] = [], Word extends string = '', Prev extends string = '', Run extends string | false = false> =
  T extends `${infer C}${infer Rest}`
    ? C extends Separator | SymbolChar
      ? C extends Separator
        ? Words<Rest, S, L, Push<L, W, `${Word}${RunText<Run>}`>, '', '', false>
        : Words<Rest, S, L, W, Word, Prev, `${RunText<Run>}${C extends S ? C : ''}`>
      : Run extends string
        ? Words<Rest, S, L, Push<L, W, Word>, `${Run}${C}`, C, false>
        : IsUpper<C> extends true
          ? Prev extends ''
            ? Words<Rest, S, L, W, `${Word}${C}`, C>
            : IsUpper<Prev> extends false
              ? Words<Rest, S, L, Push<L, W, Word>, C, C>
              : Rest extends `${infer Next}${string}`
                ? IsLower<Next> extends true
                  ? Words<Rest, S, L, Push<L, W, Word>, C, C>
                  : Words<Rest, S, L, W, `${Word}${C}`, C>
                : Words<Rest, S, L, W, `${Word}${C}`, C>
          : Words<Rest, S, L, W, `${Word}${C}`, C>
    : Push<L, W, `${Word}${RunText<Run>}`>;

/** Uppercases the first character that is not a symbol: `'$id'` → `'$Id'`. */
type CapitalizeWord<W> = W extends `${infer C}${infer R}` ? C extends SymbolChar ? `${C}${CapitalizeWord<R>}` : `${Uppercase<C>}${R}` : W;

type Join<W, S extends string> =
  W extends [infer A] ? A & string :
  W extends [infer A, ...infer R] ? `${A & string}${S}${Join<R, S>}` :
  '';
type CapitalizeAll<W> = { [K in keyof W]: CapitalizeWord<W[K] & string> };
type CamelWords<W> = W extends [infer F, ...infer R] ? `${F & string}${Join<CapitalizeAll<R>, ''>}` : '';

/** A case that the `toX` functions (e.g. `toSnake`) convert to. */
export type Case =
  | 'Camel' | 'Pascal' | 'Snake' | 'Kebab' | 'UpperSnake' | 'UpperKebab' | 'Train' | 'Dot' | 'Title' | 'Sentence'
  | 'PascalSnake' | 'Path' | 'Space' | 'Lower' | 'Upper';

/** The symbols kept by a `keepSymbols` argument: `true` → all, `false` → none, `'$' | '@'` → those. */
type KeptSymbols<S> = S extends true ? SymbolChar : S extends false ? never : S & string;

type ConvertKey<K extends string, C extends Case, S extends string> =
  string extends K ? string :
  C extends 'Camel' ? CamelWords<Words<K, S>> :
  C extends 'Pascal' ? Join<CapitalizeAll<Words<K, S>>, ''> :
  C extends 'Snake' ? Join<Words<K, S>, '_'> :
  C extends 'Kebab' ? Join<Words<K, S>, '-'> :
  C extends 'UpperSnake' ? Uppercase<Join<Words<K, S>, '_'>> :
  C extends 'UpperKebab' ? Uppercase<Join<Words<K, S>, '-'>> :
  C extends 'Train' ? Join<CapitalizeAll<Words<K, S>>, '-'> :
  C extends 'Dot' ? Join<Words<K, S, false>, '.'> :
  C extends 'Title' ? Join<CapitalizeAll<Words<K, S>>, ' '> :
  C extends 'Sentence' ? CapitalizeWord<Join<Words<K, S>, ' '>> :
  C extends 'PascalSnake' ? Join<CapitalizeAll<Words<K, S>>, '_'> :
  C extends 'Path' ? Join<Words<K, S, false>, '/'> :
  C extends 'Space' ? Join<Words<K, S, false>, ' '> :
  C extends 'Lower' ? Join<Words<K, S>, ' '> :
  C extends 'Upper' ? Uppercase<Join<Words<K, S>, ' '>> :
  never;

/**
 * The type returned by a `toX` function: strings stay `string`, and object keys
 * in any case (deeply, including inside arrays) are renamed to the case `C`.
 * `S` is the `keepSymbols` argument (`false` by default).
 */
export type CaseResult<T, C extends Case, S = false> =
  T extends string ? string :
  T extends Array<unknown> ? {
    [K in keyof T]: CaseResult<T[K], C, S>
  } :
  T extends object ? Prettify<{
    [K in keyof T as boolean extends S ? string : string extends KeptSymbols<S> ? string : ConvertKey<K & string, C, KeptSymbols<S>>]: CaseResult<T[K], C, S>
  }> :
  T
;
