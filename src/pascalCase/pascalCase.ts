import { converter } from '../parser';


export function pascalToCamel<T extends object | string>(input: T) {
  return converter(input, 'PascalToCamel');
}

export function pascalToSnake<T extends object | string>(input: T) {
  return converter(input, 'PascalToSnake');
}

export function pascalToDash<T extends object | string>(input: T) {
  return converter(input, 'PascalToDash');
}

export function pascalToUpperSnake<T extends object | string>(input: T) {
  return converter(input, 'PascalToUpperSnake');
}

export function pascalToUpperDash<T extends object | string>(input: T) {
  return converter(input, 'PascalToUpperDash');
}
