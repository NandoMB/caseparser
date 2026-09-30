# caseparser

## 6.0.0

### Major Changes

- ab363f1: Removes the deprecated `<from>To<To>` functions, and requires TypeScript 4.7+ and Node.js 22+.
  
  **Breaking changes**
  
  - The 90 `<from>To<To>` functions (e.g. `snakeToCamel`, `camelToSnake`), deprecated since 4.3.0, are removed. The whole package is 60% smaller (12.4 KB → 4.9 KB minified, 3.1 KB → 1.8 KB gzipped), and its type declarations 70% smaller (90 KB → 27 KB).
  - The types `Result`, `ParserType` and `Prettify`, used only by those functions, are removed, and so is `KeepSymbols`, the old name of `AllowSymbols`.
  - TypeScript 4.7 or later is required (it was 4.5 for the `toX` functions).
  - Node.js 22 or later is required (`engines`), the oldest maintained LTS version. Node.js 22+, Bun, Deno, browsers and Cloudflare Workers are tested on every change. Stay on 5.x for older versions of Node.js.
  
  **Migrating from 5.x**
  
  Replace each `<from>To<To>` function with the `toX` function for its target case, whatever the source case: `camelToSnake`, `dashToSnake`, `titleToSnake`... all become `toSnake`. The dash cases were renamed: `<from>ToDash` becomes `toKebab`, and `<from>ToUpperDash` becomes `toUpperKebab`.
  
  For well-formed keys (`firstName`, `first_name`) the result is the same. It differs when a key has consecutive uppercase letters or doesn't match the source case, and `toDot` keeps the original case of each word (pass `{ transform: 'lowercase' }` to get the old result):
  
  | Before | Result | After | Result |
  | --- | --- | --- | --- |
  | `camelToSnake('userID')` | `'user_i_d'` | `toSnake('userID')` | `'user_id'` |
  | `camelToSnake('XMLHttpRequest')` | `'_x_m_l_http_request'` | `toSnake('XMLHttpRequest')` | `'xml_http_request'` |
  | `camelToSnake('HelloWorld')` | `'_hello_world'` | `toSnake('HelloWorld')` | `'hello_world'` |
  | `snakeToCamel('user_ID')` | `'userID'` | `toCamel('user_ID')` | `'userId'` |
  | `camelToDot('helloWorld')` | `'hello.world'` | `toDot('helloWorld')` | `'hello.World'` |
  | `camelToSnake({ __proto__: … })` from JSON | key kept as `__proto__` | `toSnake(…)` | key converted to `proto` (keep it with `ignore: ['__proto__']`) |
  
  If your code reads keys like `user_i_d` produced by the old functions, update those reads when migrating. The inferred types follow the new results, so TypeScript points out every place to change.

### Minor Changes

- ab363f1: The `toX` functions take an `ignore` option: object keys that are kept as they are, at any depth, while their values are still converted. The inferred type keeps the ignored keys too:
  
  ```ts
  toCamel({ _id: 1, user_id: 2, extra_data: { inner_key: 3 } }, { ignore: ['_id', 'extra_data'] });
  // { _id: 1, userId: 2, extra_data: { innerKey: 3 } }
  ```
  
  `CaseOptions`, `TransformCaseOptions` and `PathCaseOptions` take a new optional type parameter for the ignored keys, and `CaseResult` a new optional last one.

### Patch Changes

