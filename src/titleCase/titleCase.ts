import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to camelCase.
 *
 * @example
 * ```ts
 * titleToCamel('Hello World'); // 'helloWorld'
 * titleToCamel({ 'First Name': 'John' }); // { firstName: 'John' }
 * ```
 */
export function titleToCamel<T extends object | string>(input: T): Result<T, 'TitleToCamel'> {
  return converter(input, 'TitleToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to PascalCase.
 *
 * @example
 * ```ts
 * titleToPascal('Hello World'); // 'HelloWorld'
 * titleToPascal({ 'First Name': 'John' }); // { FirstName: 'John' }
 * ```
 */
export function titleToPascal<T extends object | string>(input: T): Result<T, 'TitleToPascal'> {
  return converter(input, 'TitleToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to snake_case.
 *
 * @example
 * ```ts
 * titleToSnake('Hello World'); // 'hello_world'
 * titleToSnake({ 'First Name': 'John' }); // { first_name: 'John' }
 * ```
 */
export function titleToSnake<T extends object | string>(input: T): Result<T, 'TitleToSnake'> {
  return converter(input, 'TitleToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to dash-case.
 *
 * @example
 * ```ts
 * titleToDash('Hello World'); // 'hello-world'
 * titleToDash({ 'First Name': 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function titleToDash<T extends object | string>(input: T): Result<T, 'TitleToDash'> {
  return converter(input, 'TitleToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * titleToUpperSnake('Hello World'); // 'HELLO_WORLD'
 * titleToUpperSnake({ 'First Name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function titleToUpperSnake<T extends object | string>(input: T): Result<T, 'TitleToUpperSnake'> {
  return converter(input, 'TitleToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * titleToUpperDash('Hello World'); // 'HELLO-WORLD'
 * titleToUpperDash({ 'First Name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function titleToUpperDash<T extends object | string>(input: T): Result<T, 'TitleToUpperDash'> {
  return converter(input, 'TitleToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to Train-Case.
 *
 * @example
 * ```ts
 * titleToTrain('Hello World'); // 'Hello-World'
 * titleToTrain({ 'First Name': 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function titleToTrain<T extends object | string>(input: T): Result<T, 'TitleToTrain'> {
  return converter(input, 'TitleToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to dot.case.
 *
 * @example
 * ```ts
 * titleToDot('Hello World'); // 'hello.world'
 * titleToDot({ 'First Name': 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function titleToDot<T extends object | string>(input: T): Result<T, 'TitleToDot'> {
  return converter(input, 'TitleToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Title Case to Sentence case.
 *
 * @example
 * ```ts
 * titleToSentence('Hello World'); // 'Hello world'
 * titleToSentence({ 'First Name': 'John' }); // { 'First name': 'John' }
 * ```
 */
export function titleToSentence<T extends object | string>(input: T): Result<T, 'TitleToSentence'> {
  return converter(input, 'TitleToSentence');
}
