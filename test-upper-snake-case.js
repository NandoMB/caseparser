'use strict';

const caseparser = require('./lib/caseparser');

const upperSnakeToCamel = {
  string: function () {
    const data = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const expected = 'firstNameIsBeforeLastName';
    const result = caseparser.upperSnakeToCamel(data);
    const isFailed = result !== expected;
    console.log('    upperSnakeToCamel', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  },
  json: function () {
    const data = {
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
    const result = caseparser.upperSnakeToCamel(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('    upperSnakeToCamel', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  }
};

const upperSnakeToSnake = {
  string: function () {
    const data = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const expected = 'first_name_is_before_last_name';
    const result = caseparser.upperSnakeToSnake(data);
    const isFailed = result !== expected;
    console.log('    upperSnakeToSnake', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  },
  json: function () {
    const data = {
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
    const expected = {
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
    const result = caseparser.upperSnakeToSnake(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('    upperSnakeToSnake', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  }
};

const upperSnakeToDash = {
  string: function () {
    const data = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const expected = 'first-name-is-before-last-name';
    const result = caseparser.upperSnakeToDash(data);
    const isFailed = result !== expected;
    console.log('    upperSnakeToDash', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  },
  json: function () {
    const data = {
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
    const result = caseparser.upperSnakeToDash(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('    upperSnakeToDash', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  }
};

const upperSnakeToPascal = {
  string: function () {
    const data = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const expected = 'FirstNameIsBeforeLastName';
    const result = caseparser.upperSnakeToPascal(data);
    const isFailed = result !== expected;
    console.log('    upperSnakeToPascal', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  },
  json: function () {
    const data = {
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
    const result = caseparser.upperSnakeToPascal(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('    upperSnakeToPascal', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  }
};

const upperSnakeToUpperDash = {
  string: function () {
    const data = 'FIRST_NAME_IS_BEFORE_LAST_NAME';
    const expected = 'FIRST-NAME-IS-BEFORE-LAST-NAME';
    const result = caseparser.upperSnakeToUpperDash(data);
    const isFailed = result !== expected;
    console.log('    upperSnakeToUpperDash', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  },
  json: function () {
    const data = {
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
    const result = caseparser.upperSnakeToUpperDash(data);
    const isFailed = JSON.stringify(result) !== JSON.stringify(expected);
    console.log('    upperSnakeToUpperDash', isFailed ? '✗' : '✓');
    if (isFailed) {
       console.error('      expected: ', JSON.stringify(expected, null, 2));
      console.error('      received: ', JSON.stringify(result, null, 2));
    }
  }
};

const testUpperSnakeCaseSuite = function () {
  console.log('  String:');
  upperSnakeToCamel.string();
  upperSnakeToSnake.string();
  upperSnakeToDash.string();
  upperSnakeToPascal.string();
  upperSnakeToUpperDash.string();
  console.log('  JSON:');
  upperSnakeToCamel.json();
  upperSnakeToSnake.json();
  upperSnakeToDash.json();
  upperSnakeToPascal.json();
  upperSnakeToUpperDash.json();
};

module.exports = { testUpperSnakeCaseSuite };