- ab363f1: Objects with a `constructor` key are converted. Before, `toCamel(JSON.parse('{"user_id":1,"constructor":"x"}'))` returned `undefined`, and a nested object with a `constructor` key was returned as it was, without converting its keys. Untrusted input (like a request body) could contain this key.
- ab363f1: Faster conversion, with less memory:
  
  - Each distinct key is converted once per call when converting arrays of objects, so objects with the same keys (like the items of an API response) are converted ~16x faster.
  - Keys and strings are split into words by reading character codes and slicing the string, instead of building each word one character at a time, so each key is converted ~2–5x faster (objects with unique keys, small objects and single strings).
  - One call allocates up to ~20x less memory (121 KB against 2,348 KB for an API response with 2,104 keys), and nothing is kept between calls.
  
  The results are unchanged: a test compares every `toX` function and option with 5.1.0 on ~30,000 generated inputs, including letters whose case depends on context (`ς`, `İ`, `ǅ`). See the [benchmarks](https://github.com/NandoMB/caseparser/tree/main/bench).

## 5.1.0

### Minor Changes

- 770f400: `toPath` takes a `separator` option to join the words with `'/'` (the default) or `'\\'`: `toPath('users/profilePicture', { separator: '\\' })` → `'users\\profile\\Picture'`, with the same type inference.
  
  In `toPath`, `/` and `\` in the input now separate words, so paths can be converted between separators. This only changes results when symbols are kept with `allowSymbols`, where they used to be kept: `toPath('profile/picture', true)` → `'profile/picture'` (was `'profile//picture'`). In the other functions `/` and `\` are still symbols.
- 770f400: The `toX` functions now also take an options object as the second argument: `toCamel(data, { allowSymbols: ['$'] })`. Passing `true` or an array directly (`toCamel(data, ['$'])`) keeps working as a shorthand for `allowSymbols`.
  
  `toDot` and `toPath` take a `transform` option (`'lowercase'` or `'uppercase'`) to change the case of the whole result, including object keys, with the same type inference: `toDot({ user_ID: 1 }, { transform: 'lowercase' })` → `{ 'user.id': 1 }`. Without it they keep the original case of each word, as before.
  
  The `KeepSymbols` type is renamed to `AllowSymbols`. `KeepSymbols` keeps working as a deprecated alias and will be removed in the next major version. New exported types: `AllowSymbols`, `CaseOptions`, `TransformCaseOptions` and `Transform`.

## 5.0.0

### Major Changes

- c1904a4: Breaking changes in the `toX` functions released in 4.3.0 (the deprecated `<from>To<To>` functions are unchanged):
  
  - **`toDash` and `toUpperDash` were renamed to `toKebab` and `toUpperKebab`** (kebab-case is the widely used name). The `Case` type uses `'Kebab'` and `'UpperKebab'` instead of `'Dash'` and `'UpperDash'`.
  - **Symbols (ASCII punctuation such as `$`, `@`, `#` or `%`) are removed by default**: `toSnake('$ref')` was `'$ref'` and is now `'ref'`. Pass `true` as the second argument to keep them (`toSnake('$ref', true)` → `'$ref'`), or an array to keep only some (`toCamel(data, ['$'])`).
  - **A symbol now starts a new word**, whether it is kept or removed: `toSnake('user@name')` was `'user@name'` and is now `'user_name'` (or `'user_@name'` with `true`). A kept symbol sticks to the start of the next word, or to the end of the previous one when no word follows (`'total%'`).
  - **`toDot` keeps the original case of each word**: `toDot('helloWorld')` was `'hello.world'` and is now `'hello.World'`. Use `.toLowerCase()` on strings for the previous result.
  
  Migration from 4.3: replace `toDash`/`toUpperDash` with `toKebab`/`toUpperKebab`; pass `true` as the second argument where keys start with symbols that must be kept (`$ref`, `@type`); and lowercase `toDot` results where needed.
  
  New, non-breaking: the `keepSymbols` argument on every `toX` function, and five new cases: `toPascalSnake` (`Hello_World`, also known as Ada_Case), `toPath` (`hello/World`, keeps the original case), `toSpace` (`hello World`, keeps the original case), `toLower` (`hello world`) and `toUpper` (`HELLO WORLD`). The `toX` functions require TypeScript 4.5+; the deprecated `<from>To<To>` functions keep supporting TypeScript 4.1+.

## 4.3.0

### Minor Changes

- 5507fe3: Deprecate the 90 `<from>To<To>` functions (e.g. `camelToSnake`) in favor of the `toX` functions (e.g. `toSnake`). They keep working and will be removed in the next major version.
  
  Migration: replace each one with the `toX` function for its target case. Results are the same for well-formed keys, but differ for consecutive uppercase letters and keys that don't match the source case: `camelToSnake('userID')` → `'user_i_d'` while `toSnake('userID')` → `'user_id'`; `camelToSnake('HelloWorld')` → `'_hello_world'` while `toSnake('HelloWorld')` → `'hello_world'`. See "Migrating to `toX`" in the README.
- 5507fe3: Add `toX` functions that convert from any case (`toCamel`, `toPascal`, `toSnake`, `toDash`, `toUpperSnake`, `toUpperDash`, `toTrain`, `toDot`, `toTitle`, `toSentence`), with the same key type inference. They split the input into words whatever its case, so a single object can mix key cases, and acronyms are kept together (`toSnake('userID')` → `'user_id'`). The existing `<from>To<To>` functions are unchanged.

## 4.2.0

### Minor Changes

- 1003e46: Add Title Case (`First Name`) and Sentence case (`First name`) conversions: `titleToX`/`xToTitle` and `sentenceToX`/`xToSentence` for every existing case, with the same key type inference. Useful for UI labels and for spreadsheet/CSV headers (`titleToCamel({ 'First Name': 'John' })` → `{ firstName: 'John' }`).

## 4.1.0

### Minor Changes

- 38c321a: Add Train-Case (`Content-Type`) and dot.case (`app.server.port`) conversions: `trainToX`/`xToTrain` and `dotToX`/`xToDot` for every existing case, with the same key type inference.

## 4.0.0

### Major Changes

- f2956ae: **Why a major version?**
  
  The public API is **unchanged**: every function keeps the same name, signature and output, and both `import { ... } from 'caseparser'` and `require('caseparser')` keep working. This is a major release only because the internal file layout of the package changed, and we'd rather be explicit than risk breaking anyone through a minor update.
  
  **Breaking changes**
  
  - **Deep imports are no longer supported.** The package now has an `exports` map, so only `caseparser` (and `caseparser/package.json`) can be imported.
  - **`dist/index.js` is now ESM.** The CommonJS build moved to `dist/index.cjs`. If you were deep-importing `caseparser/dist/index.js` from CommonJS, it will no longer work.
  - **`"__proto__"` keys are preserved.** A `"__proto__"` key is now kept as a regular key in the result instead of replacing the prototype of the returned object (see the security fix below). Inherited (non-own) properties are no longer copied.
  
  **Migration**
  
  In most projects nothing needs to change. If you import from `caseparser/dist/...`, import from the package root instead:
  
  ```diff
  - const { camelToSnake } = require('caseparser/dist/index.js');
  + const { camelToSnake } = require('caseparser');
  ```
  
  **Security**
  
  - Fixed a prototype injection: converting input such as `JSON.parse('{"__proto__": {"isAdmin": true}}')` used to return an object that *inherited* `is_admin: true`. Keys are now written with `Object.defineProperty`, so they can never change the prototype of the result.
  
  **New**
  
  - Published to JSR as [`@nandomb/caseparser`](https://jsr.io/@nandomb/caseparser), for use in Deno, Bun and Node.js.
  - Authored as TypeScript ESM. The npm package ships ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) builds, down-leveled to ES2015, with matching type declarations.
    - CommonJS: Node.js 8+
    - ESM: Node.js 12.22+, Deno, Bun and bundlers
    - TypeScript 4.1+ with any `moduleResolution` (`node`, `node16`/`nodenext`, `bundler`)
  - Public types `Result`, `ParserType` and `Prettify` are now exported.
  - Every function has JSDoc with examples.
  - npm packages are published from CI without long-lived tokens (trusted publishing), with provenance, and only go live after a maintainer approves them with 2FA (staged publishing).
  
  **Maintenance**
  
  - Tooling updated to TypeScript 7, Vitest 5, tsdown (replacing tsup) and pnpm 12, with zero known vulnerabilities.
  - CI runs on Node.js 22, 24 and 26, with GitHub Actions pinned by commit SHA and Dependabot keeping them up to date.

## 3.0.0

### Major Changes

- e608e9d: \* This version enable bundlers to eliminate unused code (treeshake).
  - Bump @babel/traverse from 7.21.4 to 7.23.2
  - Bump postcss from 8.4.21 to 8.4.31
  - Bump vite from 4.2.1 to 4.4.8

## 2.1.0

### Minor Changes

- c48dd7a: Adding typing inference based on parameter's type

## 2.0.3

### Patch Changes

- a3ebdbd: Code impovements

## 2.0.2

### Patch Changes

- 7835aa8: Cleaning some unnecessary files

## 2.0.1

### Patch Changes

- 295bf91: Fix npm publish config

## 2.0.0

### Patch Changes

- bef239d: testing changeset
