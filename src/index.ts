/**
 * Convert strings and object keys (deeply, including arrays) from one case
 * type to another, with the resulting keys inferred at the type level.
 *
 * Supported cases: camelCase, PascalCase, snake_case, dash-case,
 * UPPER_SNAKE_CASE, UPPER-DASH-CASE, Train-Case and dot.case.
 *
 * @example
 * ```ts
 * import { camelToSnake, snakeToCamel } from 'caseparser';
 *
 * camelToSnake('helloWorld'); // 'hello_world'
 *
 * const user = snakeToCamel({ first_name: 'John', addresses: [{ postal_code: '61105' }] });
 * // { firstName: 'John', addresses: [{ postalCode: '61105' }] }
 * ```
 *
 * @module
 */
export * from './camelCase/index.ts';
export * from './dashCase/index.ts';
export * from './pascalCase/index.ts';
export * from './snakeCase/index.ts';
export * from './trainCase/index.ts';
export * from './dotCase/index.ts';
export * from './upperDashCase/index.ts';
export * from './upperSnakeCase/index.ts';
export type { ParserType, Prettify, Result } from './types.ts';
