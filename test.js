'use strict';

var caseparser = require('./lib/caseparser');

var snakeClients = [
  {
    id: 1,
    is_under_age: false,
    first_name: 'Timothee',
    last_name: 'Clausner',
    email: 'tclausner0@economist.com',
    telephone_numbers: [
      '(9999) 99999-9999',
      '(8888) 88888-8888'
    ],
    addresses: [
      {
        country: 'United States',
        state: 'Illinois',
        city: 'Rockford',
        postal_code: '61105',
        street: {
          street_name: '41 Forest Run Circle',
          street_number: '539'
        }
      },
      {
        country: 'United States',
        state: 'California',
        city: 'Inglewood',
        postal_code: '90305',
        street: {
          street_name: '456 Brown Center',
          street_number: '550'
        }
      }
    ]
  }
];

console.log('======================================================');
console.log('     Convert from \'snake_case\' to \'camelCase\'     ');
console.log('------------------------------------------------------');
console.log(JSON.stringify(caseparser.snakeToCamel(snakeClients), null, 2));
console.log('------------------------------------------------------');

var camelClients = [
  {
    id: 1,
    isUnderAge: false,
    firstName: 'Timothee',
    lastName: 'Clausner',
    email: 'tclausner0@economist.com',
    telephoneNumbers: [
      '(9999) 99999-9999',
      '(8888) 88888-8888'
    ],
    addresses: [
      {
        country: 'United_States',
        state: 'Illinois',
        city: 'Rockford',
        postalCode: '61105',
        street: {
          streetName: '41 Forest Run Circle',
          streetNumber: '539'
        }
      },
      {
        country: 'United States',
        state: 'California',
        city: 'Inglewood',
        postalCode: '90305',
        street: {
          streetName: '456 Brown Center',
          streetNumber: '550'
        }
      }
    ]
  }
];

console.log('======================================================');
console.log('     Convert from \'camelCase\' to \'snake_case\'     ');
console.log('------------------------------------------------------');
console.log(JSON.stringify(caseparser.camelToSnake(camelClients), null, 2));
console.log('------------------------------------------------------');