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
 */
export function trainToDot<T extends object | string>(input: T): Result<T, 'TrainToDot'> {
  return converter(input, 'TrainToDot');
}
