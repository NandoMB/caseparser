import { isArray, isObject } from '../utils.ts';
import objectParser from './objectParser.ts';

export default function arrayParser<T extends Array<unknown>>(input: T, convertKey: (key: string) => string): Array<unknown> {
  return input.map((item) => {
    if (isArray(item)) return arrayParser(item, convertKey);
    if (isObject(item)) return objectParser(item, convertKey);
    return item;
  });
}
