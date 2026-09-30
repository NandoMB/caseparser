### A `__proto__` key

| Library | To | At the top level | Inside an array |
| --- | --- | --- | --- |
| caseparser | camel | ✅ | ✅ |
| caseparser | snake | ✅ | ✅ |
| change-case | camel | ✅ | ✅ |
| change-case | snake | ✅ | ✅ |
| camelcase-keys | camel | ✅ | ✅ |
| snakecase-keys | snake | ✅ | ✅ |
| humps | camel | ✅ | ✅ |
| humps | snake | ❌ prototype replaced, the result inherits `isAdmin: true` | ❌ prototype replaced, the result inherits `isAdmin: true` |
| es-toolkit | camel | ✅ | ✅ |
| es-toolkit | snake | ✅ | ✅ |

### A `constructor` key

| Library | To | Object with a `constructor` key |
| --- | --- | --- |
| caseparser | camel | ✅ |
| caseparser | snake | ✅ |
| change-case | camel | ✅ |
| change-case | snake | ✅ |
| camelcase-keys | camel | ✅ |
| snakecase-keys | snake | ❌ throws `obj must be an plain object` |
| humps | camel | ✅ |
| humps | snake | ✅ |
| es-toolkit | camel | ✅ |
| es-toolkit | snake | ✅ |
