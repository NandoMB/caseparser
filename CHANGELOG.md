# caseparser

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
