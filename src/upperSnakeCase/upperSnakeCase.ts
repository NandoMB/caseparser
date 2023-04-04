import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function upperSnakeToCamel(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperSnakeToCamel');
  return convertJson(input, upperSnakeToCamel);
}

export function upperSnakeToSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperSnakeToSnake');
  return convertJson(input, upperSnakeToSnake);
}

export function upperSnakeToDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperSnakeToDash');
  return convertJson(input, upperSnakeToDash);
}

export function upperSnakeToPascal(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperSnakeToPascal');
  return convertJson(input, upperSnakeToPascal);
}

export function upperSnakeToUpperDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'upperSnakeToUpperDash');
  return convertJson(input, upperSnakeToUpperDash);
}
