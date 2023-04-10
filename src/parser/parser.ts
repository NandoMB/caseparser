import { ParserType, Result } from '../types';
import { isArray, isObject, isString } from '../utils';
import arrayParser from './arrayParser';
import objectParser from './objectParser';
import stringParser from './stringParser';


export function converter<T extends object | string, P extends ParserType>(input: T, type: P) {
  let result;
  if (isString(input)) result = stringParser(input, type);
  if (isArray(input)) result = arrayParser(input, type);
  if (isObject(input)) result = objectParser(input, type);
  return result as Result<T, P>;
}
