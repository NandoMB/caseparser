---
"caseparser": minor
---

The `toX` functions take an `ignore` option: object keys that are kept as they are, at any depth, while their values are still converted. The inferred type keeps the ignored keys too:

```ts
toCamel({ _id: 1, user_id: 2, extra_data: { inner_key: 3 } }, { ignore: ['_id', 'extra_data'] });
// { _id: 1, userId: 2, extra_data: { innerKey: 3 } }
```

`CaseOptions`, `TransformCaseOptions` and `PathCaseOptions` take a new optional type parameter for the ignored keys, and `CaseResult` a new optional last one.
