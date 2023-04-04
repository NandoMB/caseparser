import { describe, expect, test } from 'vitest';
import caseparser from '../index';


describe('UPPER_SNAKE_CASE', () => {
  const input = {
    string: 'GRAND_RAPIDS_CHARTER_TOWNSHIP',
    json: {
      "ID": 1,
      "IS_UNDER_AGE": false,
      "FIRST_NAME": "John",
      "LAST_NAME": "Doe",
      "EMAIL": "john.doe@example.com",
      "TELEPHONE_NUMBERS": [
        "(616) 361-1338",
        "(907) 742-5450",
      ],
      "ADDRESSES": [
        {
          "COUNTRY": "United States",
          "STATE": "Illinois",
          "CITY": "Rockford",
          "POSTAL_CODE": "61105",
          "STREET": {
            "STREET_NAME": "41 Forest Run Circle",
            "STREET_NUMBER": "539"
          }
        },
        {
          "COUNTRY": "United States",
          "STATE": "Texas",
          "CITY": "Conroe",
          "POSTAL_CODE": "77301",
          "STREET": {
            "STREET_NAME": "E Phillips St",
            "STREET_NUMBER": "200"
          }
        }
      ]
    }
  };
  test('Should convert a string from upperSnakeToCamel', () => {
    expect(caseparser.upperSnakeToCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownship"');
  });
  test('Should convert a string from upperSnakeToDash', () => {
    expect(caseparser.upperSnakeToDash(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township"');
  });
  test('Should convert a string from upperSnakeToPascal', () => {
    expect(caseparser.upperSnakeToPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownship"');
  });
  test('Should convert a string from upperSnakeToSnake', () => {
    expect(caseparser.upperSnakeToSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township"');
  });
  test('Should convert a string from upperSnakeToUpperDash', () => {
    expect(caseparser.upperSnakeToUpperDash(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP"');
  });
  test('Should convert a json from upperSnakeToCamel', () => {
    expect(caseparser.upperSnakeToCamel(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperSnakeToDash', () => {
    expect(caseparser.upperSnakeToDash(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperSnakeToPascal', () => {
    expect(caseparser.upperSnakeToPascal(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperSnakeToSnake', () => {
    expect(caseparser.upperSnakeToSnake(input.json)).toMatchInlineSnapshot(`
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
  test('Should convert a json from upperSnakeToUpperDash', () => {
    expect(caseparser.upperSnakeToUpperDash(input.json)).toMatchInlineSnapshot(`
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
});

