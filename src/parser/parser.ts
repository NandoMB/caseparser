import type { ParserType, Result } from '../types.ts';
import { isArray, isObject, isString } from '../utils.ts';
import arrayParser from './arrayParser.ts';
import objectParser from './objectParser.ts';
import stringParser from './stringParser.ts';

/** Converts a string, or the keys of an object/array (deeply), with `convertKey`. */
export function convert(input: unknown, convertKey: (key: string) => string): unknown {
  if (isString(input)) return convertKey(input);
  if (isArray(input)) return arrayParser(input, convertKey);
  if (isObject(input)) return objectParser(input, convertKey);
  return undefined;
}

export function converter<T extends object | string, P extends ParserType>(input: T, type: P) {
  return convert(input, (key) => stringParser(key, type)) as Result<T, P>;
}
