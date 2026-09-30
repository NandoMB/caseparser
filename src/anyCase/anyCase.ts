import type { AllowSymbols, CaseOptions, CaseResult, PathCaseOptions, PathSeparator, Transform, TransformCaseOptions } from './types.ts';
import { convert } from '../parser/index.ts';
import { toKeep, type Keep, ToCamel, ToDot, ToKebab, ToLower, ToPascal, ToPascalSnake, ToPath, ToSentence, ToSnake, ToSpace, ToTitle, ToTrain, ToUpper, ToUpperKebab, ToUpperSnake } from './words.ts';

interface ParsedOptions {
  keep: Keep;
  transform?: Transform;
  separator?: PathSeparator;
  ignore?: readonly string[];
}

const KEEP_NONE: ParsedOptions = { keep: false };
const KEEP_ALL: ParsedOptions = { keep: true };

/** Reads the second argument of a `toX` function: the `allowSymbols` shorthand, or an options object. */
function parseOptions(options: AllowSymbols | PathCaseOptions | undefined): ParsedOptions {
  if (options === undefined || options === false) return KEEP_NONE;
  if (options === true) return KEEP_ALL;
  if (typeof options === 'object' && options !== null && !Array.isArray(options)) {
    const { allowSymbols, transform, separator, ignore } = options as PathCaseOptions;
    return { keep: toKeep(allowSymbols as AllowSymbols | undefined), transform, separator, ignore };
  }
  return { keep: toKeep(options as AllowSymbols) };
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to camelCase.
 *
 * @example
 * ```ts
 * toCamel('hello_world'); // 'helloWorld'
 * toCamel({ first_name: 'John', userID: 1 }); // { firstName: 'John', userId: 1 }
 * toCamel('$hello-world', true); // '$helloWorld'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toCamel<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Camel', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to camelCase.
 *
 * @example
 * ```ts
 * toCamel('$hello-world', { allowSymbols: ['$'] }); // '$helloWorld'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toCamel<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Camel', S, undefined, '/', I>;
export function toCamel(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToCamel(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to PascalCase.
 *
 * @example
 * ```ts
 * toPascal('hello-world'); // 'HelloWorld'
 * toPascal({ 'first-name': 'John', userID: 1 }); // { FirstName: 'John', UserId: 1 }
 * toPascal('$hello-world', true); // '$HelloWorld'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPascal<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Pascal', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to PascalCase.
 *
 * @example
 * ```ts
 * toPascal('$hello-world', { allowSymbols: ['$'] }); // '$HelloWorld'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toPascal<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Pascal', S, undefined, '/', I>;
export function toPascal(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToPascal(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to snake_case.
 *
 * @example
 * ```ts
 * toSnake('helloWorld'); // 'hello_world'
 * toSnake({ firstName: 'John', userID: 1 }); // { first_name: 'John', user_id: 1 }
 * toSnake('$hello-world', true); // '$hello_world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSnake<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Snake', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to snake_case.
 *
 * @example
 * ```ts
 * toSnake('$hello-world', { allowSymbols: ['$'] }); // '$hello_world'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toSnake<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Snake', S, undefined, '/', I>;
export function toSnake(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToSnake(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to kebab-case.
 *
 * @example
 * ```ts
 * toKebab('HELLO_WORLD'); // 'hello-world'
 * toKebab({ FIRST_NAME: 'John', userID: 1 }); // { 'first-name': 'John', 'user-id': 1 }
 * toKebab('$hello-world', true); // '$hello-world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toKebab<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Kebab', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to kebab-case.
 *
 * @example
 * ```ts
 * toKebab('$hello-world', { allowSymbols: ['$'] }); // '$hello-world'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toKebab<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Kebab', S, undefined, '/', I>;
export function toKebab(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToKebab(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * toUpperSnake('hello-world'); // 'HELLO_WORLD'
 * toUpperSnake({ 'first-name': 'John', userID: 1 }); // { FIRST_NAME: 'John', USER_ID: 1 }
 * toUpperSnake('$hello-world', true); // '$HELLO_WORLD'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpperSnake<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'UpperSnake', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * toUpperSnake('$hello-world', { allowSymbols: ['$'] }); // '$HELLO_WORLD'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toUpperSnake<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'UpperSnake', S, undefined, '/', I>;
export function toUpperSnake(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToUpperSnake(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER-KEBAB-CASE.
 *
 * @example
 * ```ts
 * toUpperKebab('helloWorld'); // 'HELLO-WORLD'
 * toUpperKebab({ firstName: 'John', userID: 1 }); // { 'FIRST-NAME': 'John', 'USER-ID': 1 }
 * toUpperKebab('$hello-world', true); // '$HELLO-WORLD'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpperKebab<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'UpperKebab', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER-KEBAB-CASE.
 *
 * @example
 * ```ts
 * toUpperKebab('$hello-world', { allowSymbols: ['$'] }); // '$HELLO-WORLD'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toUpperKebab<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'UpperKebab', S, undefined, '/', I>;
export function toUpperKebab(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToUpperKebab(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Train-Case.
 *
 * @example
 * ```ts
 * toTrain('hello_world'); // 'Hello-World'
 * toTrain({ first_name: 'John', userID: 1 }); // { 'First-Name': 'John', 'User-Id': 1 }
 * toTrain('$hello-world', true); // '$Hello-World'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toTrain<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Train', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Train-Case.
 *
 * @example
 * ```ts
 * toTrain('$hello-world', { allowSymbols: ['$'] }); // '$Hello-World'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toTrain<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Train', S, undefined, '/', I>;
export function toTrain(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToTrain(key, keep), ignore);
}

// The options overload comes first: after the shorthand one, editors don't suggest the `transform` values
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to dot.case, keeping the original case of each word.
 *
 * @example
 * ```ts
 * toDot('$hello-World', { allowSymbols: ['$'] }); // '$hello.World'
 * toDot('helloWorld', { transform: 'lowercase' }); // 'hello.world'
 * toDot('helloWorld', { transform: 'uppercase' }); // 'HELLO.WORLD'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 * `transform`: the original case of each word is kept by default; `'lowercase'` or `'uppercase'` changes the case of the whole result.
 */
export function toDot<T extends object | string, S extends boolean | string = false, X extends Transform | undefined = undefined, I extends string = never>(input: T, options: TransformCaseOptions<S, X, I>): CaseResult<T, 'Dot', S, X, '/', I>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to dot.case, keeping the original case of each word.
 *
 * @example
 * ```ts
 * toDot('HelloWorld'); // 'Hello.World'
 * toDot({ FirstName: 'John', userID: 1 }); // { 'First.Name': 'John', 'user.ID': 1 }
 * toDot('$hello-world', true); // '$hello.world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toDot<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Dot', S>;
export function toDot(input: object | string, options?: AllowSymbols | TransformCaseOptions): unknown {
  const { keep, transform, ignore } = parseOptions(options);
  return convert(input, (key) => ToDot(key, keep, transform), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Title Case.
 *
 * @example
 * ```ts
 * toTitle('hello_world'); // 'Hello World'
 * toTitle({ first_name: 'John', userID: 1 }); // { 'First Name': 'John', 'User Id': 1 }
 * toTitle('$hello-world', true); // '$Hello World'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toTitle<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Title', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Title Case.
 *
 * @example
 * ```ts
 * toTitle('$hello-world', { allowSymbols: ['$'] }); // '$Hello World'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toTitle<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Title', S, undefined, '/', I>;
export function toTitle(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToTitle(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Sentence case.
 *
 * @example
 * ```ts
 * toSentence('helloWorld'); // 'Hello world'
 * toSentence({ firstName: 'John', userID: 1 }); // { 'First name': 'John', 'User id': 1 }
 * toSentence('$hello-world', true); // '$Hello world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSentence<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Sentence', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Sentence case.
 *
 * @example
 * ```ts
 * toSentence('$hello-world', { allowSymbols: ['$'] }); // '$Hello world'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toSentence<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Sentence', S, undefined, '/', I>;
export function toSentence(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToSentence(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Pascal_Snake_Case (also known as Ada_Case).
 *
 * @example
 * ```ts
 * toPascalSnake('helloWorld'); // 'Hello_World'
 * toPascalSnake({ first_name: 'John', userID: 1 }); // { First_Name: 'John', User_Id: 1 }
 * toPascalSnake('$hello-world', true); // '$Hello_World'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPascalSnake<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'PascalSnake', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Pascal_Snake_Case (also known as Ada_Case).
 *
 * @example
 * ```ts
 * toPascalSnake('$hello-world', { allowSymbols: ['$'] }); // '$Hello_World'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toPascalSnake<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'PascalSnake', S, undefined, '/', I>;
export function toPascalSnake(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToPascalSnake(key, keep), ignore);
}

// The options overload comes first: after the shorthand one, editors don't suggest the `transform` values
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to path/case, keeping the original case of each word.
 * `/` and `\\` in the input also separate words.
 *
 * @example
 * ```ts
 * toPath('$hello-World', { allowSymbols: ['$'] }); // '$hello/World'
 * toPath('helloWorld', { transform: 'lowercase' }); // 'hello/world'
 * toPath('helloWorld', { transform: 'uppercase' }); // 'HELLO/WORLD'
 * toPath('users/profilePicture', { separator: '\\' }); // 'users\\profile\\Picture'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 * `transform`: the original case of each word is kept by default; `'lowercase'` or `'uppercase'` changes the case of the whole result.
 * `separator`: `'/'` (the default) or `'\\'`.
 */
export function toPath<T extends object | string, S extends boolean | string = false, X extends Transform | undefined = undefined, P extends PathSeparator = '/', I extends string = never>(input: T, options: PathCaseOptions<S, X, P, I>): CaseResult<T, 'Path', S, X, P, I>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to path/case, keeping the original case of each word.
 * `/` and `\\` in the input also separate words.
 *
 * @example
 * ```ts
 * toPath('helloWorld'); // 'hello/World'
 * toPath({ first_name: 'John', userID: 1 }); // { 'first/name': 'John', 'user/ID': 1 }
 * toPath('$hello-world', true); // '$hello/world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPath<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Path', S>;
export function toPath(input: object | string, options?: AllowSymbols | PathCaseOptions): unknown {
  const { keep, transform, separator, ignore } = parseOptions(options);
  return convert(input, (key) => ToPath(key, keep, transform, separator === '\\' ? '\\' : '/'), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to space case, keeping the original case of each word.
 *
 * @example
 * ```ts
 * toSpace('helloWorld'); // 'hello World'
 * toSpace({ first_name: 'John', userID: 1 }); // { 'first name': 'John', 'user ID': 1 }
 * toSpace('$hello-world', true); // '$hello world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSpace<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Space', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to space case, keeping the original case of each word.
 *
 * @example
 * ```ts
 * toSpace('$hello-world', { allowSymbols: ['$'] }); // '$hello world'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toSpace<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Space', S, undefined, '/', I>;
export function toSpace(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToSpace(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to lower case (space separated).
 *
 * @example
 * ```ts
 * toLower('helloWorld'); // 'hello world'
 * toLower({ first_name: 'John', userID: 1 }); // { 'first name': 'John', 'user id': 1 }
 * toLower('$hello-world', true); // '$hello world'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toLower<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Lower', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to lower case (space separated).
 *
 * @example
 * ```ts
 * toLower('$hello-world', { allowSymbols: ['$'] }); // '$hello world'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toLower<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Lower', S, undefined, '/', I>;
export function toLower(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToLower(key, keep), ignore);
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER CASE (space separated).
 *
 * @example
 * ```ts
 * toUpper('helloWorld'); // 'HELLO WORLD'
 * toUpper({ first_name: 'John', userID: 1 }); // { 'FIRST NAME': 'John', 'USER ID': 1 }
 * toUpper('$hello-world', true); // '$HELLO WORLD'
 * ```
 *
 * @param allowSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpper<T extends object | string, S extends boolean | string = false>(input: T, allowSymbols?: S | readonly S[]): CaseResult<T, 'Upper', S>;
/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER CASE (space separated).
 *
 * @example
 * ```ts
 * toUpper('$hello-world', { allowSymbols: ['$'] }); // '$HELLO WORLD'
 * ```
 *
 * @param options `allowSymbols`: symbols are removed by default; `true` keeps all of them, and an array keeps only some.
 */
export function toUpper<T extends object | string, S extends boolean | string = false, I extends string = never>(input: T, options: CaseOptions<S, I>): CaseResult<T, 'Upper', S, undefined, '/', I>;
export function toUpper(input: object | string, options?: AllowSymbols | CaseOptions): unknown {
  const { keep, ignore } = parseOptions(options);
  return convert(input, (key) => ToUpper(key, keep), ignore);
}
