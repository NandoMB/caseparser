import { convertStringKey, convertJson } from '../parser';
import { CaseParserInput } from '../types';
import { isString } from '../utils';


export function snakeToCamel(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'snakeToCamel');
  return convertJson(input, snakeToCamel);
}

export function snakeToDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'snakeToDash');
  return convertJson(input, snakeToDash);
}

export function snakeToPascal(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'snakeToPascal');
  return convertJson(input, snakeToPascal);
}

export function snakeToUpperSnake(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'snakeToUpperSnake');
  return convertJson(input, snakeToUpperSnake);
}

export function snakeToUpperDash(input: CaseParserInput) {
  if (input === null || input === undefined) return null;
  if (isString(input)) return convertStringKey(input, 'snakeToUpperDash');
  return convertJson(input, snakeToUpperDash);
}
