import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to camelCase.
 *
 * @example
 * ```ts
 * upperDashToCamel('HELLO-WORLD'); // 'helloWorld'
 * upperDashToCamel({ 'FIRST-NAME': 'John' }); // { firstName: 'John' }
 * ```
 */
export function upperDashToCamel<T extends object | string>(input: T): Result<T, 'UpperDashToCamel'> {
  return converter(input, 'UpperDashToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to snake_case.
 *
 * @example
 * ```ts
 * upperDashToSnake('HELLO-WORLD'); // 'hello_world'
 * upperDashToSnake({ 'FIRST-NAME': 'John' }); // { first_name: 'John' }
 * ```
 */
export function upperDashToSnake<T extends object | string>(input: T): Result<T, 'UpperDashToSnake'> {
  return converter(input, 'UpperDashToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to dash-case.
 *
 * @example
 * ```ts
 * upperDashToDash('HELLO-WORLD'); // 'hello-world'
 * upperDashToDash({ 'FIRST-NAME': 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function upperDashToDash<T extends object | string>(input: T): Result<T, 'UpperDashToDash'> {
  return converter(input, 'UpperDashToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to PascalCase.
 *
 * @example
 * ```ts
 * upperDashToPascal('HELLO-WORLD'); // 'HelloWorld'
 * upperDashToPascal({ 'FIRST-NAME': 'John' }); // { FirstName: 'John' }
 * ```
 */
export function upperDashToPascal<T extends object | string>(input: T): Result<T, 'UpperDashToPascal'> {
  return converter(input, 'UpperDashToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * upperDashToUpperSnake('HELLO-WORLD'); // 'HELLO_WORLD'
 * upperDashToUpperSnake({ 'FIRST-NAME': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function upperDashToUpperSnake<T extends object | string>(input: T): Result<T, 'UpperDashToUpperSnake'> {
  return converter(input, 'UpperDashToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to Train-Case.
 *
 * @example
 * ```ts
 * upperDashToTrain('HELLO-WORLD'); // 'Hello-World'
 * upperDashToTrain({ 'FIRST-NAME': 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function upperDashToTrain<T extends object | string>(input: T): Result<T, 'UpperDashToTrain'> {
  return converter(input, 'UpperDashToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to dot.case.
 *
 * @example
 * ```ts
 * upperDashToDot('HELLO-WORLD'); // 'hello.world'
 * upperDashToDot({ 'FIRST-NAME': 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function upperDashToDot<T extends object | string>(input: T): Result<T, 'UpperDashToDot'> {
  return converter(input, 'UpperDashToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to Title Case.
 *
 * @example
 * ```ts
 * upperDashToTitle('HELLO-WORLD'); // 'Hello World'
 * upperDashToTitle({ 'FIRST-NAME': 'John' }); // { 'First Name': 'John' }
 * ```
 */
export function upperDashToTitle<T extends object | string>(input: T): Result<T, 'UpperDashToTitle'> {
  return converter(input, 'UpperDashToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from UPPER-DASH-CASE to Sentence case.
 *
 * @example
 * ```ts
 * upperDashToSentence('HELLO-WORLD'); // 'Hello world'
 * upperDashToSentence({ 'FIRST-NAME': 'John' }); // { 'First name': 'John' }
 * ```
 */
export function upperDashToSentence<T extends object | string>(input: T): Result<T, 'UpperDashToSentence'> {
  return converter(input, 'UpperDashToSentence');
}
