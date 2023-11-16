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
import { camelToSnake } from 'caseparser';

camelToSnake('loremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry');
```
Will result:
```ts
'lorem_ipsum_is_simply_dummy_text_of_the_printing_and_typesetting_industry'
```
<br/>

###### Example 2
Passing **JSON** as parameter:
```js
import { camelToSnake } from 'caseparser';

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
const result = camelToSnake(data);
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
camelToDash(data);
camelToPascal(data);
camelToSnake(data);
camelToUpperDash(data);
camelToUpperSnake(data);
```
###### snakeCase to ...
```js
snakeToCamel(data);
snakeToDash(data);
snakeToPascal(data);
snakeToUpperDash(data);
snakeToUpperSnake(data);
```
###### dashCase to ...
```js
dashToCamel(data);
dashToPascal(data);
dashToSnake(data);
dashToUpperDash(data);
dashToUpperSnake(data);
```
###### pascalCase to ...
```js
pascalToCamel(data);
pascalToDash(data);
pascalToSnake(data);
pascalToUpperDash(data);
pascalToUpperSnake(data);
```
###### upperSnakeCase to ...
```js
upperSnakeToCamel(data);
upperSnakeToDash(data);
upperSnakeToPascal(data);
upperSnakeToSnake(data);
upperSnakeToUpperDash(data);
```
###### upperDashCase to ...
```js
upperDashToCamel(data);
upperDashToDash(data);
upperDashToPascal(data);
upperDashToSnake(data);
upperDashToUpperSnake(data);
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
