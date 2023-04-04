import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function upperDashToCamel(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperDashToCamel');
  return convertJson(input, upperDashToCamel);
}

export function upperDashToSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperDashToSnake');
  return convertJson(input, upperDashToSnake);
}

export function upperDashToDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperDashToDash');
  return convertJson(input, upperDashToDash);
}

export function upperDashToPascal(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperDashToPascal');
  return convertJson(input, upperDashToPascal);
}

export function upperDashToUpperSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperDashToUpperSnake');
  return convertJson(input, upperDashToUpperSnake);
}
