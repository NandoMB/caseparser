import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to snake_case.
 *
 * @example
 * ```ts
 * dashToSnake('hello-world'); // 'hello_world'
 * dashToSnake({ 'first-name': 'John' }); // { first_name: 'John' }
 * ```
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToSnake<T extends object | string>(input: T): Result<T, 'DashToSnake'> {
  return converter(input, 'DashToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to camelCase.
 *
 * @example
 * ```ts
 * dashToCamel('hello-world'); // 'helloWorld'
 * dashToCamel({ 'first-name': 'John' }); // { firstName: 'John' }
 * ```
 *
 * @deprecated Use `toCamel` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToCamel<T extends object | string>(input: T): Result<T, 'DashToCamel'> {
  return converter(input, 'DashToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to PascalCase.
 *
 * @example
 * ```ts
 * dashToPascal('hello-world'); // 'HelloWorld'
 * dashToPascal({ 'first-name': 'John' }); // { FirstName: 'John' }
 * ```
 *
 * @deprecated Use `toPascal` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToPascal<T extends object | string>(input: T): Result<T, 'DashToPascal'> {
  return converter(input, 'DashToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * dashToUpperSnake('hello-world'); // 'HELLO_WORLD'
 * dashToUpperSnake({ 'first-name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 *
 * @deprecated Use `toUpperSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToUpperSnake<T extends object | string>(input: T): Result<T, 'DashToUpperSnake'> {
  return converter(input, 'DashToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * dashToUpperDash('hello-world'); // 'HELLO-WORLD'
 * dashToUpperDash({ 'first-name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 *
 * @deprecated Use `toUpperKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToUpperDash<T extends object | string>(input: T): Result<T, 'DashToUpperDash'> {
  return converter(input, 'DashToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to Train-Case.
 *
 * @example
 * ```ts
 * dashToTrain('hello-world'); // 'Hello-World'
 * dashToTrain({ 'first-name': 'John' }); // { 'First-Name': 'John' }
 * ```
 *
 * @deprecated Use `toTrain` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToTrain<T extends object | string>(input: T): Result<T, 'DashToTrain'> {
  return converter(input, 'DashToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to dot.case.
 *
 * @example
 * ```ts
 * dashToDot('hello-world'); // 'hello.world'
 * dashToDot({ 'first-name': 'John' }); // { 'first.name': 'John' }
 * ```
 *
 * @deprecated Use `toDot` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToDot<T extends object | string>(input: T): Result<T, 'DashToDot'> {
  return converter(input, 'DashToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to Title Case.
 *
 * @example
 * ```ts
 * dashToTitle('hello-world'); // 'Hello World'
 * dashToTitle({ 'first-name': 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToTitle<T extends object | string>(input: T): Result<T, 'DashToTitle'> {
  return converter(input, 'DashToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to Sentence case.
 *
 * @example
 * ```ts
 * dashToSentence('hello-world'); // 'Hello world'
 * dashToSentence({ 'first-name': 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function dashToSentence<T extends object | string>(input: T): Result<T, 'DashToSentence'> {
  return converter(input, 'DashToSentence');
}
