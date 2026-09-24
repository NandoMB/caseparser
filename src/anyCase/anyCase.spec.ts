import { describe, expect, expectTypeOf, test } from 'vitest';
import * as caseparser from '../index.ts';
import { words } from './words.ts';

describe('words', () => {
  test.each([
    ['helloWorld', ['hello', 'world']],
    ['HelloWorld', ['hello', 'world']],
    ['hello_world', ['hello', 'world']],
    ['hello-world', ['hello', 'world']],
    ['HELLO_WORLD', ['hello', 'world']],
    ['HELLO-WORLD', ['hello', 'world']],
    ['Hello-World', ['hello', 'world']],
    ['hello.world', ['hello', 'world']],
    ['Hello World', ['hello', 'world']],
    ['Hello world', ['hello', 'world']],
    ['userID', ['user', 'id']],
    ['ID', ['id']],
    ['XMLHttpRequest', ['xml', 'http', 'request']],
    ['getHTTPResponseCode', ['get', 'http', 'response', 'code']],
    ['X-API-Key', ['x', 'api', 'key']],
    ['html5Parser', ['html5', 'parser']],
    ['v2Api', ['v2', 'api']],
    ['first_name-mixed.caseKey', ['first', 'name', 'mixed', 'case', 'key']],
    ['__leading--double..sep  ', ['leading', 'double', 'sep']],
    ['', []],
  ])('Should split %j into words', (input, expected) => {
    expect(words(input)).toEqual(expected);
  });
});

describe('toX (from any case)', () => {
  const input = {
    string: 'grand_rapids-charter.townshipID',
    json: {
      "id": 1,
      "is_under_age": false,
      "firstName": "John",
      "Last-Name": "Doe",
      "EMAIL_ADDRESS": "john.doe@example.com",
      "telephone.numbers": [
        "(616) 361-1338",
      ],
      "Home Addresses": [
        {
          "postal_code": "61105",
          "Street": {
            "streetName": "41 Forest Run Circle",
            "STREET-NUMBER": "539"
          }
        }
      ]
    }
  };
  test('Should convert a string from any case', () => {
    expect(caseparser.toCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownshipId"');
    expect(caseparser.toPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownshipId"');
    expect(caseparser.toSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township_id"');
    expect(caseparser.toDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township-id"');
    expect(caseparser.toUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP_ID"');
    expect(caseparser.toUpperDash(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP-ID"');
    expect(caseparser.toTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township-Id"');
    expect(caseparser.toDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township.id"');
    expect(caseparser.toTitle(input.string)).toMatchInlineSnapshot('"Grand Rapids Charter Township Id"');
    expect(caseparser.toSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township id"');
  });
  test('Should convert a json from any case to camelCase', () => {
    expect(caseparser.toCamel(input.json)).toMatchInlineSnapshot(`
      {
        "emailAddress": "john.doe@example.com",
        "firstName": "John",
        "homeAddresses": [
          {
            "postalCode": "61105",
            "street": {
              "streetName": "41 Forest Run Circle",
              "streetNumber": "539",
            },
          },
        ],
        "id": 1,
        "isUnderAge": false,
        "lastName": "Doe",
        "telephoneNumbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should convert a json from any case to snake_case', () => {
    expect(caseparser.toSnake(input.json)).toMatchInlineSnapshot(`
      {
        "email_address": "john.doe@example.com",
        "first_name": "John",
        "home_addresses": [
          {
            "postal_code": "61105",
            "street": {
              "street_name": "41 Forest Run Circle",
              "street_number": "539",
            },
          },
        ],
        "id": 1,
        "is_under_age": false,
        "last_name": "Doe",
        "telephone_numbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should convert a json from any case to Title Case', () => {
    expect(caseparser.toTitle(input.json)).toMatchInlineSnapshot(`
      {
        "Email Address": "john.doe@example.com",
        "First Name": "John",
        "Home Addresses": [
          {
            "Postal Code": "61105",
            "Street": {
              "Street Name": "41 Forest Run Circle",
              "Street Number": "539",
            },
          },
        ],
        "Id": 1,
        "Is Under Age": false,
        "Last Name": "Doe",
        "Telephone Numbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should keep values, non-plain objects and primitives inside arrays untouched', () => {
    const date = new Date(0);
    const result = caseparser.toSnake({ createdAt: date, tags: ['someTag', { tagName: 'x' }] });
    expect(result.created_at).toBe(date);
    expect(result.tags).toEqual(['someTag', { tag_name: 'x' }]);
  });
});

describe('toX types', () => {
  test('Should infer the converted keys from any case, deeply', () => {
    const data = {
      user_id: 1,
      'Last-Name': 'Doe',
      XMLHttpRequest: true,
      'Home Addresses': [{ POSTAL_CODE: '61105' }],
    };
    expectTypeOf(caseparser.toCamel(data)).toEqualTypeOf<{
      userId: number;
      lastName: string;
      xmlHttpRequest: boolean;
      homeAddresses: { postalCode: string }[];
    }>();
    expectTypeOf(caseparser.toSnake(data)).toEqualTypeOf<{
      user_id: number;
      last_name: string;
      xml_http_request: boolean;
      home_addresses: { postal_code: string }[];
    }>();
    expectTypeOf(caseparser.toSentence(data)).toEqualTypeOf<{
      'User id': number;
      'Last name': string;
      'Xml http request': boolean;
      'Home addresses': { 'Postal code': string }[];
    }>();
  });
  test('Should split words in types the same way as at runtime', () => {
    const keys = { userID: 1, getHTTPResponseCode: 1, 'X-API-Key': 1, html5Parser: 1, v2Api: 1, '__leading--double..sep  ': 1 };
    expectTypeOf(caseparser.toDash(keys)).toEqualTypeOf<{
      'user-id': number;
      'get-http-response-code': number;
      'x-api-key': number;
      'html5-parser': number;
      'v2-api': number;
      'leading-double-sep': number;
    }>();
  });
  test('Should keep string keys and string inputs as string', () => {
    expectTypeOf(caseparser.toCamel({} as Record<string, number>)).toEqualTypeOf<{ [x: string]: number }>();
    expectTypeOf(caseparser.toCamel('hello_world')).toEqualTypeOf<string>();
  });
});
