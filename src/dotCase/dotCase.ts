import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to camelCase.
 *
 * @example
 * ```ts
 * dotToCamel('hello.world'); // 'helloWorld'
 * dotToCamel({ 'first.name': 'John' }); // { firstName: 'John' }
 * ```
 *
 * @deprecated Use `toCamel` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToCamel<T extends object | string>(input: T): Result<T, 'DotToCamel'> {
  return converter(input, 'DotToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to PascalCase.
 *
 * @example
 * ```ts
 * dotToPascal('hello.world'); // 'HelloWorld'
 * dotToPascal({ 'first.name': 'John' }); // { FirstName: 'John' }
 * ```
 *
 * @deprecated Use `toPascal` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToPascal<T extends object | string>(input: T): Result<T, 'DotToPascal'> {
  return converter(input, 'DotToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to snake_case.
 *
 * @example
 * ```ts
 * dotToSnake('hello.world'); // 'hello_world'
 * dotToSnake({ 'first.name': 'John' }); // { first_name: 'John' }
 * ```
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToSnake<T extends object | string>(input: T): Result<T, 'DotToSnake'> {
  return converter(input, 'DotToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to dash-case.
 *
 * @example
 * ```ts
 * dotToDash('hello.world'); // 'hello-world'
 * dotToDash({ 'first.name': 'John' }); // { 'first-name': 'John' }
 * ```
 *
 * @deprecated Use `toKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToDash<T extends object | string>(input: T): Result<T, 'DotToDash'> {
  return converter(input, 'DotToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * dotToUpperSnake('hello.world'); // 'HELLO_WORLD'
 * dotToUpperSnake({ 'first.name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 *
 * @deprecated Use `toUpperSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToUpperSnake<T extends object | string>(input: T): Result<T, 'DotToUpperSnake'> {
  return converter(input, 'DotToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * dotToUpperDash('hello.world'); // 'HELLO-WORLD'
 * dotToUpperDash({ 'first.name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 *
 * @deprecated Use `toUpperKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToUpperDash<T extends object | string>(input: T): Result<T, 'DotToUpperDash'> {
  return converter(input, 'DotToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to Train-Case.
 *
 * @example
 * ```ts
 * dotToTrain('hello.world'); // 'Hello-World'
 * dotToTrain({ 'first.name': 'John' }); // { 'First-Name': 'John' }
 * ```
 *
 * @deprecated Use `toTrain` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToTrain<T extends object | string>(input: T): Result<T, 'DotToTrain'> {
  return converter(input, 'DotToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to Title Case.
 *
 * @example
 * ```ts
 * dotToTitle('hello.world'); // 'Hello World'
 * dotToTitle({ 'first.name': 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToTitle<T extends object | string>(input: T): Result<T, 'DotToTitle'> {
  return converter(input, 'DotToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to Sentence case.
 *
 * @example
 * ```ts
 * dotToSentence('hello.world'); // 'Hello world'
 * dotToSentence({ 'first.name': 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dotToSentence<T extends object | string>(input: T): Result<T, 'DotToSentence'> {
  return converter(input, 'DotToSentence');
}
