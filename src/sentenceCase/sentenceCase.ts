import type { Result } from '../types.ts';
import { converter } from '../parser/index.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to camelCase.
 *
 * @example
 * ```ts
 * sentenceToCamel('Hello world'); // 'helloWorld'
 * sentenceToCamel({ 'First name': 'John' }); // { firstName: 'John' }
 * ```
 */
export function sentenceToCamel<T extends object | string>(input: T): Result<T, 'SentenceToCamel'> {
  return converter(input, 'SentenceToCamel');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to PascalCase.
 *
 * @example
 * ```ts
 * sentenceToPascal('Hello world'); // 'HelloWorld'
 * sentenceToPascal({ 'First name': 'John' }); // { FirstName: 'John' }
 * ```
 */
export function sentenceToPascal<T extends object | string>(input: T): Result<T, 'SentenceToPascal'> {
  return converter(input, 'SentenceToPascal');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to snake_case.
 *
 * @example
 * ```ts
 * sentenceToSnake('Hello world'); // 'hello_world'
 * sentenceToSnake({ 'First name': 'John' }); // { first_name: 'John' }
 * ```
 */
export function sentenceToSnake<T extends object | string>(input: T): Result<T, 'SentenceToSnake'> {
  return converter(input, 'SentenceToSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to dash-case.
 *
 * @example
 * ```ts
 * sentenceToDash('Hello world'); // 'hello-world'
 * sentenceToDash({ 'First name': 'John' }); // { 'first-name': 'John' }
 * ```
 */
export function sentenceToDash<T extends object | string>(input: T): Result<T, 'SentenceToDash'> {
  return converter(input, 'SentenceToDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * sentenceToUpperSnake('Hello world'); // 'HELLO_WORLD'
 * sentenceToUpperSnake({ 'First name': 'John' }); // { FIRST_NAME: 'John' }
 * ```
 */
export function sentenceToUpperSnake<T extends object | string>(input: T): Result<T, 'SentenceToUpperSnake'> {
  return converter(input, 'SentenceToUpperSnake');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * sentenceToUpperDash('Hello world'); // 'HELLO-WORLD'
 * sentenceToUpperDash({ 'First name': 'John' }); // { 'FIRST-NAME': 'John' }
 * ```
 */
export function sentenceToUpperDash<T extends object | string>(input: T): Result<T, 'SentenceToUpperDash'> {
  return converter(input, 'SentenceToUpperDash');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to Train-Case.
 *
 * @example
 * ```ts
 * sentenceToTrain('Hello world'); // 'Hello-World'
 * sentenceToTrain({ 'First name': 'John' }); // { 'First-Name': 'John' }
 * ```
 */
export function sentenceToTrain<T extends object | string>(input: T): Result<T, 'SentenceToTrain'> {
  return converter(input, 'SentenceToTrain');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to dot.case.
 *
 * @example
 * ```ts
 * sentenceToDot('Hello world'); // 'hello.world'
 * sentenceToDot({ 'First name': 'John' }); // { 'first.name': 'John' }
 * ```
 */
export function sentenceToDot<T extends object | string>(input: T): Result<T, 'SentenceToDot'> {
  return converter(input, 'SentenceToDot');
}

/**
 * Converts a string, or the keys of an object/array (deeply), from Sentence case to Title Case.
 *
 * @example
 * ```ts
 * sentenceToTitle('Hello world'); // 'Hello World'
 * sentenceToTitle({ 'First name': 'John' }); // { 'First Name': 'John' }
 * ```
 */
export function sentenceToTitle<T extends object | string>(input: T): Result<T, 'SentenceToTitle'> {
  return converter(input, 'SentenceToTitle');
}
