import { camelToSnake, snakeToCamel } from '@nandomb/caseparser';

// A response from an API that uses snake_case
const response = {
  user_id: 42,
  first_name: 'Ada',
  last_name: 'Lovelace',
  billing_address: { postal_code: '61105', street_name: 'Forest Run Circle' },
  recent_orders: [{ order_id: 1, total_amount: 99.9 }]
};

// Convert it to camelCase to use it in your app
const user = snakeToCamel(response);
console.log(JSON.stringify(user, null, 2));

// The new keys are inferred by TypeScript, deeply
const postalCode: string = user.billingAddress.postalCode;
const firstOrderTotal: number = user.recentOrders[0].totalAmount;
// @ts-expect-error `first_name` no longer exists after the conversion
user.first_name;

// And back to snake_case before sending data to the API
const payload = camelToSnake({ userId: user.userId, isEmailVerified: true });
console.log(JSON.stringify(payload));

export { postalCode, firstOrderTotal };
