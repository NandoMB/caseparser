/**
 * Convert strings and object keys (deeply, including arrays) from any case to another,
 * with the resulting keys inferred at the type level.
 *
 * Cases: camelCase, PascalCase, snake_case, kebab-case, UPPER_SNAKE_CASE, UPPER-KEBAB-CASE,
 * Train-Case, dot.case, Title Case, Sentence case, Pascal_Snake_Case, path/case,
 * space case, lower case and UPPER CASE.
 *
 * @example
 * ```ts
 * import { toCamel, toSnake } from 'caseparser';
 *
 * toSnake('helloWorld'); // 'hello_world'
 *
 * const user = toCamel({ first_name: 'John', addresses: [{ postal_code: '61105' }] });
 * // { firstName: 'John', addresses: [{ postalCode: '61105' }] }
 * ```
 *
 * @module
 */
export * from './anyCase/index.ts';
