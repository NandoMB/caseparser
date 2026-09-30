// The 15 `toX` functions must return exactly what they return in 5.1.0
import { describe, expect, test } from 'vitest';
import * as published from 'caseparser-5.1.0';
import { apiResponse, edgeCases, strings } from '../common/fixtures.ts';
import * as current from '../../dist/index.js';

// mulberry32, so every run tests the same inputs
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ALPHABET = 'abcxyzABCXYZ0129_-. $@#%/\\éÉßüÜñ';
const next = random(42);
const generated = Array.from({ length: 20_000 }, () => {
  const length = Math.floor(next() * 16);
  let str = '';
  for (let i = 0; i < length; i++) str += ALPHABET[Math.floor(next() * ALPHABET.length)];
  return str;
});
// Case changes that depend on context or change the length: `ς`, `İ`, `ǅ`, `ß`, surrogate pairs
const UNICODE_ALPHABET = Array.from('aZ_- $ΣσςΑβİıǅǄǆßﬁ😀中名');
const unicode = Array.from({ length: 10_000 }, () => {
  const length = Math.floor(next() * 12);
  let str = '';
  for (let i = 0; i < length; i++) str += UNICODE_ALPHABET[Math.floor(next() * UNICODE_ALPHABET.length)];
  return str;
});
const inputs = [...edgeCases, ...strings.map((item) => item.input), '__proto__', 'constructor', '', ...generated, ...unicode];

const nested = Object.fromEntries(
  generated.slice(0, 2000).map((key, i) => [key, i % 3 === 0 ? [{ [key]: i, [generated[i + 1]]: { [key]: null } }, i] : { [generated[i + 2]]: i }]),
);

const options = [undefined, true, false, ['$'], ['$', '@', '/'], { allowSymbols: true }, { allowSymbols: ['#'] }, { transform: 'lowercase' }, { transform: 'uppercase', allowSymbols: true }, { separator: '\\' }, { separator: '/', transform: 'lowercase' }];

const functions = Object.keys(current).filter((name) => typeof current[name as keyof typeof current] === 'function');

const serialize = (value: unknown): string =>
  JSON.stringify(value, (_, item) => (typeof item === 'object' && item !== null && !Array.isArray(item) ? Object.entries(item).concat([['[[Prototype]]', Object.getPrototypeOf(item) === Object.prototype]]) : item));

describe('regression against caseparser@5.1.0', () => {
  test('The current source exports the 15 toX functions of 5.1.0, and nothing else', () => {
    expect(functions.length).toBe(15);
    expect(Object.keys(current).length).toBe(15);
    for (const name of functions) expect(typeof published[name as keyof typeof published], name).toBe('function');
  });

  test.each(functions)('%s returns the same results', (name) => {
    const before = published[name as keyof typeof published] as (...args: unknown[]) => unknown;
    const after = current[name as keyof typeof current] as (...args: unknown[]) => unknown;
    for (const option of options) {
      const results = inputs.map((input) => [input, after(input, option), before(input, option)]);
      expect(results.filter(([, a, b]) => a !== b), JSON.stringify(option)).toEqual([]);
      for (const input of [apiResponse.snake, apiResponse.camel, nested, [nested, [nested]], JSON.parse('{"__proto__":{"a_b":1},"cD":[{"__proto__":2}]}')]) {
        expect(serialize(after(input, option))).toBe(serialize(before(input, option)));
      }
    }
  });
});
