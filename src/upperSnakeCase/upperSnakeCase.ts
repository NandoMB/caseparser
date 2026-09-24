import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to camelCase.
 *
 * @example
 * ```ts
 * upperSnakeToCamel('HELLO_WORLD'); // 'helloWorld'
 * upperSnakeToCamel({ FIRST_NAME: 'John' }); // { firstName: 'John' }
 * ```
 *
 * @deprecated Use `toCamel` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToCamel<T extends object | string>(input: T): Result<T, 'UpperSnakeToCamel'> {
  return converter(input, 'UpperSnakeToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to snake_case.
 *
 * @example
 * ```ts
 * upperSnakeToSnake('HELLO_WORLD'); // 'hello_world'
 * upperSnakeToSnake({ FIRST_NAME: 'John' }); // { first_name: 'John' }
 * ```
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToSnake<T extends object | string>(input: T): Result<T, 'UpperSnakeToSnake'> {
  return converter(input, 'UpperSnakeToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to dash-case.
 *
 * @example
 * ```ts
 * upperSnakeToDash('HELLO_WORLD'); // 'hello-world'
 * upperSnakeToDash({ FIRST_NAME: 'John' }); // { 'first-name': 'John' }
 * ```
 *
 * @deprecated Use `toDash` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToDash<T extends object | string>(input: T): Result<T, 'UpperSnakeToDash'> {
  return converter(input, 'UpperSnakeToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to PascalCase.
 *
 * @example
 * ```ts
 * upperSnakeToPascal('HELLO_WORLD'); // 'HelloWorld'
 * upperSnakeToPascal({ FIRST_NAME: 'John' }); // { FirstName: 'John' }
 * ```
 *
 * @deprecated Use `toPascal` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToPascal<T extends object | string>(input: T): Result<T, 'UpperSnakeToPascal'> {
  return converter(input, 'UpperSnakeToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * upperSnakeToUpperDash('HELLO_WORLD'); // 'HELLO-WORLD'
 * upperSnakeToUpperDash({ FIRST_NAME: 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 *
 * @deprecated Use `toUpperDash` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToUpperDash<T extends object | string>(input: T): Result<T, 'UpperSnakeToUpperDash'> {
  return converter(input, 'UpperSnakeToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to Train-Case.
 *
 * @example
 * ```ts
 * upperSnakeToTrain('HELLO_WORLD'); // 'Hello-World'
 * upperSnakeToTrain({ FIRST_NAME: 'John' }); // { 'First-Name': 'John' }
 * ```
 *
 * @deprecated Use `toTrain` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToTrain<T extends object | string>(input: T): Result<T, 'UpperSnakeToTrain'> {
  return converter(input, 'UpperSnakeToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to dot.case.
 *
 * @example
 * ```ts
 * upperSnakeToDot('HELLO_WORLD'); // 'hello.world'
 * upperSnakeToDot({ FIRST_NAME: 'John' }); // { 'first.name': 'John' }
 * ```
 *
 * @deprecated Use `toDot` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToDot<T extends object | string>(input: T): Result<T, 'UpperSnakeToDot'> {
  return converter(input, 'UpperSnakeToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to Title Case.
 *
 * @example
 * ```ts
 * upperSnakeToTitle('HELLO_WORLD'); // 'Hello World'
 * upperSnakeToTitle({ FIRST_NAME: 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToTitle<T extends object | string>(input: T): Result<T, 'UpperSnakeToTitle'> {
  return converter(input, 'UpperSnakeToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER_SNAKE_CASE to Sentence case.
 *
 * @example
 * ```ts
 * upperSnakeToSentence('HELLO_WORLD'); // 'Hello world'
 * upperSnakeToSentence({ FIRST_NAME: 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function upperSnakeToSentence<T extends object | string>(input: T): Result<T, 'UpperSnakeToSentence'> {
  return converter(input, 'UpperSnakeToSentence');
}
