import { describe, expect, expectTypeOf, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('PascalCase', () => {
  const input = {
    string: 'GrandRapidsCharterTownship',
    json: {
      "Id": 1,
      "IsUnderAge": false,
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john.doe@example.com",
      "TelephoneNumbers": [
        "(616) 361-1338",
        "(907) 742-5450",
      ],
      "Addresses": [
        {
          "Country": "United States",
          "State": "Illinois",
          "City": "Rockford",
          "PostalCode": "61105",
          "Street": {
            "StreetName": "41 Forest Run Circle",
            "StreetNumber": "539"
          }
        },
        {
          "Country": "United States",
          "State": "Texas",
          "City": "Conroe",
          "PostalCode": "77301",
          "Street": {
            "StreetName": "E Phillips St",
            "StreetNumber": "200"
          }
        }
      ]
    }
  };
  test('Should convert a string from pascalToCamel', () => {
    expect(caseparser.pascalToCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownship"');
  });
  test('Should convert a string from pascalToDash', () => {
    expect(caseparser.pascalToDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township"');
  });
  test('Should convert a string from pascalToSnake', () => {
    expect(caseparser.pascalToSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township"');
  });
  test('Should convert a string from pascalToUpperDash', () => {
    expect(caseparser.pascalToUpperDash(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP"');
  });
  test('Should convert a string from pascalToUpperSnake', () => {
    expect(caseparser.pascalToUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP"');
  });
  test('Should convert a json from pascalToCamel', () => {
    expect(caseparser.pascalToCamel(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from pascalToDash', () => {
    expect(caseparser.pascalToDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from pascalToSnake', () => {
    expect(caseparser.pascalToSnake(input.json)).toMatchInlineSnapshot(`
      {
        "addresses": [
          {
            "city": "Rockford",
            "country": "United States",
            "postal_code": "61105",
            "state": "Illinois",
            "street": {
              "street_name": "41 Forest Run Circle",
              "street_number": "539",
            },
          },
          {
            "city": "Conroe",
            "country": "United States",
            "postal_code": "77301",
            "state": "Texas",
            "street": {
              "street_name": "E Phillips St",
              "street_number": "200",
            },
          },
        ],
        "email": "john.doe@example.com",
        "first_name": "John",
        "id": 1,
        "is_under_age": false,
        "last_name": "Doe",
        "telephone_numbers": [
          "(616) 361-1338",
          "(907) 742-5450",
        ],
      }
    `);
  });
  test('Should convert a json from pascalToUpperDash', () => {
    expect(caseparser.pascalToUpperDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from pascalToUpperSnake', () => {
    expect(caseparser.pascalToUpperSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a string from pascalToTrain', () => {
    expect(caseparser.pascalToTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township"');
  });
  test('Should convert a string from pascalToDot', () => {
    expect(caseparser.pascalToDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township"');
  });
  test('Should convert a json from pascalToTrain', () => {
    expect(caseparser.pascalToTrain(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from pascalToDot', () => {
    expect(caseparser.pascalToDot(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a string from pascalToTitle', () => {
    expect(caseparser.pascalToTitle(input.string)).toMatchInlineSnapshot('"Grand Rapids Charter Township"');
  });
  test('Should convert a string from pascalToSentence', () => {
    expect(caseparser.pascalToSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township"');
  });
  test('Should convert a json from pascalToTitle', () => {
    expect(caseparser.pascalToTitle(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from pascalToSentence', () => {
    expect(caseparser.pascalToSentence(input.json)).toMatchInlineSnapshot(`
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

describe('PascalCase types', () => {
  test('Should infer the converted keys of a nested API response for every pascalToX function', () => {
    const response = {
      UserId: 42,
      FirstName: 'Ada',
      LastName: 'Lovelace',
      BillingAddress: { PostalCode: '61105', StreetName: 'Forest Run Circle' },
      RecentOrders: [{ OrderId: 1, TotalAmount: 99.9 }]
    };
    expectTypeOf(caseparser.pascalToCamel(response)).toEqualTypeOf<{
      userId: number;
      firstName: string;
      lastName: string;
      billingAddress: { postalCode: string; streetName: string };
      recentOrders: { orderId: number; totalAmount: number }[];
    }>();
    expectTypeOf(caseparser.pascalToSnake(response)).toEqualTypeOf<{
      user_id: number;
      first_name: string;
      last_name: string;
      billing_address: { postal_code: string; street_name: string };
      recent_orders: { order_id: number; total_amount: number }[];
    }>();
    expectTypeOf(caseparser.pascalToDash(response)).toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
      'last-name': string;
      'billing-address': { 'postal-code': string; 'street-name': string };
      'recent-orders': { 'order-id': number; 'total-amount': number }[];
    }>();
    expectTypeOf(caseparser.pascalToUpperSnake(response)).toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
      LAST_NAME: string;
      BILLING_ADDRESS: { POSTAL_CODE: string; STREET_NAME: string };
      RECENT_ORDERS: { ORDER_ID: number; TOTAL_AMOUNT: number }[];
    }>();
    expectTypeOf(caseparser.pascalToUpperDash(response)).toEqualTypeOf<{
      'USER-ID': number;
      'FIRST-NAME': string;
      'LAST-NAME': string;
      'BILLING-ADDRESS': { 'POSTAL-CODE': string; 'STREET-NAME': string };
      'RECENT-ORDERS': { 'ORDER-ID': number; 'TOTAL-AMOUNT': number }[];
    }>();
    expectTypeOf(caseparser.pascalToTrain(response)).toEqualTypeOf<{
      'User-Id': number;
      'First-Name': string;
      'Last-Name': string;
      'Billing-Address': { 'Postal-Code': string; 'Street-Name': string };
      'Recent-Orders': { 'Order-Id': number; 'Total-Amount': number }[];
    }>();
    expectTypeOf(caseparser.pascalToDot(response)).toEqualTypeOf<{
      'user.id': number;
      'first.name': string;
      'last.name': string;
      'billing.address': { 'postal.code': string; 'street.name': string };
      'recent.orders': { 'order.id': number; 'total.amount': number }[];
    }>();
    expectTypeOf(caseparser.pascalToTitle(response)).toEqualTypeOf<{
      'User Id': number;
      'First Name': string;
      'Last Name': string;
      'Billing Address': { 'Postal Code': string; 'Street Name': string };
      'Recent Orders': { 'Order Id': number; 'Total Amount': number }[];
    }>();
    expectTypeOf(caseparser.pascalToSentence(response)).toEqualTypeOf<{
      'User id': number;
      'First name': string;
      'Last name': string;
      'Billing address': { 'Postal code': string; 'Street name': string };
      'Recent orders': { 'Order id': number; 'Total amount': number }[];
    }>();
  });
});
