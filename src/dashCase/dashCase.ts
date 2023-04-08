import { converter } from '../parser';

export function dashToSnake<T extends object | string>(input: T) {
  return converter(input, 'DashToSnake');
}

export function dashToCamel<T extends object | string>(input: T) {
  return converter(input, 'DashToCamel');
}

export function dashToPascal<T extends object | string>(input: T) {
  return converter(input, 'DashToPascal');
}

export function dashToUpperSnake<T extends object | string>(input: T) {
  return converter(input, 'DashToUpperSnake');
}

export function dashToUpperDash<T extends object | string>(input: T) {
  return converter(input, 'DashToUpperDash');
}
