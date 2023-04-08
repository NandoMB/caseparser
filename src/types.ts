export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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

export type OutputType<T, P> = Prettify<{
  [K in Extract<keyof T, string> as
    P extends 'CamelToDash' ? CamelToDash<K> :
    P extends 'CamelToPascal' ? CamelToPascal<K> :
    P extends 'CamelToSnake' ? CamelToSnake<K> :
    P extends 'CamelToUpperDash' ? CamelToUpperDash<K> :
    P extends 'CamelToUpperSnake' ? CamelToUpperSnake<K> :
    P extends 'DashToCamel' ? DashToCamel<K> :
    P extends 'DashToPascal' ? DashToPascal<K> :
    P extends 'DashToSnake' ? DashToSnake<K> :
    P extends 'DashToUpperDash' ? DashToUpperDash<K> :
    P extends 'DashToUpperSnake' ? DashToUpperSnake<K> :
    P extends 'PascalToCamel' ? PascalToCamel<K> :
    P extends 'PascalToDash' ? PascalToDash<K> :
    P extends 'PascalToSnake' ? PascalToSnake<K> :
    P extends 'PascalToUpperDash' ? PascalToUpperDash<K> :
    P extends 'PascalToUpperSnake' ? PascalToUpperSnake<K> :
    P extends 'SnakeToCamel' ? SnakeToCamel<K> :
    P extends 'SnakeToDash' ? SnakeToDash<K> :
    P extends 'SnakeToPascal' ? SnakeToPascal<K> :
    P extends 'SnakeToUpperDash' ? SnakeToUpperDash<K> :
    P extends 'SnakeToUpperSnake' ? SnakeToUpperSnake<K> :
    P extends 'UpperDashToCamel' ? UpperDashToCamel<K> :
    P extends 'UpperDashToDash' ? UpperDashToDash<K> :
    P extends 'UpperDashToPascal' ? UpperDashToPascal<K> :
    P extends 'UpperDashToSnake' ? UpperDashToSnake<K> :
    P extends 'UpperDashToUpperSnake' ? UpperDashToUpperSnake<K> :
    P extends 'UpperSnakeToCamel' ? UpperSnakeToCamel<K> :
    P extends 'UpperSnakeToDash' ? UpperSnakeToDash<K> :
    P extends 'UpperSnakeToPascal' ? UpperSnakeToPascal<K> :
    P extends 'UpperSnakeToSnake' ? UpperSnakeToSnake<K> :
    P extends 'UpperSnakeToUpperDash' ? UpperSnakeToUpperDash<K> :
    never
  ]: T[K]
}>;
