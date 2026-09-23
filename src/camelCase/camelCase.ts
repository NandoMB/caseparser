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
