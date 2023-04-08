import { converter } from '../parser';


export function upperDashToCamel<T extends object | string>(input: T) {
  return converter(input, 'UpperDashToCamel');
}

export function upperDashToSnake<T extends object | string>(input: T) {
  return converter(input, 'UpperDashToSnake');
}

export function upperDashToDash<T extends object | string>(input: T) {
  return converter(input, 'UpperDashToDash');
}

export function upperDashToPascal<T extends object | string>(input: T) {
  return converter(input, 'UpperDashToPascal');
}

export function upperDashToUpperSnake<T extends object | string>(input: T) {
  return converter(input, 'UpperDashToUpperSnake');
}
