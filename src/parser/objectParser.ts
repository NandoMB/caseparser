import { isObject } from '../utils.ts';
import arrayParser from './arrayParser.ts';
import type { Context } from './context.ts';

export default function objectParser<T extends object>(input: T, context: Context): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const keys = Object.keys(input);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const { cache } = context;
    let parsedKey = cache?.get(key);
    if (parsedKey === undefined) {
      parsedKey = context.convertKey(key);
      cache?.set(key, parsedKey);
    }
    let value = (input as Record<string, unknown>)[key];
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) value = arrayParser(value, context);
      else if (isObject(value)) value = objectParser(value, context);
    }
    if (parsedKey === '__proto__') {
      Object.defineProperty(result, parsedKey, { value, enumerable: true, writable: true, configurable: true });
    } else {
      result[parsedKey] = value;
    }
  }
  return result;
}
