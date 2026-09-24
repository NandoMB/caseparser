import { describe, expect, expectTypeOf, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('snake_case', () => {
  const input = {
    string: 'grand_rapids_charter_township',
    json: {
      "id": 1,
      "is_under_age": false,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "telephone_numbers": [
        "(616) 361-1338",
        "(907) 742-5450",
      ],
      "addresses": [
        {
          "country": "United States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        },
        {
          "country": "United States",
          "state": "Texas",
          "city": "Conroe",
          "postal_code": "77301",
          "street": {
            "street_name": "E Phillips St",
            "street_number": "200"
          }
        }
      ]
    }
  };
  test('Should convert a string from snakeToCamel', () => {
    expect(caseparser.snakeToCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownship"');
  });
  test('Should convert a string from snakeToDash', () => {
    expect(caseparser.snakeToDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township"');
  });
  test('Should convert a string from snakeToPascal', () => {
    expect(caseparser.snakeToPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownship"');
  });
  test('Should convert a string from snakeToUpperDash', () => {
    expect(caseparser.snakeToUpperDash(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP"');
  });
  test('Should convert a string from snakeToUpperSnake', () => {
    expect(caseparser.snakeToUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP"');
  });
  test('Should convert a json from snakeToCamel', () => {
    expect(caseparser.snakeToCamel(input.json)).toMatchInlineSnapshot(`
      {
        "addresses": [
          {
            "city": "Rockford",
            "country": "United States",
            "postalCode": "61105",
            "state": "Illinois",
            "street": {
              "streetName": "41 Forest Run Circle",
              "streetNumber": "539",
            },
          },
          {
            "city": "Conroe",
            "country": "United States",
            "postalCode": "77301",
            "state": "Texas",
            "street": {
              "streetName": "E Phillips St",
              "streetNumber": "200",
            },
          },
        ],
        "email": "john.doe@example.com",
        "firstName": "John",
        "id": 1,
        "isUnderAge": false,
        "lastName": "Doe",
        "telephoneNumbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToDash', () => {
    expect(caseparser.snakeToDash(input.json)).toMatchInlineSnapshot(`
      {
        "addresses": [
          {
            "city": "Rockford",
            "country": "United States",
            "postal-code": "61105",
            "state": "Illinois",
            "street": {
              "street-name": "41 Forest Run Circle",
              "street-number": "539",
            },
          },
          {
            "city": "Conroe",
            "country": "United States",
            "postal-code": "77301",
            "state": "Texas",
            "street": {
              "street-name": "E Phillips St",
              "street-number": "200",
            },
          },
        ],
        "email": "john.doe@example.com",
        "first-name": "John",
        "id": 1,
        "is-under-age": false,
        "last-name": "Doe",
        "telephone-numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToPascal', () => {
    expect(caseparser.snakeToPascal(input.json)).toMatchInlineSnapshot(`
      {
        "Addresses": [
          {
            "City": "Rockford",
            "Country": "United States",
            "PostalCode": "61105",
            "State": "Illinois",
            "Street": {
              "StreetName": "41 Forest Run Circle",
              "StreetNumber": "539",
            },
          },
          {
            "City": "Conroe",
            "Country": "United States",
            "PostalCode": "77301",
            "State": "Texas",
            "Street": {
              "StreetName": "E Phillips St",
              "StreetNumber": "200",
            },
          },
        ],
        "Email": "john.doe@example.com",
        "FirstName": "John",
        "Id": 1,
        "IsUnderAge": false,
        "LastName": "Doe",
        "TelephoneNumbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToUpperDash', () => {
    expect(caseparser.snakeToUpperDash(input.json)).toMatchInlineSnapshot(`
      {
        "ADDRESSES": [
          {
            "CITY": "Rockford",
            "COUNTRY": "United States",
            "POSTAL-CODE": "61105",
            "STATE": "Illinois",
            "STREET": {
              "STREET-NAME": "41 Forest Run Circle",
              "STREET-NUMBER": "539",
            },
          },
          {
            "CITY": "Conroe",
            "COUNTRY": "United States",
            "POSTAL-CODE": "77301",
            "STATE": "Texas",
            "STREET": {
              "STREET-NAME": "E Phillips St",
              "STREET-NUMBER": "200",
            },
          },
        ],
        "EMAIL": "john.doe@example.com",
        "FIRST-NAME": "John",
        "ID": 1,
        "IS-UNDER-AGE": false,
        "LAST-NAME": "Doe",
        "TELEPHONE-NUMBERS": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToUpperSnake', () => {
    expect(caseparser.snakeToUpperSnake(input.json)).toMatchInlineSnapshot(`
      {
        "ADDRESSES": [
          {
            "CITY": "Rockford",
            "COUNTRY": "United States",
            "POSTAL_CODE": "61105",
            "STATE": "Illinois",
            "STREET": {
              "STREET_NAME": "41 Forest Run Circle",
              "STREET_NUMBER": "539",
            },
          },
          {
            "CITY": "Conroe",
            "COUNTRY": "United States",
            "POSTAL_CODE": "77301",
            "STATE": "Texas",
            "STREET": {
              "STREET_NAME": "E Phillips St",
              "STREET_NUMBER": "200",
            },
          },
        ],
        "EMAIL": "john.doe@example.com",
        "FIRST_NAME": "John",
        "ID": 1,
        "IS_UNDER_AGE": false,
        "LAST_NAME": "Doe",
        "TELEPHONE_NUMBERS": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a string from snakeToTrain', () => {
    expect(caseparser.snakeToTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township"');
  });
  test('Should convert a string from snakeToDot', () => {
    expect(caseparser.snakeToDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township"');
  });
  test('Should convert a json from snakeToTrain', () => {
    expect(caseparser.snakeToTrain(input.json)).toMatchInlineSnapshot(`
      {
        "Addresses": [
          {
            "City": "Rockford",
            "Country": "United States",
            "Postal-Code": "61105",
            "State": "Illinois",
            "Street": {
              "Street-Name": "41 Forest Run Circle",
              "Street-Number": "539",
            },
          },
          {
            "City": "Conroe",
            "Country": "United States",
            "Postal-Code": "77301",
            "State": "Texas",
            "Street": {
              "Street-Name": "E Phillips St",
              "Street-Number": "200",
            },
          },
        ],
        "Email": "john.doe@example.com",
        "First-Name": "John",
        "Id": 1,
        "Is-Under-Age": false,
        "Last-Name": "Doe",
        "Telephone-Numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToDot', () => {
    expect(caseparser.snakeToDot(input.json)).toMatchInlineSnapshot(`
      {
        "addresses": [
          {
            "city": "Rockford",
            "country": "United States",
            "postal.code": "61105",
            "state": "Illinois",
            "street": {
              "street.name": "41 Forest Run Circle",
              "street.number": "539",
            },
          },
          {
            "city": "Conroe",
            "country": "United States",
            "postal.code": "77301",
            "state": "Texas",
            "street": {
              "street.name": "E Phillips St",
              "street.number": "200",
            },
          },
        ],
        "email": "john.doe@example.com",
        "first.name": "John",
        "id": 1,
        "is.under.age": false,
        "last.name": "Doe",
        "telephone.numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a string from snakeToTitle', () => {
    expect(caseparser.snakeToTitle(input.string)).toMatchInlineSnapshot('"Grand Rapids Charter Township"');
  });
  test('Should convert a string from snakeToSentence', () => {
    expect(caseparser.snakeToSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township"');
  });
  test('Should convert a json from snakeToTitle', () => {
    expect(caseparser.snakeToTitle(input.json)).toMatchInlineSnapshot(`
      {
        "Addresses": [
          {
            "City": "Rockford",
            "Country": "United States",
            "Postal Code": "61105",
            "State": "Illinois",
            "Street": {
              "Street Name": "41 Forest Run Circle",
              "Street Number": "539",
            },
          },
          {
            "City": "Conroe",
            "Country": "United States",
            "Postal Code": "77301",
            "State": "Texas",
            "Street": {
              "Street Name": "E Phillips St",
              "Street Number": "200",
            },
          },
        ],
        "Email": "john.doe@example.com",
        "First Name": "John",
        "Id": 1,
        "Is Under Age": false,
        "Last Name": "Doe",
        "Telephone Numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from snakeToSentence', () => {
    expect(caseparser.snakeToSentence(input.json)).toMatchInlineSnapshot(`
      {
        "Addresses": [
          {
            "City": "Rockford",
            "Country": "United States",
            "Postal code": "61105",
            "State": "Illinois",
            "Street": {
              "Street name": "41 Forest Run Circle",
              "Street number": "539",
            },
          },
          {
            "City": "Conroe",
            "Country": "United States",
            "Postal code": "77301",
            "State": "Texas",
            "Street": {
              "Street name": "E Phillips St",
              "Street number": "200",
            },
          },
        ],
        "Email": "john.doe@example.com",
        "First name": "John",
        "Id": 1,
        "Is under age": false,
        "Last name": "Doe",
        "Telephone numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
});

describe('snake_case types', () => {
  test('Should infer the converted keys of a nested API response for every snakeToX function', () => {
    const response = {
      user_id: 42,
      first_name: 'Ada',
      last_name: 'Lovelace',
      billing_address: { postal_code: '61105', street_name: 'Forest Run Circle' },
      recent_orders: [{ order_id: 1, total_amount: 99.9 }]
    };
    expectTypeOf(caseparser.snakeToCamel(response)).toEqualTypeOf<{
      userId: number;
      firstName: string;
      lastName: string;
      billingAddress: { postalCode: string; streetName: string };
      recentOrders: { orderId: number; totalAmount: number }[];
    }>();
    expectTypeOf(caseparser.snakeToPascal(response)).toEqualTypeOf<{
      UserId: number;
      FirstName: string;
      LastName: string;
      BillingAddress: { PostalCode: string; StreetName: string };
      RecentOrders: { OrderId: number; TotalAmount: number }[];
    }>();
    expectTypeOf(caseparser.snakeToDash(response)).toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
      'last-name': string;
      'billing-address': { 'postal-code': string; 'street-name': string };
      'recent-orders': { 'order-id': number; 'total-amount': number }[];
    }>();
    expectTypeOf(caseparser.snakeToUpperSnake(response)).toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
      LAST_NAME: string;
      BILLING_ADDRESS: { POSTAL_CODE: string; STREET_NAME: string };
      RECENT_ORDERS: { ORDER_ID: number; TOTAL_AMOUNT: number }[];
    }>();
    expectTypeOf(caseparser.snakeToUpperDash(response)).toEqualTypeOf<{
      'USER-ID': number;
      'FIRST-NAME': string;
      'LAST-NAME': string;
      'BILLING-ADDRESS': { 'POSTAL-CODE': string; 'STREET-NAME': string };
      'RECENT-ORDERS': { 'ORDER-ID': number; 'TOTAL-AMOUNT': number }[];
    }>();
    expectTypeOf(caseparser.snakeToTrain(response)).toEqualTypeOf<{
      'User-Id': number;
      'First-Name': string;
      'Last-Name': string;
      'Billing-Address': { 'Postal-Code': string; 'Street-Name': string };
      'Recent-Orders': { 'Order-Id': number; 'Total-Amount': number }[];
    }>();
    expectTypeOf(caseparser.snakeToDot(response)).toEqualTypeOf<{
      'user.id': number;
      'first.name': string;
      'last.name': string;
      'billing.address': { 'postal.code': string; 'street.name': string };
      'recent.orders': { 'order.id': number; 'total.amount': number }[];
    }>();
    expectTypeOf(caseparser.snakeToTitle(response)).toEqualTypeOf<{
      'User Id': number;
      'First Name': string;
      'Last Name': string;
      'Billing Address': { 'Postal Code': string; 'Street Name': string };
      'Recent Orders': { 'Order Id': number; 'Total Amount': number }[];
    }>();
    expectTypeOf(caseparser.snakeToSentence(response)).toEqualTypeOf<{
      'User id': number;
      'First name': string;
      'Last name': string;
      'Billing address': { 'Postal code': string; 'Street name': string };
      'Recent orders': { 'Order id': number; 'Total amount': number }[];
    }>();
  });
});
