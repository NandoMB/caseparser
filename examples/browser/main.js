import { camelToSnake, snakeToCamel } from 'caseparser';

const output = document.getElementById('output');
const print = (text) => {
  output.textContent += `${text}\n`;
  console.log(text);
};

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
print(JSON.stringify(user, null, 2));

// And back to snake_case before sending data to the API
const payload = camelToSnake({ userId: user.userId, isEmailVerified: true });
print(JSON.stringify(payload));

output.dataset.done = 'true';
