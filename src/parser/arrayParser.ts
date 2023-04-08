import { ParserType } from '../types';
import { isArray, isObject } from '../utils';
import objectParser from './objectParser';

export default function arrayParser<T extends Array<unknown>, P extends ParserType>(input: T, type: P): Array<unknown> {
  return input.map((item) => {
    if (isArray(item)) return arrayParser(item, type);
    if (isObject(item)) return objectParser(item, type);
    return item;
  });
}
