import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to camelCase.
 *
 * @example
 * ```ts
 * snakeToCamel('hello_world'); // 'helloWorld'
 * snakeToCamel({ first_name: 'John' }); // { firstName: 'John' }
 * ```
 */
export function snakeToCamel<T extends object | string>(input: T): Result<T, 'SnakeToCamel'> {
  return converter(input, 'SnakeToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to dash-case.
 *
 * @example
 * ```ts
 * snakeToDash('hello_world'); // 'hello-world'
 * snakeToDash({ first_name: 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function snakeToDash<T extends object | string>(input: T): Result<T, 'SnakeToDash'> {
  return converter(input, 'SnakeToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to PascalCase.
 *
 * @example
 * ```ts
 * snakeToPascal('hello_world'); // 'HelloWorld'
 * snakeToPascal({ first_name: 'John' }); // { FirstName: 'John' }
 * ```
 */
export function snakeToPascal<T extends object | string>(input: T): Result<T, 'SnakeToPascal'> {
  return converter(input, 'SnakeToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * snakeToUpperSnake('hello_world'); // 'HELLO_WORLD'
 * snakeToUpperSnake({ first_name: 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function snakeToUpperSnake<T extends object | string>(input: T): Result<T, 'SnakeToUpperSnake'> {
  return converter(input, 'SnakeToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * snakeToUpperDash('hello_world'); // 'HELLO-WORLD'
 * snakeToUpperDash({ first_name: 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function snakeToUpperDash<T extends object | string>(input: T): Result<T, 'SnakeToUpperDash'> {
  return converter(input, 'SnakeToUpperDash');
}
