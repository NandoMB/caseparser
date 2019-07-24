# [CaseParser](https://github.com/NandoMB/caseparser)

Convert **Strings**/**Arrays**/**Objects** from a type of case to another one.



# Suported case types:

**camelCase** :white_check_mark:

**snake_case** :white_check_mark:

**dash-case** :white_check_mark:

**PascalCase** :white_check_mark:

**UPPER_SNAKE_CASE** :white_check_mark:

**UPPER-DASH-CASE** :white_check_mark:

# Installation
```sh
$ npm install caseparser --save
```

# How to use

##### Example 1
String:
```js
const caseparser = require('caseparser');
const result = caseparser.camelToSnake('firstNameIsBeforeLastName');
```
Result:
```json
'first_name_is_before_last_name'
```

##### Example 2
JSON:
```js
const caseparser = require('caseparser');

const data = [
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
      }
    ]
  }
];
const result = caseparser.camelToSnake(data);
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

# Methods:
#### Converts from camelCase to ...
```js
caseparser.camelToSnake(data);
caseparser.camelToDash(data);
caseparser.camelToPascal(data);
caseparser.camelToUpperSnake(data);
caseparser.camelToUpperDash(data);
```
#### Converts from snakeCase to ...
```js
caseparser.snakeToCamel(data);
caseparser.snakeToDash(data);
caseparser.snakeToPascal(data);
caseparser.snakeToUpperSnake(data);
caseparser.snakeToUpperDash(data);
```
#### Converts from dashCase to ...
```js
caseparser.dashToCamel(data);
caseparser.dashToSnake(data);
caseparser.dashToPascal(data);
caseparser.dashToUpperSnake(data);
caseparser.dashToUpperDash(data);
```
#### Converts from pascalCase to ...
```js
caseparser.pascalToCamel(data);
caseparser.pascalToSnake(data);
caseparser.pascalToDash(data);
caseparser.pascalToUpperSnake(data);
caseparser.pascalToUpperDash(data);
```
#### Converts from upperSnakeCase to ...
```js
caseparser.upperSnakeToCamel(data);
caseparser.upperSnakeToSnake(data);
caseparser.upperSnakeToDash(data);
caseparser.upperSnakeToPascal(data);
caseparser.upperSnakeToUpperDash(data);
```
#### Converts from upperDashCase to ...
```js
caseparser.upperDashToCamel(data);
caseparser.upperDashToSnake(data);
caseparser.upperDashToDash(data);
caseparser.upperDashToPascal(data);
caseparser.upperDashToUpperSnake(data);
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
