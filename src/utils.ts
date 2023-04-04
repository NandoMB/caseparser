import { CaseParserInput, JsonValue } from './types';

export function isString(data: CaseParserInput): data is string {
  return typeof data === 'string';
}

export function isObject(data: JsonValue): data is {} {
  return Object.prototype.toString.call(data) === '[object Object]';
}

export function isArray(data: JsonValue): data is [] {
  return Object.prototype.toString.call(data) === '[object Array]';
}


