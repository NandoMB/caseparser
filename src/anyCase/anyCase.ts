import type { CaseResult } from './types.ts';
import { convert } from '../parser/index.ts';
import { ToCamel, ToDash, ToDot, ToPascal, ToSentence, ToSnake, ToTitle, ToTrain, ToUpperDash, ToUpperSnake } from './words.ts';

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to camelCase.
 *
 * @example
 * ```ts
 * toCamel('hello_world'); // 'helloWorld'
 * toCamel({ first_name: 'John', userID: 1 }); // { firstName: 'John', userId: 1 }
 * ```
 */
export function toCamel<T extends object | string>(input: T): CaseResult<T, 'Camel'> {
  return convert(input, ToCamel) as CaseResult<T, 'Camel'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to PascalCase.
 *
 * @example
 * ```ts
 * toPascal('hello-world'); // 'HelloWorld'
 * toPascal({ 'first-name': 'John', userID: 1 }); // { FirstName: 'John', UserId: 1 }
 * ```
 */
export function toPascal<T extends object | string>(input: T): CaseResult<T, 'Pascal'> {
  return convert(input, ToPascal) as CaseResult<T, 'Pascal'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to snake_case.
 *
 * @example
 * ```ts
 * toSnake('helloWorld'); // 'hello_world'
 * toSnake({ firstName: 'John', userID: 1 }); // { first_name: 'John', user_id: 1 }
 * ```
 */
export function toSnake<T extends object | string>(input: T): CaseResult<T, 'Snake'> {
  return convert(input, ToSnake) as CaseResult<T, 'Snake'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to dash-case.
 *
 * @example
 * ```ts
 * toDash('HELLO_WORLD'); // 'hello-world'
 * toDash({ FIRST_NAME: 'John', userID: 1 }); // { 'first-name': 'John', 'user-id': 1 }
 * ```
 */
export function toDash<T extends object | string>(input: T): CaseResult<T, 'Dash'> {
  return convert(input, ToDash) as CaseResult<T, 'Dash'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER_SNAKE_CASE.
 *
 * @example
 * ```ts
 * toUpperSnake('hello-world'); // 'HELLO_WORLD'
 * toUpperSnake({ 'first-name': 'John', userID: 1 }); // { FIRST_NAME: 'John', USER_ID: 1 }
 * ```
 */
export function toUpperSnake<T extends object | string>(input: T): CaseResult<T, 'UpperSnake'> {
  return convert(input, ToUpperSnake) as CaseResult<T, 'UpperSnake'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to UPPER-DASH-CASE.
 *
 * @example
 * ```ts
 * toUpperDash('helloWorld'); // 'HELLO-WORLD'
 * toUpperDash({ firstName: 'John', userID: 1 }); // { 'FIRST-NAME': 'John', 'USER-ID': 1 }
 * ```
 */
export function toUpperDash<T extends object | string>(input: T): CaseResult<T, 'UpperDash'> {
  return convert(input, ToUpperDash) as CaseResult<T, 'UpperDash'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Train-Case.
 *
 * @example
 * ```ts
 * toTrain('hello_world'); // 'Hello-World'
 * toTrain({ first_name: 'John', userID: 1 }); // { 'First-Name': 'John', 'User-Id': 1 }
 * ```
 */
export function toTrain<T extends object | string>(input: T): CaseResult<T, 'Train'> {
  return convert(input, ToTrain) as CaseResult<T, 'Train'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to dot.case.
 *
 * @example
 * ```ts
 * toDot('HelloWorld'); // 'hello.world'
 * toDot({ FirstName: 'John', userID: 1 }); // { 'first.name': 'John', 'user.id': 1 }
 * ```
 */
export function toDot<T extends object | string>(input: T): CaseResult<T, 'Dot'> {
  return convert(input, ToDot) as CaseResult<T, 'Dot'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Title Case.
 *
 * @example
 * ```ts
 * toTitle('hello_world'); // 'Hello World'
 * toTitle({ first_name: 'John', userID: 1 }); // { 'First Name': 'John', 'User Id': 1 }
 * ```
 */
export function toTitle<T extends object | string>(input: T): CaseResult<T, 'Title'> {
  return convert(input, ToTitle) as CaseResult<T, 'Title'>;
}

/**
 * Converts a string, or the keys of an object/array (deeply), from any case to Sentence case.
 *
 * @example
 * ```ts
 * toSentence('helloWorld'); // 'Hello world'
 * toSentence({ firstName: 'John', userID: 1 }); // { 'First name': 'John', 'User id': 1 }
 * ```
 */
export function toSentence<T extends object | string>(input: T): CaseResult<T, 'Sentence'> {
  return convert(input, ToSentence) as CaseResult<T, 'Sentence'>;
}
