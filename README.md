# [CaseParser 2](https://github.com/NandoMB/caseparser)
Convert **Strings** and **JSON (Object Keys)** from a **case type** to another one with **type inference** based on parameter's type.


###### Note:
>  This is the **version 2.x.x** that supports **Typescript**. If you're looking for version 1.x.x, [click here](https://github.com/NandoMB/caseparser/tree/v1.x.x) to see the docs.


## Installation

###### Yarn
```sh
yarn add caseparser
```
###### NPM
```sh
npm add caseparser
```
###### PNPM
```sh
pnpm add caseparser
```

## How to use

###### Example 1
Passing **String** as parameter:
```ts
import caseparser from 'caseparser';

caseparser.camelToSnake('loremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry');
```
Will result:
```ts
'lorem_ipsum_is_simply_dummy_text_of_the_printing_and_typesetting_industry'
```
<br/>

###### Example 2
Passing **JSON** as parameter:
```js
import caseparser from 'caseparser';

const data = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    addresses: [
      {
        country: 'United States',
        state: 'Illinois',
        city: 'Rockford',
        postalCode: '61105',
        street: {
          streetName: '41 Forest Run Circle',
          streetNumber: '539'
        }
      }
    ]
  }
];
const result = caseparser.camelToSnake(data);
```
Will Result:
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "addresses": [
      {
        "country": "United States",
        "state": "Illinois",
        "city": "Rockford",
        "postal_code": "61105",
        "street": {
          "street_name": "41 Forest Run Circle",
          "street_number": "539"
        }
      }
    ]
  }
]
```

## Conversion Types

###### camelCase to ...
```js
caseparser.camelToDash(data);
caseparser.camelToPascal(data);
caseparser.camelToSnake(data);
caseparser.camelToUpperDash(data);
caseparser.camelToUpperSnake(data);
```
###### snakeCase to ...
```js
caseparser.snakeToCamel(data);
caseparser.snakeToDash(data);
caseparser.snakeToPascal(data);
caseparser.snakeToUpperDash(data);
caseparser.snakeToUpperSnake(data);
```
###### dashCase to ...
```js
caseparser.dashToCamel(data);
caseparser.dashToPascal(data);
caseparser.dashToSnake(data);
caseparser.dashToUpperDash(data);
caseparser.dashToUpperSnake(data);
```
###### pascalCase to ...
```js
caseparser.pascalToCamel(data);
caseparser.pascalToDash(data);
caseparser.pascalToSnake(data);
caseparser.pascalToUpperDash(data);
caseparser.pascalToUpperSnake(data);
```
###### upperSnakeCase to ...
```js
caseparser.upperSnakeToCamel(data);
caseparser.upperSnakeToDash(data);
caseparser.upperSnakeToPascal(data);
caseparser.upperSnakeToSnake(data);
caseparser.upperSnakeToUpperDash(data);
```
###### upperDashCase to ...
```js
caseparser.upperDashToCamel(data);
caseparser.upperDashToDash(data);
caseparser.upperDashToPascal(data);
caseparser.upperDashToSnake(data);
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
