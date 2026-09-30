// A response from an API that uses snake_case
const response = {
  user_id: 42,
  first_name: 'Ada',
  last_name: 'Lovelace',
  billing_address: { postal_code: '61105', street_name: 'Forest Run Circle' },
  recent_orders: [{ order_id: 1, total_amount: 99.9 }],
};

export function conversions(caseparser) {
  return {
    user: caseparser.toCamel(response),
    payload: caseparser.toSnake({ userId: 42, isEmailVerified: true }),
    cases: {
      toCamel: caseparser.toCamel('user_ID'),
      toPascal: caseparser.toPascal('user-id'),
      toSnake: caseparser.toSnake('XMLHttpRequest'),
      toKebab: caseparser.toKebab('userId'),
      toUpperSnake: caseparser.toUpperSnake('userId'),
      toUpperKebab: caseparser.toUpperKebab('user_id'),
      toTrain: caseparser.toTrain('content_type'),
      toDot: caseparser.toDot('userId'),
      toTitle: caseparser.toTitle('termsOfUse'),
      toSentence: caseparser.toSentence('termsOfUse'),
      toPascalSnake: caseparser.toPascalSnake('userId'),
      toPath: caseparser.toPath('userId'),
      toSpace: caseparser.toSpace('userId'),
      toLower: caseparser.toLower('UserId'),
      toUpper: caseparser.toUpper('userId'),
    },
    options: {
      allowSymbols: caseparser.toCamel('$ref_id', { allowSymbols: ['$'] }),
      ignore: caseparser.toCamel({ _id: 1, user_id: 2 }, { ignore: ['_id'] }),
      transform: caseparser.toDot('userId', { transform: 'lowercase' }),
      separator: caseparser.toPath('userId', { separator: '\\' }),
    },
    untrusted: caseparser.toCamel(JSON.parse('{"__proto__":{"is_admin":true},"constructor":{"user_id":1}}')),
  };
}
