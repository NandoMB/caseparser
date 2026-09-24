import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to camelCase.
 *
 * @example
 * ```ts
 * trainToCamel('Hello-World'); // 'helloWorld'
 * trainToCamel({ 'First-Name': 'John' }); // { firstName: 'John' }
 * ```
 *
 * @deprecated Use `toCamel` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToCamel<T extends object | string>(input: T): Result<T, 'TrainToCamel'> {
  return converter(input, 'TrainToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to PascalCase.
 *
 * @example
 * ```ts
 * trainToPascal('Hello-World'); // 'HelloWorld'
 * trainToPascal({ 'First-Name': 'John' }); // { FirstName: 'John' }
 * ```
 *
 * @deprecated Use `toPascal` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToPascal<T extends object | string>(input: T): Result<T, 'TrainToPascal'> {
  return converter(input, 'TrainToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to snake_case.
 *
 * @example
 * ```ts
 * trainToSnake('Hello-World'); // 'hello_world'
 * trainToSnake({ 'First-Name': 'John' }); // { first_name: 'John' }
 * ```
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToSnake<T extends object | string>(input: T): Result<T, 'TrainToSnake'> {
  return converter(input, 'TrainToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to dash-case.
 *
 * @example
 * ```ts
 * trainToDash('Hello-World'); // 'hello-world'
 * trainToDash({ 'First-Name': 'John' }); // { 'first-name': 'John' }
 * ```
 *
 * @deprecated Use `toKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToDash<T extends object | string>(input: T): Result<T, 'TrainToDash'> {
  return converter(input, 'TrainToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * trainToUpperSnake('Hello-World'); // 'HELLO_WORLD'
 * trainToUpperSnake({ 'First-Name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 *
 * @deprecated Use `toUpperSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToUpperSnake<T extends object | string>(input: T): Result<T, 'TrainToUpperSnake'> {
  return converter(input, 'TrainToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * trainToUpperDash('Hello-World'); // 'HELLO-WORLD'
 * trainToUpperDash({ 'First-Name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 *
 * @deprecated Use `toUpperKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToUpperDash<T extends object | string>(input: T): Result<T, 'TrainToUpperDash'> {
  return converter(input, 'TrainToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to dot.case.
 *
 * @example
 * ```ts
 * trainToDot('Hello-World'); // 'hello.world'
 * trainToDot({ 'First-Name': 'John' }); // { 'first.name': 'John' }
 * ```
 *
 * @deprecated Use `toDot` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToDot<T extends object | string>(input: T): Result<T, 'TrainToDot'> {
  return converter(input, 'TrainToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to Title Case.
 *
 * @example
 * ```ts
 * trainToTitle('Hello-World'); // 'Hello World'
 * trainToTitle({ 'First-Name': 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToTitle<T extends object | string>(input: T): Result<T, 'TrainToTitle'> {
  return converter(input, 'TrainToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Train-Case to Sentence case.
 *
 * @example
 * ```ts
 * trainToSentence('Hello-World'); // 'Hello world'
 * trainToSentence({ 'First-Name': 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function trainToSentence<T extends object | string>(input: T): Result<T, 'TrainToSentence'> {
  return converter(input, 'TrainToSentence');
}
