---
"caseparser": patch
---

Faster conversion, with less memory:

- Each distinct key is converted once per call when converting arrays of objects, so objects with the same keys (like the items of an API response) are converted ~16x faster.
- Keys and strings are split into words by reading character codes and slicing the string, instead of building each word one character at a time, so each key is converted ~2–5x faster (objects with unique keys, small objects and single strings).
- One call allocates up to ~20x less memory (121 KB against 2,348 KB for an API response with 2,104 keys), and nothing is kept between calls.

The results are unchanged: a test compares every `toX` function and option with 5.1.0 on ~30,000 generated inputs, including letters whose case depends on context (`ς`, `İ`, `ǅ`). See the [benchmarks](https://github.com/NandoMB/caseparser/tree/main/bench).
