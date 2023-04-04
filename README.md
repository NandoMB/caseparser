# [CaseParser](https://github.com/NandoMB/caseparser) Version 2.x.x
Convert **Strings** and **JSON (Object Keys)** from a ```case type``` to another one.


###### Note:
>  This is the version 2.x.x that supports Typescript. If you're looking for 1.x.x version, [here](https://github.com/NandoMB/caseparser/tree/v1.x.x) is the docs.


## Installation

```sh
$ yarn add caseparser

# or

$ npm add caseparser

# or

$ pnpm add caseparser
```

## Supported conversion types

##### Converts from camelCase to ...
```js
caseparser.camelToDash(data);
caseparser.camelToPascal(data);
caseparser.camelToSnake(data);
caseparser.camelToUpperDash(data);
caseparser.camelToUpperSnake(data);
```
##### Converts from snakeCase to ...
```js
caseparser.snakeToCamel(data);
caseparser.snakeToDash(data);
caseparser.snakeToPascal(data);
caseparser.snakeToUpperDash(data);
caseparser.snakeToUpperSnake(data);
```
##### Converts from dashCase to ...
```js
caseparser.dashToCamel(data);
caseparser.dashToPascal(data);
caseparser.dashToSnake(data);
caseparser.dashToUpperDash(data);
caseparser.dashToUpperSnake(data);
```
##### Converts from pascalCase to ...
```js
caseparser.pascalToCamel(data);
caseparser.pascalToDash(data);
caseparser.pascalToSnake(data);
caseparser.pascalToUpperDash(data);
caseparser.pascalToUpperSnake(data);
```
##### Converts from upperSnakeCase to ...
```js
caseparser.upperSnakeToCamel(data);
caseparser.upperSnakeToDash(data);
caseparser.upperSnakeToPascal(data);
caseparser.upperSnakeToSnake(data);
caseparser.upperSnakeToUpperDash(data);
```
##### Converts from upperDashCase to ...
```js
caseparser.upperDashToCamel(data);
caseparser.upperDashToDash(data);
caseparser.upperDashToPascal(data);
caseparser.upperDashToSnake(data);
caseparser.upperDashToUpperSnake(data);
```



## How to use


##### Example 1
Passing **String** as parameter:
```ts
import caseparser from 'caseparser';

caseparser.camelToSnake('loremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry');
```
Will result:
```json
'lorem_ipsum_is_simply_dummy_text_of_the_printing_and_typesetting_industry'
```
---
#### Example 2
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
Result:
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
