# caseparser

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
