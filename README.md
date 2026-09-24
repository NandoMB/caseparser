# [CaseParser](https://github.com/NandoMB/caseparser)

[![npm version](https://img.shields.io/npm/v/caseparser.svg)](https://www.npmjs.com/package/caseparser)
[![JSR](https://jsr.io/badges/@nandomb/caseparser)](https://jsr.io/@nandomb/caseparser)
[![JSR Score](https://jsr.io/badges/@nandomb/caseparser/score)](https://jsr.io/@nandomb/caseparser)
[![CI](https://github.com/NandoMB/caseparser/actions/workflows/main.yml/badge.svg)](https://github.com/NandoMB/caseparser/actions/workflows/main.yml)
[![npm downloads](https://img.shields.io/npm/dm/caseparser.svg)](https://www.npmjs.com/package/caseparser)
[![license](https://img.shields.io/npm/l/caseparser.svg)](./LICENSE)

Convert **Strings** and **JSON (Object Keys)** from a **case type** to another one with **type inference** based on parameter's type.

- Zero dependencies
- Written in TypeScript, published as ESM and CommonJS with type declarations
- Available on [npm](https://www.npmjs.com/package/caseparser) and [JSR](https://jsr.io/@nandomb/caseparser)
- Tree-shakeable


###### Note:
>  If you're looking for version 1.x.x, [click here](https://github.com/NandoMB/caseparser/tree/v1.x.x) to see the docs.


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
###### Deno (JSR)
```sh
deno add jsr:@nandomb/caseparser
```
```ts
import { camelToSnake } from '@nandomb/caseparser';
```
###### Bun / Node.js from JSR
```sh
bunx jsr add @nandomb/caseparser
npx jsr add @nandomb/caseparser
```

## Compatibility

| Environment | Supported |
| --- | --- |
| ESM (`import`) | Node.js 12.22+, Deno, Bun, bundlers |
| CommonJS (`require`) | Node.js 8+, Bun |
| TypeScript | 4.1+ (any `moduleResolution`: `node`, `node16`/`nodenext`, `bundler`) |
| Browsers | Any ES2015 browser (via bundler) |

Every change is tested in CI on Node.js 22, 24 and 26, Bun, Deno, and in Chromium, Firefox and WebKit.

Ready-to-run projects for each environment (Node.js ESM/CommonJS, TypeScript, TypeScript 4.1, Bun, Deno and the browser) are in [examples/](./examples).

```js
// CommonJS
const { camelToSnake } = require('caseparser');
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

## Security

caseparser is safe to use with untrusted input (e.g. request bodies or `JSON.parse` output): keys such as `__proto__` are copied as regular keys and never change an object's prototype, and only the object's own properties are converted.

Releases are built and published from GitHub Actions without long-lived tokens (OIDC), with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced back to the exact commit and workflow that built it. On npm, new versions are [staged](https://docs.npmjs.com/staged-publishing/) and only go live after a maintainer approves them with 2FA.

Found a vulnerability? Please report it privately, see [SECURITY.md](./SECURITY.md).

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
