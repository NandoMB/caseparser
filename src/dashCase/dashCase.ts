import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function dashToSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'dashToSnake');
  return convertJson(input, dashToSnake);
}

export function dashToCamel(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'dashToCamel');
  return convertJson(input, dashToCamel);
}

export function dashToPascal(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'dashToPascal');
  return convertJson(input, dashToPascal);
}

export function dashToUpperSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'dashToUpperSnake');
  return convertJson(input, dashToUpperSnake);
}

export function dashToUpperDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'dashToUpperDash');
  return convertJson(input, dashToUpperDash);
}
