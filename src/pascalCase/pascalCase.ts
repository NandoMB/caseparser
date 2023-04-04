import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function pascalToCamel(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'pascalToCamel');
  return convertJson(input, pascalToCamel);
}

export function pascalToSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'pascalToSnake');
  return convertJson(input, pascalToSnake);
}

export function pascalToDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'pascalToDash');
  return convertJson(input, pascalToDash);
}

export function pascalToUpperSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'pascalToUpperSnake');
  return convertJson(input, pascalToUpperSnake);
}

export function pascalToUpperDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'pascalToUpperDash');
  return convertJson(input, pascalToUpperDash);
}
