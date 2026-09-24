import { describe, expect, test } from 'vitest';
import * as caseparser from '../index.ts';

describe('Title Case', () => {
  const input = {
    string: 'Grand Rapids Charter Township',
    json: {
      "Id": 1,
      "Is Under Age": false,
      "First Name": "John",
      "Last Name": "Doe",
      "Email": "john.doe@example.com",
      "Telephone Numbers": [
        "(616) 361-1338",
        "(907) 742-5450",
      ],
      "Addresses": [
        {
          "Country": "United States",
          "State": "Illinois",
          "City": "Rockford",
          "Postal Code": "61105",
          "Street": {
            "Street Name": "41 Forest Run Circle",
            "Street Number": "539"
          }
        },
        {
          "Country": "United States",
          "State": "Texas",
          "City": "Conroe",
          "Postal Code": "77301",
          "Street": {
            "Street Name": "E Phillips St",
            "Street Number": "200"
          }
        }
      ]
    }
  };
  test('Should convert a string from titleToCamel', () => {
    expect(caseparser.titleToCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownship"');
  });
  test('Should convert a string from titleToPascal', () => {
    expect(caseparser.titleToPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownship"');
  });
  test('Should convert a string from titleToSnake', () => {
    expect(caseparser.titleToSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township"');
  });
  test('Should convert a string from titleToDash', () => {
    expect(caseparser.titleToDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township"');
  });
  test('Should convert a string from titleToUpperSnake', () => {
    expect(caseparser.titleToUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP"');
  });
  test('Should convert a string from titleToUpperDash', () => {
    expect(caseparser.titleToUpperDash(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP"');
  });
  test('Should convert a string from titleToTrain', () => {
    expect(caseparser.titleToTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township"');
  });
  test('Should convert a string from titleToDot', () => {
    expect(caseparser.titleToDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township"');
  });
  test('Should convert a string from titleToSentence', () => {
    expect(caseparser.titleToSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township"');
  });
  test('Should convert a json from titleToCamel', () => {
    expect(caseparser.titleToCamel(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToPascal', () => {
    expect(caseparser.titleToPascal(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToSnake', () => {
    expect(caseparser.titleToSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToDash', () => {
    expect(caseparser.titleToDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToUpperSnake', () => {
    expect(caseparser.titleToUpperSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToUpperDash', () => {
    expect(caseparser.titleToUpperDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToTrain', () => {
    expect(caseparser.titleToTrain(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToDot', () => {
    expect(caseparser.titleToDot(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from titleToSentence', () => {
    expect(caseparser.titleToSentence(input.json)).toMatchInlineSnapshot(`
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
