---
"caseparser": major
---

Breaking changes in the `toX` functions released in 4.3.0 (the deprecated `<from>To<To>` functions are unchanged):

- **`toDash` and `toUpperDash` were renamed to `toKebab` and `toUpperKebab`** (kebab-case is the widely used name). The `Case` type uses `'Kebab'` and `'UpperKebab'` instead of `'Dash'` and `'UpperDash'`.
- **Symbols (ASCII punctuation such as `$`, `@`, `#` or `%`) are removed by default**: `toSnake('$ref')` was `'$ref'` and is now `'ref'`. Pass `true` as the second argument to keep them (`toSnake('$ref', true)` → `'$ref'`), or an array to keep only some (`toCamel(data, ['$'])`).
- **A symbol now starts a new word**, whether it is kept or removed: `toSnake('user@name')` was `'user@name'` and is now `'user_name'` (or `'user_@name'` with `true`). A kept symbol sticks to the start of the next word, or to the end of the previous one when no word follows (`'total%'`).
- **`toDot` keeps the original case of each word**: `toDot('helloWorld')` was `'hello.world'` and is now `'hello.World'`. Use `.toLowerCase()` on strings for the previous result.

Migration from 4.3: replace `toDash`/`toUpperDash` with `toKebab`/`toUpperKebab`; pass `true` as the second argument where keys start with symbols that must be kept (`$ref`, `@type`); and lowercase `toDot` results where needed.

New, non-breaking: the `keepSymbols` argument on every `toX` function, and five new cases: `toPascalSnake` (`Hello_World`, also known as Ada_Case), `toPath` (`hello/World`, keeps the original case), `toSpace` (`hello World`, keeps the original case), `toLower` (`hello world`) and `toUpper` (`HELLO WORLD`). The `toX` functions require TypeScript 4.5+; the deprecated `<from>To<To>` functions keep supporting TypeScript 4.1+.
