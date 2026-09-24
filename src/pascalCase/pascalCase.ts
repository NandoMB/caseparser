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
 *
 * @deprecated Use `toCamel` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toUpperSnake` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toUpperKebab` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toTrain` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
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
 *
 * @deprecated Use `toDot` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function pascalToDot<T extends object | string>(input: T): Result<T, 'PascalToDot'> {
  return converter(input, 'PascalToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to Title Case.
 *
 * @example
 * ```ts
 * pascalToTitle('HelloWorld'); // 'Hello World'
 * pascalToTitle({ FirstName: 'John' }); // { 'First Name': 'John' }
 * ```
 *
 * @deprecated Use `toTitle` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function pascalToTitle<T extends object | string>(input: T): Result<T, 'PascalToTitle'> {
  return converter(input, 'PascalToTitle');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from PascalCase to Sentence case.
 *
 * @example
 * ```ts
 * pascalToSentence('HelloWorld'); // 'Hello world'
 * pascalToSentence({ FirstName: 'John' }); // { 'First name': 'John' }
 * ```
 *
 * @deprecated Use `toSentence` instead, which converts from any case. It keeps acronyms together,
 * so results differ for keys like `userID` (see the migration notes in the README).
 */
export function pascalToSentence<T extends object | string>(input: T): Result<T, 'PascalToSentence'> {
  return converter(input, 'PascalToSentence');
}
