---
"caseparser": minor
---

Add `toX` functions that convert from any case (`toCamel`, `toPascal`, `toSnake`, `toDash`, `toUpperSnake`, `toUpperDash`, `toTrain`, `toDot`, `toTitle`, `toSentence`), with the same key type inference. They split the input into words whatever its case, so a single object can mix key cases, and acronyms are kept together (`toSnake('userID')` → `'user_id'`). The existing `<from>To<To>` functions are unchanged.
