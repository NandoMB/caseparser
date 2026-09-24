---
"caseparser": minor
---

Deprecate the 90 `<from>To<To>` functions (e.g. `camelToSnake`) in favor of the `toX` functions (e.g. `toSnake`). They keep working and will be removed in the next major version.

Migration: replace each one with the `toX` function for its target case. Results are the same for well-formed keys, but differ for consecutive uppercase letters and keys that don't match the source case: `camelToSnake('userID')` → `'user_i_d'` while `toSnake('userID')` → `'user_id'`; `camelToSnake('HelloWorld')` → `'_hello_world'` while `toSnake('HelloWorld')` → `'hello_world'`. See "Migrating to `toX`" in the README.
