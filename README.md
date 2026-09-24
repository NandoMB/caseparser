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

```sh
npm add caseparser    # or: pnpm add caseparser / yarn add caseparser
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
| Edge | Cloudflare Workers |

Every change is tested in CI on Node.js 22, 24 and 26, Bun, Deno, Cloudflare Workers, and in Chromium, Firefox and WebKit.

Ready-to-run projects for each environment (Node.js ESM/CommonJS, TypeScript, TypeScript 4.1, Bun, Deno, the browser and Cloudflare Workers) are in [examples/](./examples).

## How to use

```ts
import { camelToSnake } from 'caseparser';      // ESM
// const { camelToSnake } = require('caseparser'); // CommonJS

camelToSnake('helloWorld'); // 'hello_world'

camelToSnake({ firstName: 'John', addresses: [{ postalCode: '61105' }] });
// { first_name: 'John', addresses: [{ postal_code: '61105' }] }
```

Objects are converted deeply, including objects inside arrays. The input is never mutated: a new object is returned.

### Typical use: API responses

```ts
import { snakeToCamel, camelToSnake } from 'caseparser';

const res = await fetch('/api/users/1');
const user = snakeToCamel(await res.json());   // { firstName, lastName, ... }

await fetch('/api/users/1', {
  method: 'PUT',
  body: JSON.stringify(camelToSnake(user)),     // back to { first_name, ... }
});
```

### Type inference

The resulting keys are inferred at the type level, so your editor autocompletes the converted names:

```ts
const user = snakeToCamel({ first_name: 'John', addresses: [{ postal_code: '61105' }] });
//    ^? { firstName: string; addresses: { postalCode: string }[] }

user.firstName;  // ✅
user.first_name; // ❌ Property 'first_name' does not exist
```

## Conversion Types

Every function is named `<from>To<To>`, e.g. `snakeToCamel`. The case names are:

| Name | Example |
| --- | --- |
| `camel` | `helloWorld` |
| `pascal` | `HelloWorld` |
| `snake` | `hello_world` |
| `dash` | `hello-world` |
| `upperSnake` | `HELLO_WORLD` |
| `upperDash` | `HELLO-WORLD` |
| `train` | `Hello-World` |
| `dot` | `hello.world` |

All 56 functions:

- **camelCase:** `camelToPascal`, `camelToSnake`, `camelToDash`, `camelToUpperSnake`, `camelToUpperDash`, `camelToTrain`, `camelToDot`
- **PascalCase:** `pascalToCamel`, `pascalToSnake`, `pascalToDash`, `pascalToUpperSnake`, `pascalToUpperDash`, `pascalToTrain`, `pascalToDot`
- **snake_case:** `snakeToCamel`, `snakeToPascal`, `snakeToDash`, `snakeToUpperSnake`, `snakeToUpperDash`, `snakeToTrain`, `snakeToDot`
- **dash-case:** `dashToCamel`, `dashToPascal`, `dashToSnake`, `dashToUpperSnake`, `dashToUpperDash`, `dashToTrain`, `dashToDot`
- **UPPER_SNAKE_CASE:** `upperSnakeToCamel`, `upperSnakeToPascal`, `upperSnakeToSnake`, `upperSnakeToDash`, `upperSnakeToUpperDash`, `upperSnakeToTrain`, `upperSnakeToDot`
- **UPPER-DASH-CASE:** `upperDashToCamel`, `upperDashToPascal`, `upperDashToSnake`, `upperDashToDash`, `upperDashToUpperSnake`, `upperDashToTrain`, `upperDashToDot`
- **Train-Case:** `trainToCamel`, `trainToPascal`, `trainToSnake`, `trainToDash`, `trainToUpperSnake`, `trainToUpperDash`, `trainToDot`
- **dot.case:** `dotToCamel`, `dotToPascal`, `dotToSnake`, `dotToDash`, `dotToUpperSnake`, `dotToUpperDash`, `dotToTrain`

## Behavior and limitations

- **Only keys are converted, never values.** In `{ userName: 'johnDoe' }`, `userName` becomes `user_name` but `'johnDoe'` is kept. Strings inside arrays are kept too.
- **Only plain objects are traversed.** `Date`, `Map`, `Set` and class instances are returned as they are (same reference), without converting their contents.
- **Acronyms are split letter by letter**, because every uppercase letter starts a new word: `camelToSnake('userID')` → `'user_i_d'`. Prefer `userId` style keys.
- **Train-Case words are lowercased** before converting, so `trainToCamel('X-API-Key')` → `'xApiKey'`.
- **Numbers are not word boundaries:** `camelToSnake('html5Parser')` → `'html5_parser'`, `snakeToCamel('user_1_name')` → `'user1Name'`.

## Security

caseparser is safe to use with untrusted input (e.g. request bodies or `JSON.parse` output): keys such as `__proto__` are copied as regular keys and never change an object's prototype, and only the object's own properties are converted.

Releases are built and published from GitHub Actions without long-lived tokens (OIDC), with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced back to the exact commit and workflow that built it. On npm, new versions are [staged](https://docs.npmjs.com/staged-publishing/) and only go live after a maintainer approves them with 2FA.

Found a vulnerability? Please report it privately, see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © 2017 Fernando Machado Bernardino
