import type { ParserType } from '../types.ts';
import { isArray, isObject } from '../utils.ts';
import arrayParser from './arrayParser.ts';
import stringParser from './stringParser.ts';

export default function objectParser<T extends object, P extends ParserType>(input: T, type: P): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const property of Object.keys(input) as Array<keyof T & string>) {
    const parsedKey = stringParser(property, type);
    const value = input[property];
    let parsedValue: unknown;
    if (isArray(value)) {
      parsedValue = arrayParser(value, type);
    } else if (isObject(value)) {
      parsedValue = objectParser(value, type);
    } else {
      parsedValue = value;
    }
    Object.defineProperty(result, parsedKey, { value: parsedValue, enumerable: true, writable: true, configurable: true });
  }
  return result;
}
