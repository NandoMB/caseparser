---
"caseparser": minor
---

`toPath` takes a `separator` option to join the words with `'/'` (the default) or `'\\'`: `toPath('users/profilePicture', { separator: '\\' })` → `'users\\profile\\Picture'`, with the same type inference.

In `toPath`, `/` and `\` in the input now separate words, so paths can be converted between separators. This only changes results when symbols are kept with `allowSymbols`, where they used to be kept: `toPath('profile/picture', true)` → `'profile/picture'` (was `'profile//picture'`). In the other functions `/` and `\` are still symbols.
