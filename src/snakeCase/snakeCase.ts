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

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to Train-Case.
 *
 * @example
 * ```ts
 * snakeToTrain('hello_world'); // 'Hello-World'
 * snakeToTrain({ first_name: 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function snakeToTrain<T extends object | string>(input: T): Result<T, 'SnakeToTrain'> {
  return converter(input, 'SnakeToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to dot.case.
 *
 * @example
 * ```ts
 * snakeToDot('hello_world'); // 'hello.world'
 * snakeToDot({ first_name: 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function snakeToDot<T extends object | string>(input: T): Result<T, 'SnakeToDot'> {
  return converter(input, 'SnakeToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to Title Case.
 *
 * @example
 * ```ts
 * snakeToTitle('hello_world'); // 'Hello World'
 * snakeToTitle({ first_name: 'John' }); // { 'First Name': 'John' }
 * ```
 */
export function snakeToTitle<T extends object | string>(input: T): Result<T, 'SnakeToTitle'> {
  return converter(input, 'SnakeToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from snake_case to Sentence case.
 *
 * @example
 * ```ts
 * snakeToSentence('hello_world'); // 'Hello world'
 * snakeToSentence({ first_name: 'John' }); // { 'First name': 'John' }
 * ```
 */
export function snakeToSentence<T extends object | string>(input: T): Result<T, 'SnakeToSentence'> {
  return converter(input, 'SnakeToSentence');
}
