import { converter } from '../parser';


export function camelToDash<T extends object | string>(input: T) {
  return converter(input, 'CamelToDash');
}

export function camelToSnake<T extends object | string>(input: T) {
  return converter(input, 'CamelToSnake');
}

export function camelToPascal<T extends object | string>(input: T) {
  return converter(input, 'CamelToPascal');
}

export function camelToUpperSnake<T extends object | string>(input: T) {
  return converter(input, 'CamelToUpperSnake');
}

export function camelToUpperDash<T extends object | string>(input: T) {
  return converter(input, 'CamelToUpperDash');
}
