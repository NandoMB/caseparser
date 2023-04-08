import { converter } from '../parser';


export function snakeToCamel<T extends object | string>(input: T) {
  return converter(input, 'SnakeToCamel');
}

export function snakeToDash<T extends object | string>(input: T) {
  return converter(input, 'SnakeToDash');
}

export function snakeToPascal<T extends object | string>(input: T) {
  return converter(input, 'SnakeToPascal');
}

export function snakeToUpperSnake<T extends object | string>(input: T) {
  return converter(input, 'SnakeToUpperSnake');
}

export function snakeToUpperDash<T extends object | string>(input: T) {
  return converter(input, 'SnakeToUpperDash');
}
