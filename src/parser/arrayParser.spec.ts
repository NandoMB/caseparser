import { describe, expect, test } from 'vitest';
import * as caseparser from '../index.ts';


describe('arrayParser', () => {
  test('Should convert the keys of objects inside an array passed directly', () => {
    const input = [
      { firstName: 'John', addresses: [{ postalCode: '61105' }] },
      { firstName: 'Jane', addresses: [] }
    ];

    expect(caseparser.camelToSnake(input)).toEqual([
      { first_name: 'John', addresses: [{ postal_code: '61105' }] },
      { first_name: 'Jane', addresses: [] }
    ]);
  });

  test('Should convert the keys of objects inside nested arrays', () => {
    const input = [[{ firstName: 'John' }], [[{ lastName: 'Doe' }]]];

    expect(caseparser.camelToSnake(input)).toEqual([[{ first_name: 'John' }], [[{ last_name: 'Doe' }]]]);
  });

  test('Should keep primitive items untouched', () => {
    const input = ['firstName', 1, null, true, [{ firstName: 'John' }]];

    expect(caseparser.camelToSnake(input)).toEqual(['firstName', 1, null, true, [{ first_name: 'John' }]]);
  });
});
