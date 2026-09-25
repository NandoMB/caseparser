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
export type AllowSymbols = boolean | readonly string[];

/**
 * @deprecated Renamed to `AllowSymbols`. It will be removed in the next major version.
 */
export type KeepSymbols = AllowSymbols;

/** Changes the case of the whole result: `'lowercase'` or `'uppercase'`. */
export type Transform = 'uppercase' | 'lowercase';

/** The options of the `toX` functions. `S` is inferred from `allowSymbols`. */
export interface CaseOptions<S = boolean | string> {
  /** Symbols are removed by default. `true` keeps all of them, and an array keeps only the listed ones (e.g. `['$']`). */
  allowSymbols?: S | readonly S[];
}

/** The options of `toDot` and `toPath`, which also take a `transform`. `X` is inferred from `transform`. */
export interface TransformCaseOptions<S = boolean | string, X extends Transform | undefined = Transform | undefined> extends CaseOptions<S> {
  /** The original case of each word is kept by default. `'lowercase'` or `'uppercase'` changes the case of the whole result. */
  transform?: X;
}

/** The separator that `toPath` joins the words with: `'/'` (the default) or `'\\'`. */
export type PathSeparator = '/' | '\\';

/** The options of `toPath`, which also take a `separator`. `P` is inferred from `separator`. */
export interface PathCaseOptions<S = boolean | string, X extends Transform | undefined = Transform | undefined, P extends PathSeparator = PathSeparator> extends TransformCaseOptions<S, X> {
  /** Joins the words with `'/'` (the default) or `'\\'`. */
  separator?: P;
}

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
/** In a path, `/` and `\\` also separate words: they are replaced with a space before splitting, like `ToPath` does. */
type PathSeparatorsToSpace<T extends string> =
  T extends `${infer A}/${infer B}` ? PathSeparatorsToSpace<`${A} ${B}`> :
  T extends `${infer A}\\${infer B}` ? PathSeparatorsToSpace<`${A} ${B}`> :
  T;
type CamelWords<W> = W extends [infer F, ...infer R] ? `${F & string}${Join<CapitalizeAll<R>, ''>}` : '';

/** A case that the `toX` functions (e.g. `toSnake`) convert to. */
export type Case =
  | 'Camel' | 'Pascal' | 'Snake' | 'Kebab' | 'UpperSnake' | 'UpperKebab' | 'Train' | 'Dot' | 'Title' | 'Sentence'
  | 'PascalSnake' | 'Path' | 'Space' | 'Lower' | 'Upper';

/** The symbols kept by an `allowSymbols` argument: `true` → all, `false` → none, `'$' | '@'` → those. */
type KeptSymbols<S> = S extends true ? SymbolChar : S extends false ? never : S & string;

/** Applies a `transform` to a converted key, or falls back to `string` when it is only known at runtime. */
type ApplyTransform<K extends string, X> =
  [X] extends [undefined] ? K :
  [X] extends ['lowercase'] ? Lowercase<K> :
  [X] extends ['uppercase'] ? Uppercase<K> :
  string;

type ConvertKey<K extends string, C extends Case, S extends string, P extends string = '/'> =
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
  C extends 'Path' ? Join<Words<PathSeparatorsToSpace<K>, S, false>, P> :
  C extends 'Space' ? Join<Words<K, S, false>, ' '> :
  C extends 'Lower' ? Join<Words<K, S>, ' '> :
  C extends 'Upper' ? Uppercase<Join<Words<K, S>, ' '>> :
  never;

/**
 * The type returned by a `toX` function: strings stay `string`, and object keys
 * in any case (deeply, including inside arrays) are renamed to the case `C`.
 * `S` is the `allowSymbols` argument (`false` by default), `X` the `transform` option of `toDot` and `toPath`,
 * and `P` the `separator` option of `toPath`.
 */
export type CaseResult<T, C extends Case, S = false, X = undefined, P extends string = '/'> =
  T extends string ? string :
  T extends Array<unknown> ? {
    [K in keyof T]: CaseResult<T[K], C, S, X, P>
  } :
  T extends object ? Prettify<{
    [K in keyof T as boolean extends S ? string : string extends KeptSymbols<S> ? string : ApplyTransform<ConvertKey<K & string, C, KeptSymbols<S>, P>, X>]: CaseResult<T[K], C, S, X, P>
  }> :
  T
;
