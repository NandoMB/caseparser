import { converter } from '../parser';


export function upperSnakeToCamel<T extends object | string>(input: T) {
  return converter(input, 'UpperSnakeToCamel');
}

export function upperSnakeToSnake<T extends object | string>(input: T) {
  return converter(input, 'UpperSnakeToSnake');
}

export function upperSnakeToDash<T extends object | string>(input: T) {
  return converter(input, 'UpperSnakeToDash');
}

export function upperSnakeToPascal<T extends object | string>(input: T) {
  return converter(input, 'UpperSnakeToPascal');
}

export function upperSnakeToUpperDash<T extends object | string>(input: T) {
  return converter(input, 'UpperSnakeToUpperDash');
}
