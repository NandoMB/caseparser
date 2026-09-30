import { isObject } from '../utils.ts';
import type { Context } from './context.ts';
import objectParser from './objectParser.ts';

export default function arrayParser<T extends Array<unknown>>(input: T, context: Context): Array<unknown> {
  if (!context.cache) context.cache = new Map();
  const length = input.length;
  const result = new Array<unknown>(length);
  for (let i = 0; i < length; i++) {
    const item = input[i];
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) result[i] = arrayParser(item, context);
      else result[i] = isObject(item) ? objectParser(item, context) : item;
    } else {
      result[i] = item;
    }
  }
  return result;
}
