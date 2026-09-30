# [CaseParser](https://github.com/NandoMB/caseparser)

[![npm version](https://img.shields.io/npm/v/caseparser.svg)](https://www.npmjs.com/package/caseparser)
[![JSR](https://jsr.io/badges/@nandomb/caseparser)](https://jsr.io/@nandomb/caseparser)
[![JSR Score](https://jsr.io/badges/@nandomb/caseparser/score)](https://jsr.io/@nandomb/caseparser)
[![Socket Badge](https://badge.socket.dev/npm/package/caseparser)](https://socket.dev/npm/package/caseparser)
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
- [Options](#options): [`allowSymbols`](#allowsymbols), [`ignore`](#ignore), [`transform`](#transform), [`separator`](#separator)
- [Type inference](#type-inference)
- [How keys are split into words](#how-keys-are-split-into-words)
- [Behavior and limitations](#behavior-and-limitations)
- [Benchmarks](#benchmarks)
- [Compatibility](#compatibility)
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

### `ignore`

Object keys that are kept as they are, at any depth. Their values are still converted:

```ts
toCamel({ _id: 1, user_id: 2, extra_data: { inner_key: 3 } }, { ignore: ['_id', 'extra_data'] });
// { _id: 1, userId: 2, extra_data: { innerKey: 3 } }
```

Keys are matched exactly as they are in the input. The inferred type keeps the ignored keys too. It only applies to object keys: `toSnake('userId', { ignore: ['userId'] })` still returns `'user_id'`.

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
- **Only plain objects are traversed.** `Date`, `Map`, `Set`, class instances and objects without a prototype (`Object.create(null)`) are returned as they are (same reference), without converting their contents.
- **Acronyms are kept together, but not restored:** `toSnake('userID')` → `'user_id'`, and back `toCamel('user_id')` → `'userId'`.
- **Words are lowercased** before converting (except by `toDot`, `toPath` and `toSpace`), so `toCamel('X-API-Key')` → `'xApiKey'` and `toCamel('First Name')` → `'firstName'`.
- **Title Case capitalizes every word**, including short ones: `toTitle('termsOfUse')` → `'Terms Of Use'`.
- **Very deep or circular objects throw.** Objects are converted recursively, so an object nested thousands of levels deep (~5,000 with the default stack of Node.js), or one that contains itself, throws `RangeError: Maximum call stack size exceeded`. `JSON.parse` accepts that depth, so limit it if the input is untrusted and the error is not handled.
- **Type inference has a key length limit.** TypeScript limits how deeply a type can recurse, and keys are converted character by character at the type level. Keys are inferred up to ~120 characters; longer keys fail to compile with `Type instantiation is excessively deep and possibly infinite`. The runtime conversion has no limit.

### Design trade-offs

- **Nothing is kept between calls.** Within a call, each distinct key is converted once, so the 100 items of an API response cost about as much as one. That work is dropped when the call returns. A library that keeps converted keys between calls (camelcase-keys keeps up to 2 × 100,000) is faster when the same small object is converted over and over, but it holds that memory for the life of the process. With untrusted input (keys chosen by whoever sends the request), that cache can also fill up with keys that never come back and push out the useful ones. caseparser keeps no memory and no state between calls (see [memory](./bench/results/memory.md)).
- **The cache is only created for arrays.** The objects in an array usually share their keys, while the keys of a single object don't repeat, so small objects and objects with unique keys don't pay for it. Keys repeated in nested objects outside arrays are converted again.
- **A few hundred bytes more for the same two functions.** Bundling only `toCamel` and `toSnake` takes 1.5 KB gzipped (0.8 KB in 5.1.0), for the character tables and the key cache that make them faster. The whole package is smaller than before (1.8 KB gzipped, 3.1 KB in 5.1.0), because 6.0 removed the deprecated functions.
- **Correct before fast.** Every `toX` function splits words the same way (acronyms, digits, symbols, non-ASCII letters), even when a simpler rule would be faster for plain `snake_case` → `camelCase` keys.

## Benchmarks

Median time to convert the same data to each case on Node.js 24 (Apple M3 Pro); lower is faster. Each library was measured in 3 rounds, in a different order each time, and the time is the mean of the 3 medians. In **bold**: the fastest, and any library tied with it (its results in the 3 rounds overlap with the fastest's). ❌: the library doesn't convert keys to that case.

#### Repeated keys: an API response with 100 users (2,104 keys)

Every user has the same keys, like the items of a real API response.

| Case | caseparser | caseparser@5.1.0 | change-case | camelcase-keys | snakecase-keys | humps | es-toolkit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| camelCase | **57 µs** | 936 µs | 929 µs | 269 µs | ❌ | 536 µs | 391 µs |
| PascalCase | **58 µs** | 1.04 ms | 1.01 ms | 361 µs | ❌ | 629 µs | 496 µs |
| snake_case | **57 µs** | 870 µs | 1.06 ms | ❌ | 1.34 ms | 397 µs | 377 µs |
| kebab-case | **57 µs** | 884 µs | 1.07 ms | ❌ | 1.38 ms | 399 µs | 382 µs |
| UPPER_SNAKE | **58 µs** | 923 µs | 1.11 ms | ❌ | ❌ | ❌ | 448 µs |
| UPPER-KEBAB | **58 µs** | 936 µs | 1.13 ms | ❌ | ❌ | ❌ | ❌ |
| Train-Case | **58 µs** | 1.07 ms | 1.17 ms | ❌ | ❌ | ❌ | ❌ |
| Title Case | **58 µs** | 1.08 ms | 1.16 ms | ❌ | ❌ | ❌ | ❌ |
| Sentence case | **57 µs** | 972 µs | 1.14 ms | ❌ | ❌ | ❌ | ❌ |
| Pascal_Snake | **58 µs** | 1.07 ms | 1.15 ms | ❌ | ❌ | ❌ | ❌ |
| lower case | **57 µs** | 902 µs | 1.07 ms | ❌ | 1.39 ms | 402 µs | ❌ |
| UPPER CASE | **58 µs** | 936 µs | 1.13 ms | ❌ | ❌ | ❌ | ❌ |
| dot.case | **56 µs** | 879 µs | 1.07 ms | ❌ | 1.38 ms | 402 µs | ❌ |
| path/case | **57 µs** | 946 µs | 1.07 ms | ❌ | 1.38 ms | 401 µs | ❌ |

#### Unique keys: an object with 1,000 keys

No key repeats, in the object or between calls, so this measures how fast each key is converted.

| Case | caseparser | caseparser@5.1.0 | change-case | camelcase-keys | snakecase-keys | humps | es-toolkit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| camelCase | **276 µs** | 1.94 ms | 740 µs | 1.09 ms | ❌ | 526 µs | 417 µs |
| PascalCase | **346 µs** | 1.48 ms | 827 µs | 1.33 ms | ❌ | 596 µs | 502 µs |
| snake_case | **291 µs** | 1.90 ms | 813 µs | ❌ | 892 µs | **421 µs** | **385 µs** |
| kebab-case | **413 µs** | 1.34 ms | 906 µs | ❌ | 960 µs | **468 µs** | **422 µs** |
| UPPER_SNAKE | **392 µs** | 1.98 ms | 911 µs | ❌ | ❌ | ❌ | **453 µs** |
| UPPER-KEBAB | **482 µs** | 874 µs | 949 µs | ❌ | ❌ | ❌ | ❌ |
| Train-Case | **381 µs** | 2.08 ms | 936 µs | ❌ | ❌ | ❌ | ❌ |
| Title Case | **461 µs** | 937 µs | 979 µs | ❌ | ❌ | ❌ | ❌ |
| Sentence case | **362 µs** | 1.98 ms | 900 µs | ❌ | ❌ | ❌ | ❌ |
| Pascal_Snake | **444 µs** | 1.45 ms | 961 µs | ❌ | ❌ | ❌ | ❌ |
| lower case | **343 µs** | 1.67 ms | 877 µs | ❌ | 938 µs | **444 µs** | ❌ |
| UPPER CASE | **464 µs** | 853 µs | 951 µs | ❌ | ❌ | ❌ | ❌ |
| dot.case | **367 µs** | 1.94 ms | 871 µs | ❌ | 934 µs | **444 µs** | ❌ |
| path/case | **449 µs** | 855 µs | 917 µs | ❌ | 974 µs | 521 µs | ❌ |

With repeated keys, caseparser is 5–25x faster than the others, because it converts each distinct key once per call. With unique keys every library converts every key, and caseparser is the fastest or tied: this scenario creates a lot of garbage, so the results change up to ~20% between rounds for every library. For a small object (8 keys) converted over and over, camelcase-keys is faster to camelCase (0.71 µs, against 0.96 µs), because it keeps converted keys between calls (see [Design trade-offs](#design-trade-offs)); to snake_case, caseparser is the fastest (0.92 µs). For strings, caseparser is the fastest too (1.1 µs for 10 strings, against 1.4 µs for es-toolkit).

#### Memory

Heap used on Node.js, measured in a new process for each library:

| Library | Loading the library | One call: API response | One call: 1,000 unique keys | Kept after converting 256,000 keys |
| --- | ---: | ---: | ---: | ---: |
| caseparser | 71 KB | **121 KB** | **516 KB** | 0 |
| caseparser@5.1.0 | 289 KB | 2,348 KB | 2,719 KB | 0 |
| change-case | 135 KB | 2,850 KB | 1,610 KB | 0 |
| camelcase-keys | 210 KB | 1,516 KB | 1,742 KB | 11,488 KB |
| humps | **62 KB** | 1,183 KB | 759 KB | 0 |
| es-toolkit | 623 KB | 1,745 KB | 1,062 KB | 0 |

Loading is the heap used by importing the library, as the benchmarks do. One call is the memory allocated to convert to camelCase, including the result (62 KB and 48 KB). "Kept" is the memory still used after the calls: camelcase-keys keeps the keys it converted between calls (up to 2 × 100,000). 0 means under 10 KB, which is the noise of the measurement.

#### Compared with the same libraries

- **Cases:** caseparser and change-case convert keys to all 14 cases; humps to 7, es-toolkit and snakecase-keys to 5, camelcase-keys to 2.
- **Mixed input:** keys in different cases in one object are converted by all of them except humps.
- **Values:** caseparser and es-toolkit keep `Date`, `Map` and class instances as they are. The others turn some of them into broken copies or plain objects.
- **Types:** the converted keys are typed by caseparser, camelcase-keys and snakecase-keys. es-toolkit types some keys differently from its result, humps types the result as `object`, and change-case as `unknown`.
- **Security:** with `__proto__` in untrusted JSON, `humps.decamelizeKeys` replaces the result's prototype, and with a `constructor` key, snakecase-keys throws. The others, caseparser included, convert both.
- **Skipping keys:** caseparser (`ignore`), camelcase-keys, snakecase-keys and humps have an option to keep some keys as they are; change-case and es-toolkit don't.
- **Edge cases:** the libraries return different results, for example `userID` → `user_id` or `user_i_d`, and `html5Parser` → `html5_parser` or `html_5_parser`. See [what each library returns](./bench/results/edge-cases.md).

The benchmarks check that every library returns the expected output before measuring it, and each library is called in [its own file](./bench/libraries), with its documented options. The method and every result, with the raw numbers of every round, the date and the versions, are in [`bench/`](./bench). To run them all:

```sh
pnpm install
pnpm benchmark
```

## Compatibility

| Environment | Supported |
| --- | --- |
| ESM (`import`) | Node.js 22+, Deno, Bun, bundlers |
| CommonJS (`require`) | Node.js 22+, Bun |
| TypeScript | 4.7+ (any `moduleResolution`: `node`, `node16`/`nodenext`, `bundler`) |
| Browsers | Any ES2015 browser (via bundler) |
| Edge | Cloudflare Workers ([example](./examples/cloudflare-worker)) |

On every change, CI runs the test suite on Node.js 22, 24 and 26, Bun and Deno, and in Chromium, Firefox and WebKit, and runs [a Cloudflare Worker](./examples/cloudflare-worker) on workerd with the packed package. It also checks the packed package with [publint](https://publint.dev) and [Are the Types Wrong?](https://arethetypeswrong.github.io), for ESM, CommonJS and every `moduleResolution`, and compiles the type declarations with TypeScript 4.7.

## Security

caseparser is safe to use with untrusted input (e.g. request bodies or `JSON.parse` output): keys such as `__proto__` are copied as regular keys and never change an object's prototype, a `constructor` key doesn't stop an object from being converted, only the object's own properties are converted, and nothing is kept between calls. Limit the depth of untrusted input if a `RangeError` for very deep objects is not handled (see [Behavior and limitations](#behavior-and-limitations)).

Releases are built and published from GitHub Actions without long-lived tokens (OIDC), with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced back to the exact commit and workflow that built it. On npm, new versions are [staged](https://docs.npmjs.com/staged-publishing/) and only go live after a maintainer approves them with 2FA.

Found a vulnerability? Please report it privately, see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © 2017 Fernando Machado Bernardino
