import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function camelToDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'camelToDash');
  return convertJson(input, camelToDash);
}

export function camelToSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'camelToSnake');
  return convertJson(input, camelToSnake);
}

export function camelToPascal(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'camelToPascal');
  return convertJson(input, camelToPascal);
}

export function camelToUpperSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'camelToUpperSnake');
  return convertJson(input, camelToUpperSnake);
}

export function camelToUpperDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'camelToUpperDash');
  return convertJson(input, camelToUpperDash);
}
