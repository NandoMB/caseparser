import type { Case } from '../libraries/types.ts';

const snakeUser = (id: number) => ({
  user_id: id,
  first_name: 'Ada',
  last_name: 'Lovelace',
  email_address: `ada${id}@example.com`,
  is_active: true,
  created_at: '2024-01-01T00:00:00.000Z',
  home_address: { street_name: 'Main Street', postal_code: '61105', country_code: 'US' },
  recent_orders: [
    { order_id: id * 10, total_amount: 99.9, line_items: [{ product_id: 1, unit_price: 49.95, item_count: 2 }] },
    { order_id: id * 10 + 1, total_amount: 10, line_items: [] },
  ],
  tag_list: ['new_customer', 'newsletter'],
});

const camelUser = (id: number) => ({
  userId: id,
  firstName: 'Ada',
  lastName: 'Lovelace',
  emailAddress: `ada${id}@example.com`,
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  homeAddress: { streetName: 'Main Street', postalCode: '61105', countryCode: 'US' },
  recentOrders: [
    { orderId: id * 10, totalAmount: 99.9, lineItems: [{ productId: 1, unitPrice: 49.95, itemCount: 2 }] },
    { orderId: id * 10 + 1, totalAmount: 10, lineItems: [] },
  ],
  tagList: ['new_customer', 'newsletter'],
});

const USERS = 100;

export const apiResponse = {
  snake: { page_number: 1, page_size: USERS, total_count: USERS, results: Array.from({ length: USERS }, (_, i) => snakeUser(i)) },
  camel: { pageNumber: 1, pageSize: USERS, totalCount: USERS, results: Array.from({ length: USERS }, (_, i) => camelUser(i)) },
};

export const smallObject = {
  snake: { user_id: 1, first_name: 'Ada', last_name: 'Lovelace', email_address: 'ada@example.com', is_active: true, created_at: '2024-01-01', role_name: 'admin', last_login_at: '2024-02-01' },
  camel: { userId: 1, firstName: 'Ada', lastName: 'Lovelace', emailAddress: 'ada@example.com', isActive: true, createdAt: '2024-01-01', roleName: 'admin', lastLoginAt: '2024-02-01' },
};

// More unique keys than the cache camelcase-keys keeps between calls (up to 2 × 100,000)
const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
/** A 3-letter lowercase word for each n in [0, 17576): 'aaa', 'aab', ... */
const word = (n: number) => LETTERS[Math.floor(n / 676) % 26] + LETTERS[Math.floor(n / 26) % 26] + LETTERS[n % 26];
const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const UNIQUE_KEYS_PER_OBJECT = 1000;
export const UNIQUE_KEYS_OBJECTS = 256;

function uniqueKeysObject(index: number, format: 'snake' | 'camel') {
  const result: Record<string, number> = {};
  for (let i = 0; i < UNIQUE_KEYS_PER_OBJECT; i++) {
    const n = index * UNIQUE_KEYS_PER_OBJECT + i;
    const [a, b] = [word(Math.floor(n / 17576)), word(n % 17576)];
    result[format === 'snake' ? `${a}_${b}_value` : `${a}${capitalize(b)}Value`] = n;
  }
  return result;
}

export const uniqueKeys = {
  snake: Array.from({ length: UNIQUE_KEYS_OBJECTS }, (_, i) => uniqueKeysObject(i, 'snake')),
  camel: Array.from({ length: UNIQUE_KEYS_OBJECTS }, (_, i) => uniqueKeysObject(i, 'camel')),
};

const cap = (word: string) => word[0].toUpperCase() + word.slice(1);
const JOINS = {
  camel: (words: string[]) => words.map((word, i) => (i ? cap(word) : word)).join(''),
  pascal: (words: string[]) => words.map(cap).join(''),
  snake: (words: string[]) => words.join('_'),
  kebab: (words: string[]) => words.join('-'),
  'upper snake': (words: string[]) => words.join('_').toUpperCase(),
  'upper kebab': (words: string[]) => words.join('-').toUpperCase(),
  train: (words: string[]) => words.map(cap).join('-'),
  title: (words: string[]) => words.map(cap).join(' '),
  sentence: (words: string[]) => cap(words.join(' ')),
  'pascal snake': (words: string[]) => words.map(cap).join('_'),
  lower: (words: string[]) => words.join(' '),
  upper: (words: string[]) => words.join(' ').toUpperCase(),
  dot: (words: string[]) => words.join('.'),
  path: (words: string[]) => words.join('/'),
} satisfies Record<Case, (words: string[]) => string>;
export type JoinCase = keyof typeof JOINS;

