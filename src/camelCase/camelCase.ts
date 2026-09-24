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
 */
export function camelToSentence<T extends object | string>(input: T): Result<T, 'CamelToSentence'> {
  return converter(input, 'CamelToSentence');
}
