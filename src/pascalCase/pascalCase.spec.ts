import { describe, expect, test } from 'vitest';
import caseparser from '../index';


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
});
