import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to snake_case.
 *
 * @example
 * ```ts
 * dashToSnake('hello-world'); // 'hello_world'
 * dashToSnake({ 'first-name': 'John' }); // { first_name: 'John' }
 * ```
 */
export function dashToSnake<T extends object | string>(input: T): Result<T, 'DashToSnake'> {
  return converter(input, 'DashToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to camelCase.
 *
 * @example
 * ```ts
 * dashToCamel('hello-world'); // 'helloWorld'
 * dashToCamel({ 'first-name': 'John' }); // { firstName: 'John' }
 * ```
 */
export function dashToCamel<T extends object | string>(input: T): Result<T, 'DashToCamel'> {
  return converter(input, 'DashToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to PascalCase.
 *
 * @example
 * ```ts
 * dashToPascal('hello-world'); // 'HelloWorld'
 * dashToPascal({ 'first-name': 'John' }); // { FirstName: 'John' }
 * ```
 */
export function dashToPascal<T extends object | string>(input: T): Result<T, 'DashToPascal'> {
  return converter(input, 'DashToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * dashToUpperSnake('hello-world'); // 'HELLO_WORLD'
 * dashToUpperSnake({ 'first-name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function dashToUpperSnake<T extends object | string>(input: T): Result<T, 'DashToUpperSnake'> {
  return converter(input, 'DashToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * dashToUpperDash('hello-world'); // 'HELLO-WORLD'
 * dashToUpperDash({ 'first-name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function dashToUpperDash<T extends object | string>(input: T): Result<T, 'DashToUpperDash'> {
  return converter(input, 'DashToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to Train-Case.
 *
 * @example
 * ```ts
 * dashToTrain('hello-world'); // 'Hello-World'
 * dashToTrain({ 'first-name': 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function dashToTrain<T extends object | string>(input: T): Result<T, 'DashToTrain'> {
  return converter(input, 'DashToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from dash-case to dot.case.
 *
 * @example
 * ```ts
 * dashToDot('hello-world'); // 'hello.world'
 * dashToDot({ 'first-name': 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function dashToDot<T extends object | string>(input: T): Result<T, 'DashToDot'> {
  return converter(input, 'DashToDot');
}
