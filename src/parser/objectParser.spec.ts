import { describe, expect, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('objectParser', () => {
  test('Should keep "__proto__" as an own key instead of replacing the result prototype', () => {
    const input = JSON.parse('{"__proto__":{"isAdmin":true},"userName":"john"}');
    const result = caseparser.toSnake(input, { ignore: ['__proto__'] }) as Record<string, any>;
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.is_admin).toBeUndefined();
    expect(Object.keys(result)).toEqual(['__proto__', 'user_name']);
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')?.value).toEqual({ is_admin: true });
    expect(({} as Record<string, any>).is_admin).toBeUndefined();
  });

  test('Should keep "__proto__" as an own key in every object of an array', () => {
    const input = JSON.parse('[{"__proto__":{"isAdmin":true}},{"__proto__":{"isAdmin":true}}]');
    const result = caseparser.toSnake(input, { ignore: ['__proto__'] }) as Array<Record<string, any>>;
    for (const item of result) {
      expect(Object.getPrototypeOf(item)).toBe(Object.prototype);
      expect(Object.keys(item)).toEqual(['__proto__']);
      expect(Object.getOwnPropertyDescriptor(item, '__proto__')?.value).toEqual({ is_admin: true });
    }
  });

  test('Should convert "__proto__" to a regular key that never replaces the result prototype', () => {
    const result = caseparser.toSnake(JSON.parse('{"__proto__":{"isAdmin":true}}')) as Record<string, any>;
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result).toEqual({ proto: { is_admin: true } });
  });

  test('Should not copy inherited properties', () => {
    const input = Object.create({ inheritedKey: 1 });
    input.ownKey = 2;
    expect(caseparser.toSnake(input)).toEqual({ own_key: 2 });
  });

  test('Should convert objects with a "constructor" key', () => {
    const input = JSON.parse('{"user_id":1,"constructor":"x","nested_obj":{"constructor":{"inner_key":2},"a_b":3}}');
    const result = caseparser.toCamel(input);
    expect(result).toEqual({ userId: 1, constructor: 'x', nestedObj: { constructor: { innerKey: 2 }, aB: 3 } });
    expect(result.nestedObj).not.toBe(input.nested_obj);
  });

  test('Should keep objects without a prototype and class instances as they are', () => {
    const noPrototype = Object.assign(Object.create(null), { a_b: 1 });
    class User { first_name = 'Ada'; }
    const user = new User();
    const result = caseparser.toCamel({ no_prototype: noPrototype, user_value: user }) as Record<string, unknown>;
    expect(result.noPrototype).toBe(noPrototype);
    expect(result.userValue).toBe(user);
  });
});
