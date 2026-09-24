import type { CaseResult, KeepSymbols } from './types.ts';
import { convert } from '../parser/index.ts';
import { ToCamel, ToDot, ToKebab, ToLower, ToPascal, ToPascalSnake, ToPath, ToSentence, ToSnake, ToSpace, ToTitle, ToTrain, ToUpper, ToUpperKebab, ToUpperSnake } from './words.ts';

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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toCamel<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Camel', S> {
  return convert(input, (key) => ToCamel(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Camel', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPascal<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Pascal', S> {
  return convert(input, (key) => ToPascal(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Pascal', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSnake<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Snake', S> {
  return convert(input, (key) => ToSnake(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Snake', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toKebab<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Kebab', S> {
  return convert(input, (key) => ToKebab(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Kebab', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpperSnake<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'UpperSnake', S> {
  return convert(input, (key) => ToUpperSnake(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'UpperSnake', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpperKebab<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'UpperKebab', S> {
  return convert(input, (key) => ToUpperKebab(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'UpperKebab', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toTrain<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Train', S> {
  return convert(input, (key) => ToTrain(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Train', S>;
}

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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toDot<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Dot', S> {
  return convert(input, (key) => ToDot(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Dot', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toTitle<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Title', S> {
  return convert(input, (key) => ToTitle(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Title', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSentence<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Sentence', S> {
  return convert(input, (key) => ToSentence(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Sentence', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPascalSnake<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'PascalSnake', S> {
  return convert(input, (key) => ToPascalSnake(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'PascalSnake', S>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to path/case, keeping the original case of each word.
 *
 * @example
 * ```ts
 * toPath('helloWorld'); // 'hello/World'
 * toPath({ first_name: 'John', userID: 1 }); // { 'first/name': 'John', 'user/ID': 1 }
 * toPath('$hello-world', true); // '$hello/world'
 * ```
 *
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toPath<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Path', S> {
  return convert(input, (key) => ToPath(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Path', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toSpace<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Space', S> {
  return convert(input, (key) => ToSpace(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Space', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toLower<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Lower', S> {
  return convert(input, (key) => ToLower(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Lower', S>;
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
 * @param keepSymbols Symbols (ASCII punctuation, like `$` or `@`) are removed by default.
 * Pass `true` to keep all of them, or an array to keep only some (e.g. `['$']`).
 */
export function toUpper<T extends object | string, S extends boolean | string = false>(input: T, keepSymbols?: S | readonly S[]): CaseResult<T, 'Upper', S> {
  return convert(input, (key) => ToUpper(key, keepSymbols as KeepSymbols)) as CaseResult<T, 'Upper', S>;
}
