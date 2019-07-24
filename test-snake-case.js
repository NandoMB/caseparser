'use strict';

const caseparser = require('./lib/caseparser');

const snakeToCamel = {
  string: function () {
    const data = 'first_name_is_before_last_name';
    const expected = 'firstNameIsBeforeLastName';
    const result = caseparser.snakeToCamel(data);
    const isFailed = result !== expected;
    console.log('\t\tsnakeToCamel', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  },
  json: function () {
    const data = {
      "id": 1,
      "is_under_age": false,
      "first_name": "Timothee",
      "last_name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone_numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        }
      ]
    };
    const expected = {
      "id": 1,
      "isUnderAge": false,
      "firstName": "Timothee",
      "lastName": "Clausner",
      "email": "tclausner0@economist.com",
      "telephoneNumbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postalCode": "61105",
          "street": {
            "streetName": "41 Forest Run Circle",
            "streetNumber": "539"
          }
        }
      ]
    };
    const result = caseparser.snakeToCamel(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('\t\tsnakeToCamel', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  }
};

const snakeToDash = {
  string: function () {
    const data = 'first_name_is_before_last_name';
    const expected = 'first-name-is-before-last-name';
    const result = caseparser.snakeToDash(data);
    const isFailed = result !== expected;
    console.log('\t\tsnakeToDash', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  },
  json: function () {
    const data = {
      "id": 1,
      "is_under_age": false,
      "first_name": "Timothee",
      "last_name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone_numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        }
      ]
    };
    const expected = {
      "id": 1,
      "is-under-age": false,
      "first-name": "Timothee",
      "last-name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone-numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal-code": "61105",
          "street": {
            "street-name": "41 Forest Run Circle",
            "street-number": "539"
          }
        }
      ]
    };
    const result = caseparser.snakeToDash(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('\t\tsnakeToDash', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  }
};

const snakeToPascal = {
  string: function () {
    const data = 'first_name_is_before_last_name';
    const expected = 'FirstNameIsBeforeLastName';
    const result = caseparser.snakeToPascal(data);
    const isFailed = result !== expected;
    console.log('\t\tsnakeToPascal', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  },
  json: function () {
    const data = {
      "id": 1,
      "is_under_age": false,
      "first_name": "Timothee",
      "last_name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone_numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        }
      ]
    };
    const expected = {
      "Id": 1,
      "IsUnderAge": false,
      "FirstName": "Timothee",
      "LastName": "Clausner",
      "Email": "tclausner0@economist.com",
      "TelephoneNumbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "Addresses": [
        {
          "Country": "United_States",
          "State": "Illinois",
          "City": "Rockford",
          "PostalCode": "61105",
          "Street": {
            "StreetName": "41 Forest Run Circle",
            "StreetNumber": "539"
          }
        }
      ]
    };
    const result = caseparser.snakeToPascal(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('\t\tsnakeToPascal', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  }
};

const snakeToUpperSnake = {
  string: function () {
    const data = 'first_name_is_before_last_name';
    const expected = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const result = caseparser.snakeToUpperSnake(data);
    const isFailed = result !== expected;
    console.log('\t\tsnakeToUpperSnake', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  },
  json: function () {
    const data = {
      "id": 1,
      "is_under_age": false,
      "first_name": "Timothee",
      "last_name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone_numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        }
      ]
    };
    const expected = {
      "ID": 1,
      "IS_UNDER_AGE": false,
      "FIRST_NAME": "Timothee",
      "LAST_NAME": "Clausner",
      "EMAIL": "tclausner0@economist.com",
      "TELEPHONE_NUMBERS": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "ADDRESSES": [
        {
          "COUNTRY": "United_States",
          "STATE": "Illinois",
          "CITY": "Rockford",
          "POSTAL_CODE": "61105",
          "STREET": {
            "STREET_NAME": "41 Forest Run Circle",
            "STREET_NUMBER": "539"
          }
        }
      ]
    };
    const result = caseparser.snakeToUpperSnake(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('\t\tsnakeToUpperSnake', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  }
};

const snakeToUpperDash = {
  string: function () {
    const data = 'first_name_is_before_last_name';
    const expected = 'FIRST-NAME-IS-BEFORE-LAST-NAME';
    const result = caseparser.snakeToUpperDash(data);
    const isFailed = result !== expected;
    console.log('\t\tsnakeToUpperDash', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected:data ', expected);
      console.error('received: ', result);
    }
  },
  json: function () {
    const data = {
      "id": 1,
      "is_under_age": false,
      "first_name": "Timothee",
      "last_name": "Clausner",
      "email": "tclausner0@economist.com",
      "telephone_numbers": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "addresses": [
        {
          "country": "United_States",
          "state": "Illinois",
          "city": "Rockford",
          "postal_code": "61105",
          "street": {
            "street_name": "41 Forest Run Circle",
            "street_number": "539"
          }
        }
      ]
    };
    const expected = {
      "ID": 1,
      "IS-UNDER-AGE": false,
      "FIRST-NAME": "Timothee",
      "LAST-NAME": "Clausner",
      "EMAIL": "tclausner0@economist.com",
      "TELEPHONE-NUMBERS": [
        "(9999) 99999-9999",
        "(8888) 88888-8888"
      ],
      "ADDRESSES": [
        {
          "COUNTRY": "United_States",
          "STATE": "Illinois",
          "CITY": "Rockford",
          "POSTAL-CODE": "61105",
          "STREET": {
            "STREET-NAME": "41 Forest Run Circle",
            "STREET-NUMBER": "539"
          }
        }
      ]
    };
    const result = caseparser.snakeToUpperDash(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('\t\tsnakeToUpperDash', '=>', isFailed ? 'FAILED' : 'PASSED');
    if (isFailed) {
      console.error('expected: ', expected);
      console.error('received: ', result);
    }
  }
};

const testSnakeCaseSuite = function () {
  console.log('\tString');
  snakeToCamel.string();
  snakeToDash.string();
  snakeToPascal.string();
  snakeToUpperSnake.string();
  snakeToUpperDash.string();
  console.log('\tJSON');
  snakeToCamel.json();
  snakeToDash.json();
  snakeToPascal.json();
  snakeToUpperSnake.json();
  snakeToUpperDash.json();
};

module.exports = { testSnakeCaseSuite };