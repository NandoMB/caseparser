import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to dash-case.
 *
 * @example
 * ```ts
 * camelToDash('helloWorld'); // 'hello-world'
 * camelToDash({ firstName: 'John' }); // { 'first-name': 'John' }
 * ```
 *
 * @deprecated Use `toKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToDash<T extends object | string>(input: T): Result<T, 'CamelToDash'> {
  return converter(input, 'CamelToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to snake_case.
 *
 * @example
 * ```ts
 * camelToSnake('helloWorld'); // 'hello_world'
 * camelToSnake({ firstName: 'John' }); // { first_name: 'John' }
 * ```
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToSnake<T extends object | string>(input: T): Result<T, 'CamelToSnake'> {
  return converter(input, 'CamelToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to PascalCase.
 *
 * @example
 * ```ts
 * camelToPascal('helloWorld'); // 'HelloWorld'
 * camelToPascal({ firstName: 'John' }); // { FirstName: 'John' }
 * ```
 *
 * @deprecated Use `toPascal` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToPascal<T extends object | string>(input: T): Result<T, 'CamelToPascal'> {
  return converter(input, 'CamelToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * camelToUpperSnake('helloWorld'); // 'HELLO_WORLD'
 * camelToUpperSnake({ firstName: 'John' }); // { FIRST_NAME: 'John' }
 * ```
 *
 * @deprecated Use `toUpperSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToUpperSnake<T extends object | string>(input: T): Result<T, 'CamelToUpperSnake'> {
  return converter(input, 'CamelToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * camelToUpperDash('helloWorld'); // 'HELLO-WORLD'
 * camelToUpperDash({ firstName: 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 *
 * @deprecated Use `toUpperKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToUpperDash<T extends object | string>(input: T): Result<T, 'CamelToUpperDash'> {
  return converter(input, 'CamelToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to Train-Case.
 *
 * @example
 * ```ts
 * camelToTrain('helloWorld'); // 'Hello-World'
 * camelToTrain({ firstName: 'John' }); // { 'First-Name': 'John' }
 * ```
 *
 * @deprecated Use `toTrain` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToTrain<T extends object | string>(input: T): Result<T, 'CamelToTrain'> {
  return converter(input, 'CamelToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to dot.case.
 *
 * @example
 * ```ts
 * camelToDot('helloWorld'); // 'hello.world'
 * camelToDot({ firstName: 'John' }); // { 'first.name': 'John' }
 * ```
 *
 * @deprecated Use `toDot` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToDot<T extends object | string>(input: T): Result<T, 'CamelToDot'> {
  return converter(input, 'CamelToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to Title Case.
 *
 * @example
 * ```ts
 * camelToTitle('helloWorld'); // 'Hello World'
 * camelToTitle({ firstName: 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToTitle<T extends object | string>(input: T): Result<T, 'CamelToTitle'> {
  return converter(input, 'CamelToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from camelCase to Sentence case.
 *
 * @example
 * ```ts
 * camelToSentence('helloWorld'); // 'Hello world'
 * camelToSentence({ firstName: 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function camelToSentence<T extends object | string>(input: T): Result<T, 'CamelToSentence'> {
  return converter(input, 'CamelToSentence');
}
