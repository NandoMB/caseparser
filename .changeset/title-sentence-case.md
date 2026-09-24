---
"caseparser": minor
---

Add Title Case (`First Name`) and Sentence case (`First name`) conversions: `titleToX`/`xToTitle` and `sentenceToX`/`xToSentence` for every existing case, with the same key type inference. Useful for UI labels and for spreadsheet/CSV headers (`titleToCamel({ 'First Name': 'John' })` → `{ firstName: 'John' }`).
