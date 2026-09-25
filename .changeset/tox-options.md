---
"caseparser": minor
---

The `toX` functions now also take an options object as the second argument: `toCamel(data, { allowSymbols: ['$'] })`. Passing `true` or an array directly (`toCamel(data, ['$'])`) keeps working as a shorthand for `allowSymbols`.

`toDot` and `toPath` take a `transform` option (`'lowercase'` or `'uppercase'`) to change the case of the whole result, including object keys, with the same type inference: `toDot({ user_ID: 1 }, { transform: 'lowercase' })` → `{ 'user.id': 1 }`. Without it they keep the original case of each word, as before.

The `KeepSymbols` type is renamed to `AllowSymbols`. `KeepSymbols` keeps working as a deprecated alias and will be removed in the next major version. New exported types: `AllowSymbols`, `CaseOptions`, `TransformCaseOptions` and `Transform`.
