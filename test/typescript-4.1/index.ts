import { camelToSnake, snakeToCamel } from '../../dist/index';

const user = snakeToCamel({
  user_id: 42,
  billing_address: { postal_code: '61105' },
  recent_orders: [{ order_id: 1, total_amount: 99.9 }]
});

const postalCode: string = user.billingAddress.postalCode;
const firstOrderTotal: number = user.recentOrders[0].totalAmount;
// @ts-expect-error `user_id` no longer exists after the conversion
user.user_id;

const payload: { user_id: number; is_email_verified: boolean } = camelToSnake({ userId: user.userId, isEmailVerified: true });

export { postalCode, firstOrderTotal, payload };
