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
 */
export function upperSnakeToUpperDash<T extends object | string>(input: T): Result<T, 'UpperSnakeToUpperDash'> {
  return converter(input, 'UpperSnakeToUpperDash');
}
