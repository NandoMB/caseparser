# [CaseParser](https://github.com/NandoMB/caseparser)

Convert **Strings**/**Arrays**/**Objects** from '**snake_case**' to '**camelCase**' and vice-versa.

## Getting Started

#### Installation

```sh
$ npm install caseparser --save
```

#### How to use

##### caseparser.snakeToCamel(data)
The variable data represents a string, an array or an object.

```js
var caseparser = require('caseparser');

var data = [
  {
    id: 1,
    first_name: "Timothee",
    last_name: "Clausner",
    email: "tclausner0@economist.com",
    addresses: [
      {
        country: "United States",
        state: "Illinois",
        city: "Rockford",
        postal_code: "61105",
        street: {
          street_name: "41 Forest Run Circle",
          street_number: "539"
        }
      },
      {
        country: "United States",
        state: "California",
        city: "Inglewood",
        postal_code: "90305",
        street: {
          street_name: "456 Brown Center",
          street_number: "550"
        }
      }
    ]
  }
];

var result = caseparser.snakeToCamel(data);
console.log(JSON.stringify(result, null, 2));
```

Result:

```json
[
  {
    "id": 1,
    "firstName": "Timothee",
    "lastName": "Clausner",
    "email": "tclausner0@economist.com",
    "addresses": [
      {
        "country": "United States",
        "state": "Illinois",
        "city": "Rockford",
        "postalCode": "61105",
        "street": {
          "streetName": "41 Forest Run Circle",
          "streetNumber": "539"
        }
      },
      {
        "country": "United States",
        "state": "California",
        "city": "Inglewood",
        "postalCode": "90305",
        "street": {
          "streetName": "456 Brown Center",
          "streetNumber": "550"
        }
      }
    ]
  }
]
```

##### caseparser.camelToSnake(data)
The variable data represents a string, an array or an object.

```js
var caseparser = require('caseparser');

var data = [
  {
    id: 1,
    firstName: "Timothee",
    lastName: "Clausner",
    email: "tclausner0@economist.com",
    addresses: [
      {
        country: "United_States",
        state: "Illinois",
        city: "Rockford",
        postalCode: "61105",
        street: {
          streetName: "41 Forest Run Circle",
          streetNumber: "539"
        }
      },
      {
        country: "United States",
        state: "California",
        city: "Inglewood",
        postalCode: "90305",
        street: {
          streetName: "456 Brown Center",
          streetNumber: "550"
        }
      }
    ]
  }
];

var result = caseparser.camelToSnake(data);
console.log(JSON.stringify(result, null, 2));
```

Result:

```json
[
  {
    "id": 1,
    "first_name": "Timothee",
    "last_name": "Clausner",
    "email": "tclausner0@economist.com",
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
      },
      {
        "country": "United States",
        "state": "California",
        "city": "Inglewood",
        "postal_code": "90305",
        "street": {
          "street_name": "456 Brown Center",
          "street_number": "550"
        }
      }
    ]
  }
]
```

## License
The MIT License (MIT)

Copyright (c) 2017 Fernando Machado Bernardino
[NandoMB](https://github.com/NandoMB). https://github.com/NandoMB/caseparser

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
