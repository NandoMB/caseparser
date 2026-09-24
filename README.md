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
| TypeScript | 4.1+ (any `moduleResolution`: `node`, `node16`/`nodenext`, `bundler`). The `toX` type inference needs 4.5+ for keys longer than ~15 characters |
| Browsers | Any ES2015 browser (via bundler) |
| Edge | Cloudflare Workers |

Every change is tested in CI on Node.js 22, 24 and 26, Bun, Deno, Cloudflare Workers, and in Chromium, Firefox and WebKit.

Ready-to-run projects for each environment (Node.js ESM/CommonJS, TypeScript, TypeScript 4.1, Bun, Deno, the browser and Cloudflare Workers) are in [examples/](./examples).

## How to use

```ts
import { toSnake } from 'caseparser';      // ESM
// const { toSnake } = require('caseparser'); // CommonJS

toSnake('helloWorld'); // 'hello_world'

toSnake({ firstName: 'John', addresses: [{ postalCode: '61105' }] });
// { first_name: 'John', addresses: [{ postal_code: '61105' }] }
```

Objects are converted deeply, including objects inside arrays. The input is never mutated: a new object is returned.

There is one function per target case, and the input can be in any case (see [From any case](#from-any-case)). Converting `'helloWorld'`:

| Function | Result | Also known as |
| --- | --- | --- |
| `toCamel` | `helloWorld` | lowerCamelCase |
| `toPascal` | `HelloWorld` | UpperCamelCase |
| `toSnake` | `hello_world` | |
| `toKebab` | `hello-world` | dash-case, param-case |
| `toUpperSnake` | `HELLO_WORLD` | CONSTANT_CASE, SCREAMING_SNAKE_CASE |
| `toUpperKebab` | `HELLO-WORLD` | COBOL-CASE, SCREAMING-KEBAB-CASE |
| `toTrain` | `Hello-World` | Header-Case |
| `toDot` | `hello.World` | dot.notation |
| `toTitle` | `Hello World` | Capital Case |
| `toSentence` | `Hello world` | |
| `toPascalSnake` | `Hello_World` | Ada_Case, Title_Snake_Case |
| `toPath` | `hello/World` | |
| `toSpace` | `hello World` | |
| `toLower` | `hello world` | no case |
| `toUpper` | `HELLO WORLD` | |

`toSpace`, `toPath` and `toDot` keep the original case of each word (`toPath('UserProfile')` → `'User/Profile'`); all the others lowercase the words first. To change the case of a whole string, use `toLowerCase()` or `toUpperCase()` on the result:

```ts
toPath('helloWorld');               // 'hello/World'
toPath('helloWorld').toLowerCase(); // 'hello/world'
toPath('helloWorld').toUpperCase(); // 'HELLO/WORLD'
```

Don't chain `toX` functions for this (`toUpper(toPath(...))`): each one splits its input into words again, so `/` and `.` would be treated as separators or symbols.

### Typical use: API responses

```ts
import { toCamel, toSnake } from 'caseparser';

const res = await fetch('/api/users/1');
const user = toCamel(await res.json());   // { firstName, lastName, ... }

await fetch('/api/users/1', {
  method: 'PUT',
  body: JSON.stringify(toSnake(user)),          // back to { first_name, ... }
});
```

### Type inference

The resulting keys are inferred at the type level, so your editor autocompletes the converted names:

```ts
const user = toCamel({ first_name: 'John', addresses: [{ postal_code: '61105' }] });
//    ^? { firstName: string; addresses: { postalCode: string }[] }

user.firstName;  // ✅
user.first_name; // ❌ Property 'first_name' does not exist
```

### From any case

You don't need to know the input's case: the input is split into words whatever its case, so keys in different cases can even be mixed in the same object:

```ts
import { toCamel, toSnake } from 'caseparser';

toSnake('helloWorld');  // 'hello_world'
toSnake('Hello World'); // 'hello_world'
toSnake('HELLO-WORLD'); // 'hello_world'

toCamel({ user_id: 1, 'Last-Name': 'Doe', XMLHttpRequest: true });
//    ^? { userId: number; lastName: string; xmlHttpRequest: boolean }
```

Words are split on `_`, `-`, `.` and spaces, and before an uppercase letter that starts a new word.

### Symbols

Symbols (ASCII punctuation such as `$`, `@`, `#` or `%`) are removed by default. Pass a second argument to keep them: `true` keeps all of them, and an array keeps only the listed ones:

```ts
toCamel({ $ref: 1, '@type': 'user' });         // { ref: 1, type: 'user' }
toCamel({ $ref: 1, '@type': 'user' }, true);   // { $ref: 1, '@type': 'user' }
toCamel({ $ref: 1, '@type': 'user' }, ['$']);  // { $ref: 1, type: 'user' }

toCamel('$Hello-world', true); // '$helloWorld'
toPascal('$id', true);         // '$Id'
```

A symbol always starts a new word, so the words are the same whether symbols are kept or not. A kept symbol sticks to the start of the next word, or to the end of the previous one when no word follows:

```ts
toSnake('$$hello$World$$hi');       // 'hello_world_hi'
toSnake('$$hello$World$$hi', true); // '$$hello_$world_$$hi'
toSnake('user@name', true);         // 'user_@name'
toSnake('total%_count', true);      // 'total%_count'
```

The inferred types follow the same rules. `_`, `-` and `.` are separators, not symbols, so `_links` always becomes `links`.

## Conversion Types

> **Deprecated:** the `<from>To<To>` functions below are deprecated in favor of the `toX` functions ([How to use](#how-to-use)) and will be removed in the next major version. They keep working until then. See [Migrating to `toX`](#migrating-to-tox).

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

All 90 functions:

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

## Migrating to `toX`

Replace each `<from>To<To>` function with the `toX` function for its target case, whatever the source case: `camelToSnake`, `dashToSnake`, `titleToSnake`... all become `toSnake`. The dash cases were renamed: `<from>ToDash` becomes `toKebab`, and `<from>ToUpperDash` becomes `toUpperKebab`.

For well-formed keys (`firstName`, `first_name`) the result is the same. It differs when a key has consecutive uppercase letters or doesn't match the source case, and `toDot` keeps the original case of each word:

| Call | `<from>To<To>` result | `toX` result |
| --- | --- | --- |
| `camelToSnake('userID')` / `toSnake('userID')` | `'user_i_d'` | `'user_id'` |
| `camelToSnake('XMLHttpRequest')` / `toSnake('XMLHttpRequest')` | `'_x_m_l_http_request'` | `'xml_http_request'` |
| `camelToSnake('HelloWorld')` / `toSnake('HelloWorld')` | `'_hello_world'` | `'hello_world'` |
| `snakeToCamel('user_ID')` / `toCamel('user_ID')` | `'userID'` | `'userId'` |
| `camelToDot('helloWorld')` / `toDot('helloWorld')` | `'hello.world'` | `'hello.World'` |

If your code reads keys like `user_i_d` produced by the old functions, update those reads when migrating. The inferred types follow the new results, so TypeScript points out every place to change.

## Behavior and limitations

- **Only keys are converted, never values.** In `{ userName: 'johnDoe' }`, `userName` becomes `user_name` but `'johnDoe'` is kept. Strings inside arrays are kept too.
- **Only plain objects are traversed.** `Date`, `Map`, `Set` and class instances are returned as they are (same reference), without converting their contents.
- **Acronyms are kept together, but not restored:** `toSnake('userID')` → `'user_id'`, and back `toCamel('user_id')` → `'userId'`.
- **Words are lowercased** before converting (except by `toSpace`, `toPath` and `toDot`), so `toCamel('X-API-Key')` → `'xApiKey'` and `toCamel('First Name')` → `'firstName'`.
- **Title Case capitalizes every word**, including short ones: `toTitle('termsOfUse')` → `'Terms Of Use'`.
- **Digits stay attached to the previous word:** `toSnake('html5Parser')` → `'html5_parser'`, `toSnake('user1Name')` → `'user1_name'`.
- **Type inference has a key length limit.** TypeScript limits how deeply a type can recurse, and keys are converted character by character at the type level. With TypeScript 4.5+, the `toX` functions infer keys up to ~120 characters; with TypeScript 4.1 to 4.4, only up to ~15 characters. Longer keys fail to compile with `Type instantiation is excessively deep and possibly infinite`. The runtime conversion has no limit.

## Security

caseparser is safe to use with untrusted input (e.g. request bodies or `JSON.parse` output): keys such as `__proto__` are copied as regular keys and never change an object's prototype, and only the object's own properties are converted.

Releases are built and published from GitHub Actions without long-lived tokens (OIDC), with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced back to the exact commit and workflow that built it. On npm, new versions are [staged](https://docs.npmjs.com/staged-publishing/) and only go live after a maintainer approves them with 2FA.

Found a vulnerability? Please report it privately, see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © 2017 Fernando Machado Bernardino
