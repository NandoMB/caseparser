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

describe('toX symbols', () => {
  test.each([
    ['$Hello-world', false, ['hello', 'world']],
    ['$Hello-world', true, ['$hello', 'world']],
    ['$catDog', false, ['cat', 'dog']],
    ['$catDog', true, ['$cat', 'dog']],
    ['@type', ['$'], ['type']],
    ['$ref', ['$'], ['$ref']],
    ['first$Name-@last', ['@'], ['first', 'name', '@last']],
    ['price%Rate', true, ['price', '%rate']],
    ['$$hello$World$$hi', false, ['hello', 'world', 'hi']],
    ['$$hello$World$$hi', true, ['$$hello', '$world', '$$hi']],
    ['user@name', false, ['user', 'name']],
    ['user@name', true, ['user', '@name']],
    ['total%', true, ['total%']],
    ['total%_count', true, ['total%', 'count']],
    ['a$$', true, ['a$$']],
    ['$_id', true, ['$', 'id']],
    ['_links', true, ['links']],
    ['名前_key', false, ['名前', 'key']],
    ['$', false, []],
  ] as const)('Should split %j with keepSymbols %j', (input, keep, expected) => {
    expect(words(input, keep)).toEqual(expected);
  });
  test('Should remove symbols by default, keep all with true, or keep only the listed ones', () => {
    const data = { $ref: 1, '@type': 'x', user_id: 2 };
    expect(caseparser.toCamel(data)).toEqual({ ref: 1, type: 'x', userId: 2 });
    expect(caseparser.toCamel(data, true)).toEqual({ $ref: 1, '@type': 'x', userId: 2 });
    expect(caseparser.toCamel(data, ['$'])).toEqual({ $ref: 1, type: 'x', userId: 2 });
    expect(caseparser.toCamel(data, false)).toEqual(caseparser.toCamel(data));
  });
  test('Should capitalize the first letter after kept symbols', () => {
    expect(caseparser.toCamel('$Hello-world', true)).toBe('$helloWorld');
    expect(caseparser.toPascal('$id', true)).toBe('$Id');
    expect(caseparser.toTitle('@first_name', true)).toBe('@First Name');
    expect(caseparser.toSentence('$first_name', true)).toBe('$First name');
    expect(caseparser.toUpperSnake('$first_name', ['$'])).toBe('$FIRST_NAME');
    expect(caseparser.toPascal('$$hello$World$$hi')).toBe('HelloWorldHi');
    expect(caseparser.toPascal('$$hello$World$$hi', true)).toBe('$$Hello$World$$Hi');
    expect(caseparser.toSnake('$$hello$World$$hi', true)).toBe('$$hello_$world_$$hi');
  });
});

describe('toX types', () => {
  test('Should infer keys with symbols removed, kept or partially kept', () => {
    const data = { $ref: 1, '@type': 'x', user_id: 2 };
    expectTypeOf(caseparser.toCamel(data)).toEqualTypeOf<{ ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, false)).toEqualTypeOf<{ ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, true)).toEqualTypeOf<{ $ref: number; '@type': string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, ['$'])).toEqualTypeOf<{ $ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toPascal({ $first_name: 1 }, true)).toEqualTypeOf<{ $FirstName: number }>();
    expectTypeOf(caseparser.toSentence({ '@first_name': 1 }, ['@'])).toEqualTypeOf<{ '@First name': number }>();
    expectTypeOf(caseparser.toPascal({ $$hello$World$$hi: 1 })).toEqualTypeOf<{ HelloWorldHi: number }>();
    expectTypeOf(caseparser.toSnake({ $$hello$World$$hi: 1, 'total%': 2 }, true)).toEqualTypeOf<{ $$hello_$world_$$hi: number; 'total%': number }>();
  });
  test('Should fall back to string keys when keepSymbols is only known at runtime', () => {
    const data = { $ref: 1 };
    expectTypeOf(caseparser.toCamel(data, true as boolean)).toEqualTypeOf<{ [x: string]: number }>();
    expectTypeOf(caseparser.toCamel(data, [] as string[])).toEqualTypeOf<{ [x: string]: number }>();
  });
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
  test('Should infer the converted keys of a nested API response for every toX function', () => {
    const response = {
      user_id: 42,
      first_name: 'Ada',
      last_name: 'Lovelace',
      billing_address: { postal_code: '61105', street_name: 'Forest Run Circle' },
      recent_orders: [{ order_id: 1, total_amount: 99.9 }]
    };
    expectTypeOf(caseparser.toCamel(response)).toEqualTypeOf<{
      userId: number;
      firstName: string;
      lastName: string;
      billingAddress: { postalCode: string; streetName: string };
      recentOrders: { orderId: number; totalAmount: number }[];
    }>();
    expectTypeOf(caseparser.toDash(response)).toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
      'last-name': string;
      'billing-address': { 'postal-code': string; 'street-name': string };
      'recent-orders': { 'order-id': number; 'total-amount': number }[];
    }>();
    expectTypeOf(caseparser.toDot(response)).toEqualTypeOf<{
      'user.id': number;
      'first.name': string;
      'last.name': string;
      'billing.address': { 'postal.code': string; 'street.name': string };
      'recent.orders': { 'order.id': number; 'total.amount': number }[];
    }>();
    expectTypeOf(caseparser.toPascal(response)).toEqualTypeOf<{
      UserId: number;
      FirstName: string;
      LastName: string;
      BillingAddress: { PostalCode: string; StreetName: string };
      RecentOrders: { OrderId: number; TotalAmount: number }[];
    }>();
    expectTypeOf(caseparser.toSentence(response)).toEqualTypeOf<{
      'User id': number;
      'First name': string;
      'Last name': string;
      'Billing address': { 'Postal code': string; 'Street name': string };
      'Recent orders': { 'Order id': number; 'Total amount': number }[];
    }>();
    expectTypeOf(caseparser.toSnake(response)).toEqualTypeOf<{
      user_id: number;
      first_name: string;
      last_name: string;
      billing_address: { postal_code: string; street_name: string };
      recent_orders: { order_id: number; total_amount: number }[];
    }>();
    expectTypeOf(caseparser.toTitle(response)).toEqualTypeOf<{
      'User Id': number;
      'First Name': string;
      'Last Name': string;
      'Billing Address': { 'Postal Code': string; 'Street Name': string };
      'Recent Orders': { 'Order Id': number; 'Total Amount': number }[];
    }>();
    expectTypeOf(caseparser.toTrain(response)).toEqualTypeOf<{
      'User-Id': number;
      'First-Name': string;
      'Last-Name': string;
      'Billing-Address': { 'Postal-Code': string; 'Street-Name': string };
      'Recent-Orders': { 'Order-Id': number; 'Total-Amount': number }[];
    }>();
    expectTypeOf(caseparser.toUpperDash(response)).toEqualTypeOf<{
      'USER-ID': number;
      'FIRST-NAME': string;
      'LAST-NAME': string;
      'BILLING-ADDRESS': { 'POSTAL-CODE': string; 'STREET-NAME': string };
      'RECENT-ORDERS': { 'ORDER-ID': number; 'TOTAL-AMOUNT': number }[];
    }>();
    expectTypeOf(caseparser.toUpperSnake(response)).toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
      LAST_NAME: string;
      BILLING_ADDRESS: { POSTAL_CODE: string; STREET_NAME: string };
      RECENT_ORDERS: { ORDER_ID: number; TOTAL_AMOUNT: number }[];
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
