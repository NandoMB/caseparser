import { ParserType, OutputType } from '../types';
import { isArray, isObject, isString } from '../utils';
import arrayParser from './arrayParser';
import objectParser from './objectParser';
import stringParser from './stringParser';


type Result<T, P> =
  T extends string ? string :
  T extends Array<unknown> ? T
  : OutputType<T, P>;

export function converter<T extends object | string, P extends ParserType>(input: T, type: P) {
  let result;
  if (isString(input)) result = stringParser(input, type);
  if (isArray(input)) result = arrayParser(input, type);
  if (isObject(input)) result = objectParser(input, type);
  return result as Result<T, P>;
}
