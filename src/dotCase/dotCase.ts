import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to camelCase.
 *
 * @example
 * ```ts
 * dotToCamel('hello.world'); // 'helloWorld'
 * dotToCamel({ 'first.name': 'John' }); // { firstName: 'John' }
 * ```
 */
export function dotToCamel<T extends object | string>(input: T): Result<T, 'DotToCamel'> {
  return converter(input, 'DotToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to PascalCase.
 *
 * @example
 * ```ts
 * dotToPascal('hello.world'); // 'HelloWorld'
 * dotToPascal({ 'first.name': 'John' }); // { FirstName: 'John' }
 * ```
 */
export function dotToPascal<T extends object | string>(input: T): Result<T, 'DotToPascal'> {
  return converter(input, 'DotToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to snake_case.
 *
 * @example
 * ```ts
 * dotToSnake('hello.world'); // 'hello_world'
 * dotToSnake({ 'first.name': 'John' }); // { first_name: 'John' }
 * ```
 */
export function dotToSnake<T extends object | string>(input: T): Result<T, 'DotToSnake'> {
  return converter(input, 'DotToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to dash-case.
 *
 * @example
 * ```ts
 * dotToDash('hello.world'); // 'hello-world'
 * dotToDash({ 'first.name': 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function dotToDash<T extends object | string>(input: T): Result<T, 'DotToDash'> {
  return converter(input, 'DotToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * dotToUpperSnake('hello.world'); // 'HELLO_WORLD'
 * dotToUpperSnake({ 'first.name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function dotToUpperSnake<T extends object | string>(input: T): Result<T, 'DotToUpperSnake'> {
  return converter(input, 'DotToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * dotToUpperDash('hello.world'); // 'HELLO-WORLD'
 * dotToUpperDash({ 'first.name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function dotToUpperDash<T extends object | string>(input: T): Result<T, 'DotToUpperDash'> {
  return converter(input, 'DotToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dot.case to Train-Case.
 *
 * @example
 * ```ts
 * dotToTrain('hello.world'); // 'Hello-World'
 * dotToTrain({ 'first.name': 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function dotToTrain<T extends object | string>(input: T): Result<T, 'DotToTrain'> {
  return converter(input, 'DotToTrain');
}
