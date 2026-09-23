import { describe, expect, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('objectParser', () => {
  test('Should keep "__proto__" as an own key instead of replacing the result prototype', () => {
    const input = JSON.parse('{"__proto__":{"isAdmin":true},"userName":"john"}');
    const result = caseparser.camelToSnake(input) as Record<string, any>;
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.is_admin).toBeUndefined();
    expect(Object.keys(result)).toEqual(['__proto__', 'user_name']);
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')?.value).toEqual({ is_admin: true });
    expect(({} as Record<string, any>).is_admin).toBeUndefined();
  });

  test('Should not copy inherited properties', () => {
    const input = Object.create({ inheritedKey: 1 });
    input.ownKey = 2;
    expect(caseparser.camelToSnake(input)).toEqual({ own_key: 2 });
  });
});
