import type { ParserType, Result } from '../types.ts';
import { isArray, isObject, isString } from '../utils.ts';
import arrayParser from './arrayParser.ts';
import objectParser from './objectParser.ts';
import stringParser from './stringParser.ts';

export function converter<T extends object | string, P extends ParserType>(input: T, type: P) {
  let result;
  if (isString(input)) result = stringParser(input, type);
  if (isArray(input)) result = arrayParser(input, type);
  if (isObject(input)) result = objectParser(input, type);
  return result as Result<T, P>;
}
