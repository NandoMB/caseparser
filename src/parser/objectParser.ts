import { isArray, isObject } from '../utils.ts';
import arrayParser from './arrayParser.ts';

export default function objectParser<T extends object>(input: T, convertKey: (key: string) => string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const property of Object.keys(input) as Array<keyof T & string>) {
    const parsedKey = convertKey(property);
    const value = input[property];
    let parsedValue: unknown;
    if (isArray(value)) {
      parsedValue = arrayParser(value, convertKey);
    } else if (isObject(value)) {
      parsedValue = objectParser(value, convertKey);
    } else {
      parsedValue = value;
    }
    Object.defineProperty(result, parsedKey, { value: parsedValue, enumerable: true, writable: true, configurable: true });
  }
  return result;
}
