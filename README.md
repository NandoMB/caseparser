# [CaseParser](https://github.com/NandoMB/caseparser)

[![npm version](https://img.shields.io/npm/v/caseparser.svg)](https://www.npmjs.com/package/caseparser)
[![JSR](https://jsr.io/badges/@nandomb/caseparser)](https://jsr.io/@nandomb/caseparser)
[![JSR Score](https://jsr.io/badges/@nandomb/caseparser/score)](https://jsr.io/@nandomb/caseparser)
[![CI](https://github.com/NandoMB/caseparser/actions/workflows/main.yml/badge.svg)](https://github.com/NandoMB/caseparser/actions/workflows/main.yml)
[![npm downloads](https://img.shields.io/npm/dm/caseparser.svg)](https://www.npmjs.com/package/caseparser)
[![license](https://img.shields.io/npm/l/caseparser.svg)](./LICENSE)

Convert **strings** and **object keys** to any case, **whatever case they are in now**, with the resulting keys inferred by TypeScript.

- **Any case in:** no need to know or normalize the input first. Keys in different cases can even be mixed in the same object
- **Deep:** nested objects and objects inside arrays are converted too
- **Typed:** your editor autocompletes the converted keys
- Zero dependencies, tree-shakeable, ESM and CommonJS, on [npm](https://www.npmjs.com/package/caseparser) and [JSR](https://jsr.io/@nandomb/caseparser)

###### Note:
>  If you're looking for version 1.x.x, [click here](https://github.com/NandoMB/caseparser/tree/v1.x.x) to see the docs.

## Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Cases](#cases)
- [Options](#options): [`allowSymbols`](#allowsymbols), [`transform`](#transform), [`separator`](#separator)
- [Type inference](#type-inference)
- [How keys are split into words](#how-keys-are-split-into-words)
- [Behavior and limitations](#behavior-and-limitations)
- [Compatibility](#compatibility)
- [Deprecated `<from>To<To>` functions](#deprecated-fromtoto-functions)
- [Security](#security)

## Installation

```sh
npm add caseparser    # or: pnpm add caseparser / yarn add caseparser
```
###### Deno (JSR)
```sh
deno add jsr:@nandomb/caseparser
```
```ts
import { toSnake } from '@nandomb/caseparser';
```
###### Bun / Node.js from JSR
```sh
bunx jsr add @nandomb/caseparser
npx jsr add @nandomb/caseparser
```

## Quick start

The input doesn't need a specific or consistent shape. Every key below is in a different case, and one call converts all of them, deeply:

```ts
import { toCamel } from 'caseparser';        // ESM
// const { toCamel } = require('caseparser'); // CommonJS

const response = {
  userId: 42,                               // camelCase
  FirstName: 'Ada',                         // PascalCase
  last_name: 'Lovelace',                    // snake_case
  'birth-date': '1815-12-10',               // kebab-case
  ACCOUNT_STATUS: 'active',                 // UPPER_SNAKE_CASE
  'Content-Type': 'application/json',       // Train-Case
  'Display Name': 'Countess',               // Title Case
  XMLHttpRequest: false,                    // acronym + word
  $ref: '#/users/42',                       // symbol
  'billing address': {                      // nested objects...
    'Postal Code': '61105',
    countryISO: 'US'
  },
  'recent.orders': [{ order_id: 1, TotalAmount: 99.9 }], // ...and objects inside arrays
  tags: ['someTag', 'another_tag']          // values are never converted
};

toCamel(response);
// {
//   userId: 42,
//   firstName: 'Ada',
//   lastName: 'Lovelace',
//   birthDate: '1815-12-10',
//   accountStatus: 'active',
//   contentType: 'application/json',
//   displayName: 'Countess',
//   xmlHttpRequest: false,
//   ref: '#/users/42',
//   billingAddress: { postalCode: '61105', countryIso: 'US' },
//   recentOrders: [{ orderId: 1, totalAmount: 99.9 }],
//   tags: ['someTag', 'another_tag']
// }
```

Strings work the same way: `toSnake('helloWorld')`, `toSnake('Hello World')` and `toSnake('HELLO-WORLD')` all return `'hello_world'`.

The input is never mutated: a new object is returned. A typical use is converting API payloads on the way in and out:

```ts
import { toCamel, toSnake } from 'caseparser';

const res = await fetch('/api/users/1');
const user = toCamel(await res.json());   // { firstName, lastName, ... }

await fetch('/api/users/1', {
  method: 'PUT',
  body: JSON.stringify(toSnake(user)),    // back to { first_name, ... }
});
```

## Cases

There is one function per target case, and each one accepts input in any case:

| Function | `'helloWorld'` → | `'LAST_login_AT'` → | Also known as |
| --- | --- | --- | --- |
| `toCamel` | `helloWorld` | `lastLoginAt` | lowerCamelCase |
| `toPascal` | `HelloWorld` | `LastLoginAt` | UpperCamelCase |
| `toSnake` | `hello_world` | `last_login_at` | |
| `toKebab` | `hello-world` | `last-login-at` | dash-case, param-case |
| `toUpperSnake` | `HELLO_WORLD` | `LAST_LOGIN_AT` | CONSTANT_CASE, SCREAMING_SNAKE_CASE |
| `toUpperKebab` | `HELLO-WORLD` | `LAST-LOGIN-AT` | COBOL-CASE, SCREAMING-KEBAB-CASE |
| `toTrain` | `Hello-World` | `Last-Login-At` | Header-Case |
| `toTitle` | `Hello World` | `Last Login At` | Capital Case |
| `toSentence` | `Hello world` | `Last login at` | |
| `toPascalSnake` | `Hello_World` | `Last_Login_At` | Ada_Case, Title_Snake_Case |
| `toLower` | `hello world` | `last login at` | no case |
| `toUpper` | `HELLO WORLD` | `LAST LOGIN AT` | |
| `toDot` | `hello.World` | `LAST.login.AT` | dot.notation |
| `toPath` | `hello/World` | `LAST/login/AT` | |
| `toSpace` | `hello World` | `LAST login AT` | |

`toDot`, `toPath` and `toSpace` only change the separator: they keep the original case of each word (upper, lower or mixed). To change it, see [`transform`](#transform).

## Options

Every function takes an optional second argument.

### `allowSymbols`

Symbols (ASCII punctuation such as `$`, `@`, `#` or `%`) are removed by default. `allowSymbols: true` keeps all of them, and an array keeps only the listed ones. It can be passed inside the options object, or directly as the second argument:

```ts
const data = { $ref: 1, '@type': 'User', 'discount%': 10 };

toCamel(data);                          // { ref: 1, type: 'User', discount: 10 }
toCamel(data, { allowSymbols: true });  // { $ref: 1, '@type': 'User', 'discount%': 10 }
toCamel(data, { allowSymbols: ['$'] }); // { $ref: 1, type: 'User', discount: 10 }

// shorthand
toCamel(data, true);  // same as { allowSymbols: true }
toCamel(data, ['$']); // same as { allowSymbols: ['$'] }
```

A kept symbol sticks to the start of the next word: `toPascal('$id', true)` → `'$Id'`. See [How keys are split into words](#how-keys-are-split-into-words) for the details.

### `transform`

Only for `toDot` and `toPath`, which keep the original case of each word by default. `'lowercase'` or `'uppercase'` changes the case of the whole result, object keys included:

```ts
toDot('LAST_login_AT');                             // 'LAST.login.AT'
toDot('LAST_login_AT', { transform: 'lowercase' }); // 'last.login.at'
toPath('LAST_login_AT', { transform: 'uppercase' }); // 'LAST/LOGIN/AT'

toDot({ user_ID: 1, LAST_name: 'Doe' }, { transform: 'lowercase' });
// { 'user.id': 1, 'last.name': 'Doe' }

toDot('$UserId', { allowSymbols: true, transform: 'lowercase' }); // '$user.id'
```

`toSpace` has no `transform`: use `toLower` or `toUpper` instead. Don't chain functions for this (`toUpper(toPath(...))`): each one splits its input into words again, so `/` and `.` would be treated as separators or symbols.

### `separator`

Only for `toPath`. It joins the words with `'/'` by default, or with `'\\'`:

```ts
toPath('users/profilePicture');                     // 'users/profile/Picture'
toPath('users/profilePicture', { separator: '\\' }); // 'users\\profile\\Picture'
toPath('users\\profilePicture', { separator: '/' });  // 'users/profile/Picture'
```

In `toPath`, `/` and `\` in the input also separate words, so paths can be converted from one separator to the other. In the other functions they are symbols.

## Type inference

The converted keys are inferred at the type level, so your editor autocompletes them and catches typos:

```ts
const user = toCamel({ first_name: 'John', 'Home Addresses': [{ POSTAL_CODE: '61105' }] });
//    ^? { firstName: string; homeAddresses: { postalCode: string }[] }

user.firstName;  // ✅
user.first_name; // ❌ Property 'first_name' does not exist
```

The options are part of the inference: `toCamel({ $ref: 1 }, ['$'])` is typed `{ $ref: number }`, and `toDot({ UserId: 1 }, { transform: 'lowercase' })` is typed `{ 'user.id': number }`. When the options are only known at runtime (e.g. a `boolean` variable), the keys are typed as `string`.

## How keys are split into words

Every function first splits the input into words, then joins them in the target case. A new word starts:

- **at a separator:** `_`, `-`, `.` or a space, which are removed. Repeated or leading separators are ignored: `toSnake('__private_flag')` → `'private_flag'`
- **at an uppercase letter after a lowercase letter or a digit:** `helloWorld` → `hello`, `world`
- **at the last letter of an acronym:** `XMLHttpRequest` → `xml`, `http`, `request`, and `userID` → `user`, `id`
- **at a symbol**, whether it's kept or not
- **at `/` or `\`, only in `toPath`** (in the other functions they are symbols)

Digits stay attached to the previous word: `toSnake('html5Parser')` → `'html5_parser'`.

A kept symbol sticks to the start of the next word, or to the end of the previous one when no word follows:

```ts
toSnake('$$hello$World$$hi');       // 'hello_world_hi'
toSnake('$$hello$World$$hi', true); // '$$hello_$world_$$hi'
toSnake('user@name', true);         // 'user_@name'
toSnake('total%_count', true);      // 'total%_count'
```

The inferred types follow the same rules.

## Behavior and limitations

- **Only keys are converted, never values.** In `{ userName: 'johnDoe' }`, `userName` becomes `user_name` but `'johnDoe'` is kept. Strings inside arrays are kept too.
- **Only plain objects are traversed.** `Date`, `Map`, `Set` and class instances are returned as they are (same reference), without converting their contents.
- **Acronyms are kept together, but not restored:** `toSnake('userID')` → `'user_id'`, and back `toCamel('user_id')` → `'userId'`.
- **Words are lowercased** before converting (except by `toDot`, `toPath` and `toSpace`), so `toCamel('X-API-Key')` → `'xApiKey'` and `toCamel('First Name')` → `'firstName'`.
- **Title Case capitalizes every word**, including short ones: `toTitle('termsOfUse')` → `'Terms Of Use'`.
- **Type inference has a key length limit.** TypeScript limits how deeply a type can recurse, and keys are converted character by character at the type level. Keys are inferred up to ~120 characters; longer keys fail to compile with `Type instantiation is excessively deep and possibly infinite`. The runtime conversion has no limit.

## Compatibility

| Environment | Supported |
| --- | --- |
| ESM (`import`) | Node.js 12.22+, Deno, Bun, bundlers |
| CommonJS (`require`) | Node.js 8+, Bun |
| TypeScript | 4.5+ for the `toX` functions, 4.1+ for the deprecated `<from>To<To>` functions (any `moduleResolution`: `node`, `node16`/`nodenext`, `bundler`) |
| Browsers | Any ES2015 browser (via bundler) |
| Edge | Cloudflare Workers |

On every change, CI runs the test suite on Node.js 22, 24 and 26, Bun and Deno, and in Chromium, Firefox and WebKit. It also checks the packed package with [publint](https://publint.dev) and [Are the Types Wrong?](https://arethetypeswrong.github.io), for ESM, CommonJS and every `moduleResolution`, and compiles the type declarations with TypeScript 4.1.

## Deprecated `<from>To<To>` functions

> **Deprecated:** the `<from>To<To>` functions (e.g. `snakeToCamel`) are deprecated in favor of the `toX` functions and will be removed in the next major version, which will also require TypeScript 4.7+. They keep working until then.

### Migrating to `toX`

Replace each `<from>To<To>` function with the `toX` function for its target case, whatever the source case: `camelToSnake`, `dashToSnake`, `titleToSnake`... all become `toSnake`. The dash cases were renamed: `<from>ToDash` becomes `toKebab`, and `<from>ToUpperDash` becomes `toUpperKebab`.

For well-formed keys (`firstName`, `first_name`) the result is the same. It differs when a key has consecutive uppercase letters or doesn't match the source case, and `toDot` keeps the original case of each word (pass `{ transform: 'lowercase' }` to get the old result):

| Call | `<from>To<To>` result | `toX` result |
| --- | --- | --- |
| `camelToSnake('userID')` / `toSnake('userID')` | `'user_i_d'` | `'user_id'` |
| `camelToSnake('XMLHttpRequest')` / `toSnake('XMLHttpRequest')` | `'_x_m_l_http_request'` | `'xml_http_request'` |
| `camelToSnake('HelloWorld')` / `toSnake('HelloWorld')` | `'_hello_world'` | `'hello_world'` |
| `snakeToCamel('user_ID')` / `toCamel('user_ID')` | `'userID'` | `'userId'` |
| `camelToDot('helloWorld')` / `toDot('helloWorld')` | `'hello.world'` | `'hello.World'` |

If your code reads keys like `user_i_d` produced by the old functions, update those reads when migrating. The inferred types follow the new results, so TypeScript points out every place to change.

<details>
<summary>All 90 deprecated functions</summary>

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
| `title` | `Hello World` |
| `sentence` | `Hello world` |

- **camelCase:** `camelToPascal`, `camelToSnake`, `camelToDash`, `camelToUpperSnake`, `camelToUpperDash`, `camelToTrain`, `camelToDot`, `camelToTitle`, `camelToSentence`
- **PascalCase:** `pascalToCamel`, `pascalToSnake`, `pascalToDash`, `pascalToUpperSnake`, `pascalToUpperDash`, `pascalToTrain`, `pascalToDot`, `pascalToTitle`, `pascalToSentence`
- **snake_case:** `snakeToCamel`, `snakeToPascal`, `snakeToDash`, `snakeToUpperSnake`, `snakeToUpperDash`, `snakeToTrain`, `snakeToDot`, `snakeToTitle`, `snakeToSentence`
- **dash-case:** `dashToCamel`, `dashToPascal`, `dashToSnake`, `dashToUpperSnake`, `dashToUpperDash`, `dashToTrain`, `dashToDot`, `dashToTitle`, `dashToSentence`
- **UPPER_SNAKE_CASE:** `upperSnakeToCamel`, `upperSnakeToPascal`, `upperSnakeToSnake`, `upperSnakeToDash`, `upperSnakeToUpperDash`, `upperSnakeToTrain`, `upperSnakeToDot`, `upperSnakeToTitle`, `upperSnakeToSentence`
- **UPPER-DASH-CASE:** `upperDashToCamel`, `upperDashToPascal`, `upperDashToSnake`, `upperDashToDash`, `upperDashToUpperSnake`, `upperDashToTrain`, `upperDashToDot`, `upperDashToTitle`, `upperDashToSentence`
- **Train-Case:** `trainToCamel`, `trainToPascal`, `trainToSnake`, `trainToDash`, `trainToUpperSnake`, `trainToUpperDash`, `trainToDot`, `trainToTitle`, `trainToSentence`
- **dot.case:** `dotToCamel`, `dotToPascal`, `dotToSnake`, `dotToDash`, `dotToUpperSnake`, `dotToUpperDash`, `dotToTrain`, `dotToTitle`, `dotToSentence`
- **Title Case:** `titleToCamel`, `titleToPascal`, `titleToSnake`, `titleToDash`, `titleToUpperSnake`, `titleToUpperDash`, `titleToTrain`, `titleToDot`, `titleToSentence`
- **Sentence case:** `sentenceToCamel`, `sentenceToPascal`, `sentenceToSnake`, `sentenceToDash`, `sentenceToUpperSnake`, `sentenceToUpperDash`, `sentenceToTrain`, `sentenceToDot`, `sentenceToTitle`

</details>

## Security

caseparser is safe to use with untrusted input (e.g. request bodies or `JSON.parse` output): keys such as `__proto__` are copied as regular keys and never change an object's prototype, and only the object's own properties are converted.

Releases are built and published from GitHub Actions without long-lived tokens (OIDC), with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced back to the exact commit and workflow that built it. On npm, new versions are [staged](https://docs.npmjs.com/staged-publishing/) and only go live after a maintainer approves them with 2FA.

Found a vulnerability? Please report it privately, see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © 2017 Fernando Machado Bernardino
