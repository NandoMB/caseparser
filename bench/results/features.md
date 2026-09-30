| | caseparser | change-case | camelcase-keys | snakecase-keys | humps | es-toolkit |
| --- | --- | --- | --- | --- | --- | --- |
| Version | 5.1.0 + current source | 5.4.4 | 10.0.3 | 9.0.2 | 2.0.1 | 1.52.0 |
| Target cases | 14: camel, pascal, snake, kebab, upper snake, upper kebab, train, title, sentence, pascal snake, lower, upper, dot, path | 14: camel, pascal, snake, kebab, upper snake, upper kebab, train, title, sentence, pascal snake, lower, upper, dot, path | 2: camel, pascal | 5: snake, kebab, lower, dot, path | 7: camel, pascal, snake, kebab, lower, dot, path | 5: camel, pascal, snake, kebab, upper snake |
| Input keys in any case, mixed in one object | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Nested objects | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Objects inside arrays | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| An array as the input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Date` values still work | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| `Map` values still work | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Class instances | kept as they are | keys converted, class kept | converted to a plain object | converted to a plain object | converted to a plain object | kept as they are |
| Doesn't change the input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Option to skip keys | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Typed keys | ✅ | ❌ `unknown` | ✅ | ✅ | ❌ `object` | ⚠️ some keys typed differently from the result |
| Dependencies (installed packages) | 0 | 0 | 5 | 3 | 0 | 0 |
