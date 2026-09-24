type CamelToDash<T extends string> = T extends `${infer L}${infer R}` ? `${L extends Capitalize<L> ? '-' : ''}${Lowercase<L>}${CamelToDash<R>}` : T;
type CamelToPascal<T extends string> = Capitalize<T>;
type CamelToSnake<T extends string> = T extends `${infer L}${infer R}` ? `${L extends Capitalize<L> ? '_' : ''}${Lowercase<L>}${CamelToSnake<R>}` : T;
type CamelToUpperDash<T extends string> = Uppercase<CamelToDash<T>>;
type CamelToUpperSnake<T extends string> = Uppercase<CamelToSnake<T>>;
type CamelToTrain<T extends string> = DashToTrain<CamelToDash<T>>;
type CamelToDot<T extends string> = DashToDot<CamelToDash<T>>;

type DashToCamel<T extends string> = T extends `${infer L}-${infer R}` ? `${L}${Capitalize<DashToCamel<R>>}` : T;
type DashToPascal<T extends string> = Capitalize<DashToCamel<T>>;
type DashToSnake<T extends string> = T extends `${infer L}-${infer R}` ? `${L}_${DashToSnake<R>}` : T;
type DashToUpperDash<T extends string> = Uppercase<T>;
type DashToUpperSnake<T extends string> = Uppercase<DashToSnake<T>>;
type DashToTrain<T extends string> = T extends `${infer L}-${infer R}` ? `${Capitalize<L>}-${DashToTrain<R>}` : Capitalize<T>;
type DashToDot<T extends string> = T extends `${infer L}-${infer R}` ? `${L}.${DashToDot<R>}` : T;

type PascalToCamel<T extends string> = Uncapitalize<T>;
type PascalToDash<T extends string> = CamelToDash<Uncapitalize<T>>;
type PascalToSnake<T extends string> = CamelToSnake<Uncapitalize<T>>;
type PascalToUpperDash<T extends string> = Uppercase<PascalToDash<T>>;
type PascalToUpperSnake<T extends string> = Uppercase<PascalToSnake<T>>;
type PascalToTrain<T extends string> = DashToTrain<PascalToDash<T>>;
type PascalToDot<T extends string> = DashToDot<PascalToDash<T>>;

type SnakeToCamel<T extends string> = T extends `${infer L}_${infer R}` ? `${L}${Capitalize<SnakeToCamel<R>>}` : T;
type SnakeToDash<T extends string> = T extends `${infer L}_${infer R}` ? `${L}-${SnakeToDash<R>}` : T;
type SnakeToPascal<T extends string> = Capitalize<SnakeToCamel<T>>
type SnakeToUpperDash<T extends string> = Uppercase<SnakeToDash<T>>;
type SnakeToUpperSnake<T extends string> = Uppercase<T>;
type SnakeToTrain<T extends string> = DashToTrain<SnakeToDash<T>>;
type SnakeToDot<T extends string> = DashToDot<SnakeToDash<T>>;

type UpperDashToCamel<T extends string> = DashToCamel<Lowercase<T>>;
type UpperDashToDash<T extends string> = Lowercase<T>;
type UpperDashToPascal<T extends string> = Capitalize<UpperDashToCamel<T>>;
type UpperDashToSnake<T extends string> = DashToSnake<UpperDashToDash<T>>;
type UpperDashToUpperSnake<T extends string> = Uppercase<UpperDashToSnake<T>>;
type UpperDashToTrain<T extends string> = DashToTrain<UpperDashToDash<T>>;
type UpperDashToDot<T extends string> = DashToDot<UpperDashToDash<T>>;

type UpperSnakeToCamel<T extends string> = SnakeToCamel<Lowercase<T>>;
type UpperSnakeToDash<T extends string> = SnakeToDash<Lowercase<T>>;
type UpperSnakeToPascal<T extends string> = SnakeToPascal<Lowercase<T>>;
type UpperSnakeToSnake<T extends string> = Lowercase<T>;
type UpperSnakeToUpperDash<T extends string> = Uppercase<UpperSnakeToDash<T>>;
type UpperSnakeToTrain<T extends string> = DashToTrain<UpperSnakeToDash<T>>;
type UpperSnakeToDot<T extends string> = DashToDot<UpperSnakeToDash<T>>;

type TrainToCamel<T extends string> = DashToCamel<TrainToDash<T>>;
type TrainToDash<T extends string> = Lowercase<T>;
type TrainToDot<T extends string> = DashToDot<TrainToDash<T>>;
type TrainToPascal<T extends string> = DashToPascal<TrainToDash<T>>;
type TrainToSnake<T extends string> = DashToSnake<TrainToDash<T>>;
type TrainToUpperDash<T extends string> = Uppercase<T>;
type TrainToUpperSnake<T extends string> = DashToUpperSnake<TrainToDash<T>>;