/**
 * The input converted to each case: snake_case keys to camelCase and PascalCase, and camelCase keys to the
 * other cases, because humps and snakecase-keys only convert from camelCase to the cases with a separator.
 */
export const inputCase = (target: Case): 'snake' | 'camel' => (target === 'camel' || target === 'pascal' ? 'snake' : 'camel');

export const joinCase = (target: JoinCase, words: string[]) => JOINS[target](words);

export function apiResponseIn(target: JoinCase) {
  const k = (...words: string[]) => joinCase(target, words);
  const user = (id: number) => ({
    [k('user', 'id')]: id,
    [k('first', 'name')]: 'Ada',
    [k('last', 'name')]: 'Lovelace',
    [k('email', 'address')]: `ada${id}@example.com`,
    [k('is', 'active')]: true,
    [k('created', 'at')]: '2024-01-01T00:00:00.000Z',
    [k('home', 'address')]: { [k('street', 'name')]: 'Main Street', [k('postal', 'code')]: '61105', [k('country', 'code')]: 'US' },
    [k('recent', 'orders')]: [
      { [k('order', 'id')]: id * 10, [k('total', 'amount')]: 99.9, [k('line', 'items')]: [{ [k('product', 'id')]: 1, [k('unit', 'price')]: 49.95, [k('item', 'count')]: 2 }] },
      { [k('order', 'id')]: id * 10 + 1, [k('total', 'amount')]: 10, [k('line', 'items')]: [] },
    ],
    [k('tag', 'list')]: ['new_customer', 'newsletter'],
  });
  return { [k('page', 'number')]: 1, [k('page', 'size')]: USERS, [k('total', 'count')]: USERS, [k('results')]: Array.from({ length: USERS }, (_, i) => user(i)) };
}

export function uniqueKeysObjectIn(target: JoinCase, index: number) {
  const result: Record<string, number> = {};
  for (let i = 0; i < UNIQUE_KEYS_PER_OBJECT; i++) {
    const n = index * UNIQUE_KEYS_PER_OBJECT + i;
    result[joinCase(target, [word(Math.floor(n / 17576)), word(n % 17576), 'value'])] = n;
  }
  return result;
}

export const strings: Array<{ input: string; camel: string; snake: string }> = [
  { input: 'user_id', camel: 'userId', snake: 'user_id' },
  { input: 'firstName', camel: 'firstName', snake: 'first_name' },
  { input: 'LastName', camel: 'lastName', snake: 'last_name' },
  { input: 'ACCOUNT_STATUS', camel: 'accountStatus', snake: 'account_status' },
  { input: 'Display Name', camel: 'displayName', snake: 'display_name' },
  { input: 'content-type', camel: 'contentType', snake: 'content_type' },
  { input: 'Postal-Code', camel: 'postalCode', snake: 'postal_code' },
  { input: 'created_at', camel: 'createdAt', snake: 'created_at' },
  { input: 'isActive', camel: 'isActive', snake: 'is_active' },
  { input: 'order.total', camel: 'orderTotal', snake: 'order_total' },
];

// No expected output: some have more than one reasonable answer (`html5_parser` or `html_5_parser`)
export const edgeCases: string[] = [
  'XMLHttpRequest',
  'userID',
  'HELLO_WORLD',
  'X-API-Key',
  'LAST_login_AT',
  'Hello World',
  'html5Parser',
  'version2Beta',
  '__private_flag',
  '$ref',
];

export const typedKeysInput = { user_id: 1, FirstName: 'a', 'last-name': 'b', ACCOUNT_STATUS: 'c', 'Display Name': 'd', nested_list: [{ order_id: 1 }] };
export const typedKeysCamelInput = { userId: 1, firstName: 'a', nestedList: [{ orderId: 1 }] };
