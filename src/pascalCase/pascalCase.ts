import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to camelCase.
 *
 * @example
 * ```ts
 * pascalToCamel('HelloWorld'); // 'helloWorld'
 * pascalToCamel({ FirstName: 'John' }); // { firstName: 'John' }
 * ```
 */
export function pascalToCamel<T extends object | string>(input: T): Result<T, 'PascalToCamel'> {
  return converter(input, 'PascalToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to snake_case.
 *
 * @example
 * ```ts
 * pascalToSnake('HelloWorld'); // 'hello_world'
 * pascalToSnake({ FirstName: 'John' }); // { first_name: 'John' }
 * ```
 */
export function pascalToSnake<T extends object | string>(input: T): Result<T, 'PascalToSnake'> {
  return converter(input, 'PascalToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to dash-case.
 *
 * @example
 * ```ts
 * pascalToDash('HelloWorld'); // 'hello-world'
 * pascalToDash({ FirstName: 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function pascalToDash<T extends object | string>(input: T): Result<T, 'PascalToDash'> {
  return converter(input, 'PascalToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * pascalToUpperSnake('HelloWorld'); // 'HELLO_WORLD'
 * pascalToUpperSnake({ FirstName: 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function pascalToUpperSnake<T extends object | string>(input: T): Result<T, 'PascalToUpperSnake'> {
  return converter(input, 'PascalToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * pascalToUpperDash('HelloWorld'); // 'HELLO-WORLD'
 * pascalToUpperDash({ FirstName: 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function pascalToUpperDash<T extends object | string>(input: T): Result<T, 'PascalToUpperDash'> {
  return converter(input, 'PascalToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to Train-Case.
 *
 * @example
 * ```ts
 * pascalToTrain('HelloWorld'); // 'Hello-World'
 * pascalToTrain({ FirstName: 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function pascalToTrain<T extends object | string>(input: T): Result<T, 'PascalToTrain'> {
  return converter(input, 'PascalToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to dot.case.
 *
 * @example
 * ```ts
 * pascalToDot('HelloWorld'); // 'hello.world'
 * pascalToDot({ FirstName: 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function pascalToDot<T extends object | string>(input: T): Result<T, 'PascalToDot'> {
  return converter(input, 'PascalToDot');
}