type DotToCamel<T extends string> = DashToCamel<DotToDash<T>>;
type DotToDash<T extends string> = T extends `${infer L}.${infer R}` ? `${L}-${DotToDash<R>}` : T;
type DotToPascal<T extends string> = DashToPascal<DotToDash<T>>;
type DotToSnake<T extends string> = DashToSnake<DotToDash<T>>;
type DotToTrain<T extends string> = DashToTrain<DotToDash<T>>;
type DotToUpperDash<T extends string> = Uppercase<DotToDash<T>>;
type DotToUpperSnake<T extends string> = DashToUpperSnake<DotToDash<T>>;

type ParserCamelType = 'CamelToDash' | 'CamelToPascal' | 'CamelToSnake' | 'CamelToUpperDash' | 'CamelToUpperSnake' | 'CamelToTrain' | 'CamelToDot';
type ParserDashType = 'DashToCamel' | 'DashToPascal' | 'DashToSnake' | 'DashToUpperDash' | 'DashToUpperSnake' | 'DashToTrain' | 'DashToDot';
type ParserPascalType = 'PascalToCamel' | 'PascalToDash' | 'PascalToSnake' | 'PascalToUpperDash' | 'PascalToUpperSnake' | 'PascalToTrain' | 'PascalToDot';
type ParserSnakeType = 'SnakeToCamel' | 'SnakeToDash' | 'SnakeToPascal' | 'SnakeToUpperDash' | 'SnakeToUpperSnake' | 'SnakeToTrain' | 'SnakeToDot';
type ParserUpperDashType = 'UpperDashToCamel' | 'UpperDashToDash' | 'UpperDashToPascal' | 'UpperDashToSnake' | 'UpperDashToUpperSnake' | 'UpperDashToTrain' | 'UpperDashToDot';
type ParserUpperSnakeType = 'UpperSnakeToCamel' | 'UpperSnakeToDash' | 'UpperSnakeToPascal' | 'UpperSnakeToSnake' | 'UpperSnakeToUpperDash' | 'UpperSnakeToTrain' | 'UpperSnakeToDot';
type ParserTrainType = 'TrainToCamel' | 'TrainToDash' | 'TrainToDot' | 'TrainToPascal' | 'TrainToSnake' | 'TrainToUpperDash' | 'TrainToUpperSnake';
type ParserDotType = 'DotToCamel' | 'DotToDash' | 'DotToPascal' | 'DotToSnake' | 'DotToTrain' | 'DotToUpperDash' | 'DotToUpperSnake';

/** Identifies a conversion, e.g. `'CamelToSnake'`. */
export type ParserType = ParserCamelType | ParserDashType | ParserPascalType | ParserSnakeType | ParserUpperDashType | ParserUpperSnakeType | ParserTrainType | ParserDotType;

/** Flattens an intersection/mapped type so editors show the resulting keys. */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * The type returned by a conversion: strings stay `string`, and object keys
 * (deeply, including inside arrays) are renamed according to the conversion `P`.
 */
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
      P extends 'CamelToTrain' ? CamelToTrain<K & string> :
      P extends 'CamelToDot' ? CamelToDot<K & string> :
      P extends 'PascalToTrain' ? PascalToTrain<K & string> :
      P extends 'PascalToDot' ? PascalToDot<K & string> :
      P extends 'SnakeToTrain' ? SnakeToTrain<K & string> :
      P extends 'SnakeToDot' ? SnakeToDot<K & string> :
      P extends 'DashToTrain' ? DashToTrain<K & string> :
      P extends 'DashToDot' ? DashToDot<K & string> :
      P extends 'UpperSnakeToTrain' ? UpperSnakeToTrain<K & string> :
      P extends 'UpperSnakeToDot' ? UpperSnakeToDot<K & string> :
      P extends 'UpperDashToTrain' ? UpperDashToTrain<K & string> :
      P extends 'UpperDashToDot' ? UpperDashToDot<K & string> :
      P extends 'TrainToCamel' ? TrainToCamel<K & string> :
      P extends 'TrainToPascal' ? TrainToPascal<K & string> :
      P extends 'TrainToSnake' ? TrainToSnake<K & string> :
      P extends 'TrainToDash' ? TrainToDash<K & string> :
      P extends 'TrainToUpperSnake' ? TrainToUpperSnake<K & string> :
      P extends 'TrainToUpperDash' ? TrainToUpperDash<K & string> :
      P extends 'TrainToDot' ? TrainToDot<K & string> :
      P extends 'DotToCamel' ? DotToCamel<K & string> :
      P extends 'DotToPascal' ? DotToPascal<K & string> :
      P extends 'DotToSnake' ? DotToSnake<K & string> :
      P extends 'DotToDash' ? DotToDash<K & string> :
      P extends 'DotToUpperSnake' ? DotToUpperSnake<K & string> :
      P extends 'DotToUpperDash' ? DotToUpperDash<K & string> :
      P extends 'DotToTrain' ? DotToTrain<K & string> :
      never
    ]: Result<T[K], P>
  }> :
  T
;
