type CamelToDash<T extends string> = T extends `${infer L}${infer R}` ? `${L extends Capitalize<L> ? '-' : ''}${Lowercase<L>}${CamelToDash<R>}` : T;
type CamelToPascal<T extends string> = Capitalize<T>;
type CamelToSnake<T extends string> = T extends `${infer L}${infer R}` ? `${L extends Capitalize<L> ? '_' : ''}${Lowercase<L>}${CamelToSnake<R>}` : T;
type CamelToUpperDash<T extends string> = Uppercase<CamelToDash<T>>;
type CamelToUpperSnake<T extends string> = Uppercase<CamelToSnake<T>>;

type DashToCamel<T extends string> = T extends `${infer L}-${infer R}` ? `${L}${Capitalize<DashToCamel<R>>}` : T;
type DashToPascal<T extends string> = Capitalize<DashToCamel<T>>;
type DashToSnake<T extends string> = T extends `${infer L}-${infer R}` ? `${L}_${DashToSnake<R>}` : T;
type DashToUpperDash<T extends string> = Uppercase<T>;
type DashToUpperSnake<T extends string> = Uppercase<DashToSnake<T>>;

type PascalToCamel<T extends string> = Uncapitalize<T>;
type PascalToDash<T extends string> = CamelToDash<Uncapitalize<T>>;
type PascalToSnake<T extends string> = CamelToSnake<Uncapitalize<T>>;
type PascalToUpperDash<T extends string> = Uppercase<PascalToDash<T>>;
type PascalToUpperSnake<T extends string> = Uppercase<PascalToSnake<T>>;

type SnakeToCamel<T extends string> = T extends `${infer L}_${infer R}` ? `${L}${Capitalize<SnakeToCamel<R>>}` : T;
type SnakeToDash<T extends string> = T extends `${infer L}_${infer R}` ? `${L}-${SnakeToDash<R>}` : T;
type SnakeToPascal<T extends string> = Capitalize<SnakeToCamel<T>>
type SnakeToUpperDash<T extends string> = Uppercase<SnakeToDash<T>>;
type SnakeToUpperSnake<T extends string> = Uppercase<T>;

type UpperDashToCamel<T extends string> = DashToCamel<Lowercase<T>>;
type UpperDashToDash<T extends string> = Lowercase<T>;
type UpperDashToPascal<T extends string> = Capitalize<UpperDashToCamel<T>>;
type UpperDashToSnake<T extends string> = DashToSnake<UpperDashToDash<T>>;
type UpperDashToUpperSnake<T extends string> = Uppercase<UpperDashToSnake<T>>;

type UpperSnakeToCamel<T extends string> = SnakeToCamel<Lowercase<T>>;
type UpperSnakeToDash<T extends string> = SnakeToDash<Lowercase<T>>;
type UpperSnakeToPascal<T extends string> = SnakeToPascal<Lowercase<T>>;
type UpperSnakeToSnake<T extends string> = Lowercase<T>;
type UpperSnakeToUpperDash<T extends string> = Uppercase<UpperSnakeToDash<T>>;

type ParserCamelType = 'CamelToDash' | 'CamelToPascal' | 'CamelToSnake' | 'CamelToUpperDash' | 'CamelToUpperSnake';
type ParserDashType = 'DashToCamel' | 'DashToPascal' | 'DashToSnake' | 'DashToUpperDash' | 'DashToUpperSnake';
type ParserPascalType = 'PascalToCamel' | 'PascalToDash' | 'PascalToSnake' | 'PascalToUpperDash' | 'PascalToUpperSnake';
type ParserSnakeType = 'SnakeToCamel' | 'SnakeToDash' | 'SnakeToPascal' | 'SnakeToUpperDash' | 'SnakeToUpperSnake';
type ParserUpperDashType = 'UpperDashToCamel' | 'UpperDashToDash' | 'UpperDashToPascal' | 'UpperDashToSnake' | 'UpperDashToUpperSnake';
type ParserUpperSnakeType = 'UpperSnakeToCamel' | 'UpperSnakeToDash' | 'UpperSnakeToPascal' | 'UpperSnakeToSnake' | 'UpperSnakeToUpperDash';
export type ParserType = ParserCamelType | ParserDashType | ParserPascalType | ParserSnakeType | ParserUpperDashType | ParserUpperSnakeType;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Result<T, P> =
  T extends string ? string :
  T extends Array<unknown> ? {
    [K in keyof T]: Result<T[K], P>
  }:
  T extends object ? Prettify<{
    [K in keyof T as
      P extends 'CamelToDash' ? CamelToDash<K & string> :
      P extends 'CamelToPascal' ? CamelToPascal<K & string> :
      P extends 'CamelToSnake' ? CamelToSnake<K & string> :
      P extends 'CamelToUpperDash' ? CamelToUpperDash<K & string> :
      P extends 'CamelToUpperSnake' ? CamelToUpperSnake<K & string> :
      P extends 'DashToCamel' ? DashToCamel<K & string> :
      P extends 'DashToPascal' ? DashToPascal<K & string> :
      P extends 'DashToSnake' ? DashToSnake<K & string> :
      P extends 'DashToUpperDash' ? DashToUpperDash<K & string> :
      P extends 'DashToUpperSnake' ? DashToUpperSnake<K & string> :
      P extends 'PascalToCamel' ? PascalToCamel<K & string> :
      P extends 'PascalToDash' ? PascalToDash<K & string> :
      P extends 'PascalToSnake' ? PascalToSnake<K & string> :
      P extends 'PascalToUpperDash' ? PascalToUpperDash<K & string> :
      P extends 'PascalToUpperSnake' ? PascalToUpperSnake<K & string> :
      P extends 'SnakeToCamel' ? SnakeToCamel<K & string> :
      P extends 'SnakeToDash' ? SnakeToDash<K & string> :
      P extends 'SnakeToPascal' ? SnakeToPascal<K & string> :
      P extends 'SnakeToUpperDash' ? SnakeToUpperDash<K & string> :
      P extends 'SnakeToUpperSnake' ? SnakeToUpperSnake<K & string> :
      P extends 'UpperDashToCamel' ? UpperDashToCamel<K & string> :
      P extends 'UpperDashToDash' ? UpperDashToDash<K & string> :
      P extends 'UpperDashToPascal' ? UpperDashToPascal<K & string> :
      P extends 'UpperDashToSnake' ? UpperDashToSnake<K & string> :
      P extends 'UpperDashToUpperSnake' ? UpperDashToUpperSnake<K & string> :
      P extends 'UpperSnakeToCamel' ? UpperSnakeToCamel<K & string> :
      P extends 'UpperSnakeToDash' ? UpperSnakeToDash<K & string> :
      P extends 'UpperSnakeToPascal' ? UpperSnakeToPascal<K & string> :
      P extends 'UpperSnakeToSnake' ? UpperSnakeToSnake<K & string> :
      P extends 'UpperSnakeToUpperDash' ? UpperSnakeToUpperDash<K & string> :
      never
    ]: Result<T[K], P>
  }> :
  T
;
