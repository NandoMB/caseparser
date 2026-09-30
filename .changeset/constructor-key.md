---
"caseparser": patch
---

Objects with a `constructor` key are converted. Before, `toCamel(JSON.parse('{"user_id":1,"constructor":"x"}'))` returned `undefined`, and a nested object with a `constructor` key was returned as it was, without converting its keys. Untrusted input (like a request body) could contain this key.
