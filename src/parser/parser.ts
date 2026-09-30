import { isArray, isObject, isString } from '../utils.ts';
import arrayParser from './arrayParser.ts';
import type { Context } from './context.ts';
import objectParser from './objectParser.ts';

/** Converts a string, or the keys of an object/array (deeply), with `convertKey`. Keys in `ignore` are kept as they are. */
export function convert(input: unknown, convertKey: (key: string) => string, ignore?: readonly string[]): unknown {
  if (isString(input)) return convertKey(input);
  const array = isArray(input);
  if (!array && !isObject(input)) return undefined;
  const context: Context = { convertKey };
  if (ignore) {
    context.cache = new Map();
    for (const key of ignore) context.cache.set(key, key);
  }
  return array ? arrayParser(input, context) : objectParser(input as object, context);
}
