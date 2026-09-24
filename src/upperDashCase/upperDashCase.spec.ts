import { describe, expect, expectTypeOf, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('UPPER-DASH-CASE', () => {
  const input = {
    string: 'GRAND-RAPIDS-CHARTER-TOWNSHIP',
    json: {
      "ID": 1,
      "IS-UNDER-AGE": false,
      "FIRST-NAME": "John",
      "LAST-NAME": "Doe",
      "EMAIL": "john.doe@example.com",
      "TELEPHONE-NUMBERS": [
        "(616) 361-1338",
        "(907) 742-5450",
      ],
      "ADDRESSES": [
        {
          "COUNTRY": "United States",
          "STATE": "Illinois",
          "CITY": "Rockford",
          "POSTAL-CODE": "61105",
          "STREET": {
            "STREET-NAME": "41 Forest Run Circle",
            "STREET-NUMBER": "539"
          }
        },
        {
          "COUNTRY": "United States",
          "STATE": "Texas",
          "CITY": "Conroe",
          "POSTAL-CODE": "77301",
          "STREET": {
            "STREET-NAME": "E Phillips St",
            "STREET-NUMBER": "200"
          }
        }
      ]
    }
  };
  test('Should convert a string from upperDashToCamel', () => {
    expect(caseparser.upperDashToCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownship"');
  });
  test('Should convert a string from upperDashToDash', () => {
    expect(caseparser.upperDashToDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township"');
  });
  test('Should convert a string from upperDashToPascal', () => {
    expect(caseparser.upperDashToPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownship"');
  });
  test('Should convert a string from upperDashToSnake', () => {
    expect(caseparser.upperDashToSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township"');
  });
  test('Should convert a string from upperDashToUpperSnake', () => {
    expect(caseparser.upperDashToUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP"');
  });
  test('Should convert a json from upperDashToCamel', () => {
    expect(caseparser.upperDashToCamel(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToDash', () => {
    expect(caseparser.upperDashToDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToPascal', () => {
    expect(caseparser.upperDashToPascal(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToSnake', () => {
    expect(caseparser.upperDashToSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToUpperSnake', () => {
    expect(caseparser.upperDashToUpperSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a string from upperDashToTrain', () => {
    expect(caseparser.upperDashToTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township"');
  });
  test('Should convert a string from upperDashToDot', () => {
    expect(caseparser.upperDashToDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township"');
  });
  test('Should convert a json from upperDashToTrain', () => {
    expect(caseparser.upperDashToTrain(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToDot', () => {
    expect(caseparser.upperDashToDot(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a string from upperDashToTitle', () => {
    expect(caseparser.upperDashToTitle(input.string)).toMatchInlineSnapshot('"Grand Rapids Charter Township"');
  });
  test('Should convert a string from upperDashToSentence', () => {
    expect(caseparser.upperDashToSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township"');
  });
  test('Should convert a json from upperDashToTitle', () => {
    expect(caseparser.upperDashToTitle(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperDashToSentence', () => {
    expect(caseparser.upperDashToSentence(input.json)).toMatchInlineSnapshot(`
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

describe('UPPER-DASH-CASE types', () => {
  test('Should infer the converted keys of a nested API response for every upperDashToX function', () => {
    const response = {
      'USER-ID': 42,
      'FIRST-NAME': 'Ada',
      'LAST-NAME': 'Lovelace',
      'BILLING-ADDRESS': { 'POSTAL-CODE': '61105', 'STREET-NAME': 'Forest Run Circle' },
      'RECENT-ORDERS': [{ 'ORDER-ID': 1, 'TOTAL-AMOUNT': 99.9 }]
    };
    expectTypeOf(caseparser.upperDashToCamel(response)).toEqualTypeOf<{
      userId: number;
      firstName: string;
      lastName: string;
      billingAddress: { postalCode: string; streetName: string };
      recentOrders: { orderId: number; totalAmount: number }[];
    }>();
    expectTypeOf(caseparser.upperDashToPascal(response)).toEqualTypeOf<{
      UserId: number;
      FirstName: string;
      LastName: string;
      BillingAddress: { PostalCode: string; StreetName: string };
      RecentOrders: { OrderId: number; TotalAmount: number }[];
    }>();
    expectTypeOf(caseparser.upperDashToSnake(response)).toEqualTypeOf<{
      user_id: number;
      first_name: string;
      last_name: string;
      billing_address: { postal_code: string; street_name: string };
      recent_orders: { order_id: number; total_amount: number }[];
    }>();
    expectTypeOf(caseparser.upperDashToDash(response)).toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
      'last-name': string;
      'billing-address': { 'postal-code': string; 'street-name': string };
      'recent-orders': { 'order-id': number; 'total-amount': number }[];
    }>();
    expectTypeOf(caseparser.upperDashToUpperSnake(response)).toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
      LAST_NAME: string;
      BILLING_ADDRESS: { POSTAL_CODE: string; STREET_NAME: string };
      RECENT_ORDERS: { ORDER_ID: number; TOTAL_AMOUNT: number }[];
    }>();
    expectTypeOf(caseparser.upperDashToTrain(response)).toEqualTypeOf<{
      'User-Id': number;
      'First-Name': string;
      'Last-Name': string;
      'Billing-Address': { 'Postal-Code': string; 'Street-Name': string };
      'Recent-Orders': { 'Order-Id': number; 'Total-Amount': number }[];
    }>();
    expectTypeOf(caseparser.upperDashToDot(response)).toEqualTypeOf<{
      'user.id': number;
      'first.name': string;
      'last.name': string;
      'billing.address': { 'postal.code': string; 'street.name': string };
      'recent.orders': { 'order.id': number; 'total.amount': number }[];
    }>();
    expectTypeOf(caseparser.upperDashToTitle(response)).toEqualTypeOf<{
      'User Id': number;
      'First Name': string;
      'Last Name': string;
      'Billing Address': { 'Postal Code': string; 'Street Name': string };
      'Recent Orders': { 'Order Id': number; 'Total Amount': number }[];
    }>();
    expectTypeOf(caseparser.upperDashToSentence(response)).toEqualTypeOf<{
      'User id': number;
      'First name': string;
      'Last name': string;
      'Billing address': { 'Postal code': string; 'Street name': string };
      'Recent orders': { 'Order id': number; 'Total amount': number }[];
    }>();
  });
});
