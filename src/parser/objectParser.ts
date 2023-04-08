import { ParserType } from '../types';
import { isArray, isObject } from '../utils';
import arrayParser from './arrayParser';
import stringParser from './stringParser';

export default function objectParser<T extends object, P extends ParserType>(input: T, type: P) {
  const result = {} as any;
  for (const property in input) {
    const parsedKey = stringParser(property, type);
    const value = input[property];
    if (isArray(value)) {
      result[parsedKey] = arrayParser(value, type);
    } else if (isObject(value)) {
      result[parsedKey] = objectParser(value, type);
    } else {
      result[parsedKey] = value;
    }
  }
  return result;
}
