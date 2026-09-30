---
"caseparser": major
---

Removes the deprecated `<from>To<To>` functions, and requires TypeScript 4.7+ and Node.js 22+.

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
