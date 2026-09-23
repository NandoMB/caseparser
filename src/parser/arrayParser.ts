import type { ParserType } from '../types.ts';
import { isArray, isObject } from '../utils.ts';
import objectParser from './objectParser.ts';

export default function arrayParser<T extends Array<unknown>, P extends ParserType>(input: T, type: P): Array<unknown> {
  return input.map((item) => {
    if (isArray(item)) return arrayParser(item, type);
    if (isObject(item)) return objectParser(item, type);
    return item;
  });
}
