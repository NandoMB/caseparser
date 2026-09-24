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

type DashToWords<T extends string> = T extends `${infer L}-${infer R}` ? `${L} ${DashToWords<R>}` : T;
type WordsToDash<T extends string> = T extends `${infer L} ${infer R}` ? `${L}-${WordsToDash<R>}` : T;

type DashToTitle<T extends string> = T extends `${infer L}-${infer R}` ? `${Capitalize<L>} ${DashToTitle<R>}` : Capitalize<T>;
type DashToSentence<T extends string> = Capitalize<DashToWords<T>>;
type CamelToTitle<T extends string> = DashToTitle<CamelToDash<T>>;
type CamelToSentence<T extends string> = DashToSentence<CamelToDash<T>>;
type PascalToTitle<T extends string> = DashToTitle<PascalToDash<T>>;
type PascalToSentence<T extends string> = DashToSentence<PascalToDash<T>>;
type SnakeToTitle<T extends string> = DashToTitle<SnakeToDash<T>>;
type SnakeToSentence<T extends string> = DashToSentence<SnakeToDash<T>>;
type UpperSnakeToTitle<T extends string> = DashToTitle<UpperSnakeToDash<T>>;
type UpperSnakeToSentence<T extends string> = DashToSentence<UpperSnakeToDash<T>>;
type UpperDashToTitle<T extends string> = DashToTitle<UpperDashToDash<T>>;
type UpperDashToSentence<T extends string> = DashToSentence<UpperDashToDash<T>>;
type TrainToTitle<T extends string> = DashToTitle<TrainToDash<T>>;
type TrainToSentence<T extends string> = DashToSentence<TrainToDash<T>>;
type DotToTitle<T extends string> = DashToTitle<DotToDash<T>>;
type DotToSentence<T extends string> = DashToSentence<DotToDash<T>>;

type TitleToDash<T extends string> = WordsToDash<Lowercase<T>>;
type TitleToCamel<T extends string> = DashToCamel<TitleToDash<T>>;
type TitleToPascal<T extends string> = DashToPascal<TitleToDash<T>>;
type TitleToSnake<T extends string> = DashToSnake<TitleToDash<T>>;
type TitleToUpperSnake<T extends string> = DashToUpperSnake<TitleToDash<T>>;
type TitleToUpperDash<T extends string> = DashToUpperDash<TitleToDash<T>>;
type TitleToTrain<T extends string> = DashToTrain<TitleToDash<T>>;
type TitleToDot<T extends string> = DashToDot<TitleToDash<T>>;
type TitleToSentence<T extends string> = DashToSentence<TitleToDash<T>>;

type SentenceToDash<T extends string> = WordsToDash<Lowercase<T>>;
type SentenceToCamel<T extends string> = DashToCamel<SentenceToDash<T>>;
type SentenceToPascal<T extends string> = DashToPascal<SentenceToDash<T>>;
type SentenceToSnake<T extends string> = DashToSnake<SentenceToDash<T>>;
type SentenceToUpperSnake<T extends string> = DashToUpperSnake<SentenceToDash<T>>;
type SentenceToUpperDash<T extends string> = DashToUpperDash<SentenceToDash<T>>;
type SentenceToTrain<T extends string> = DashToTrain<SentenceToDash<T>>;
type SentenceToDot<T extends string> = DashToDot<SentenceToDash<T>>;
type SentenceToTitle<T extends string> = DashToTitle<SentenceToDash<T>>;

type ParserCamelType = 'CamelToDash' | 'CamelToPascal' | 'CamelToSnake' | 'CamelToUpperDash' | 'CamelToUpperSnake' | 'CamelToTrain' | 'CamelToDot' | 'CamelToTitle' | 'CamelToSentence';
type ParserDashType = 'DashToCamel' | 'DashToPascal' | 'DashToSnake' | 'DashToUpperDash' | 'DashToUpperSnake' | 'DashToTrain' | 'DashToDot' | 'DashToTitle' | 'DashToSentence';
type ParserPascalType = 'PascalToCamel' | 'PascalToDash' | 'PascalToSnake' | 'PascalToUpperDash' | 'PascalToUpperSnake' | 'PascalToTrain' | 'PascalToDot' | 'PascalToTitle' | 'PascalToSentence';
type ParserSnakeType = 'SnakeToCamel' | 'SnakeToDash' | 'SnakeToPascal' | 'SnakeToUpperDash' | 'SnakeToUpperSnake' | 'SnakeToTrain' | 'SnakeToDot' | 'SnakeToTitle' | 'SnakeToSentence';
type ParserUpperDashType = 'UpperDashToCamel' | 'UpperDashToDash' | 'UpperDashToPascal' | 'UpperDashToSnake' | 'UpperDashToUpperSnake' | 'UpperDashToTrain' | 'UpperDashToDot' | 'UpperDashToTitle' | 'UpperDashToSentence';
type ParserUpperSnakeType = 'UpperSnakeToCamel' | 'UpperSnakeToDash' | 'UpperSnakeToPascal' | 'UpperSnakeToSnake' | 'UpperSnakeToUpperDash' | 'UpperSnakeToTrain' | 'UpperSnakeToDot' | 'UpperSnakeToTitle' | 'UpperSnakeToSentence';
type ParserTrainType = 'TrainToCamel' | 'TrainToDash' | 'TrainToDot' | 'TrainToPascal' | 'TrainToSnake' | 'TrainToUpperDash' | 'TrainToUpperSnake' | 'TrainToTitle' | 'TrainToSentence';
type ParserDotType = 'DotToCamel' | 'DotToDash' | 'DotToPascal' | 'DotToSnake' | 'DotToTrain' | 'DotToUpperDash' | 'DotToUpperSnake' | 'DotToTitle' | 'DotToSentence';
type ParserTitleType = 'TitleToCamel' | 'TitleToPascal' | 'TitleToSnake' | 'TitleToDash' | 'TitleToUpperSnake' | 'TitleToUpperDash' | 'TitleToTrain' | 'TitleToDot' | 'TitleToSentence';
type ParserSentenceType = 'SentenceToCamel' | 'SentenceToPascal' | 'SentenceToSnake' | 'SentenceToDash' | 'SentenceToUpperSnake' | 'SentenceToUpperDash' | 'SentenceToTrain' | 'SentenceToDot' | 'SentenceToTitle';

/** Identifies a conversion, e.g. `'CamelToSnake'`. */
export type ParserType = ParserCamelType | ParserDashType | ParserPascalType | ParserSnakeType | ParserUpperDashType | ParserUpperSnakeType | ParserTrainType | ParserDotType | ParserTitleType | ParserSentenceType;

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
      P extends 'CamelToTitle' ? CamelToTitle<K & string> :
      P extends 'CamelToSentence' ? CamelToSentence<K & string> :
      P extends 'PascalToTitle' ? PascalToTitle<K & string> :
      P extends 'PascalToSentence' ? PascalToSentence<K & string> :
      P extends 'SnakeToTitle' ? SnakeToTitle<K & string> :
      P extends 'SnakeToSentence' ? SnakeToSentence<K & string> :
      P extends 'DashToTitle' ? DashToTitle<K & string> :
      P extends 'DashToSentence' ? DashToSentence<K & string> :
      P extends 'UpperSnakeToTitle' ? UpperSnakeToTitle<K & string> :
      P extends 'UpperSnakeToSentence' ? UpperSnakeToSentence<K & string> :
      P extends 'UpperDashToTitle' ? UpperDashToTitle<K & string> :
      P extends 'UpperDashToSentence' ? UpperDashToSentence<K & string> :
      P extends 'TrainToTitle' ? TrainToTitle<K & string> :
      P extends 'TrainToSentence' ? TrainToSentence<K & string> :
      P extends 'DotToTitle' ? DotToTitle<K & string> :
      P extends 'DotToSentence' ? DotToSentence<K & string> :
      P extends 'TitleToCamel' ? TitleToCamel<K & string> :
      P extends 'TitleToPascal' ? TitleToPascal<K & string> :
      P extends 'TitleToSnake' ? TitleToSnake<K & string> :
      P extends 'TitleToDash' ? TitleToDash<K & string> :
      P extends 'TitleToUpperSnake' ? TitleToUpperSnake<K & string> :
      P extends 'TitleToUpperDash' ? TitleToUpperDash<K & string> :
      P extends 'TitleToTrain' ? TitleToTrain<K & string> :
      P extends 'TitleToDot' ? TitleToDot<K & string> :
      P extends 'TitleToSentence' ? TitleToSentence<K & string> :
      P extends 'SentenceToCamel' ? SentenceToCamel<K & string> :
      P extends 'SentenceToPascal' ? SentenceToPascal<K & string> :
      P extends 'SentenceToSnake' ? SentenceToSnake<K & string> :
      P extends 'SentenceToDash' ? SentenceToDash<K & string> :
      P extends 'SentenceToUpperSnake' ? SentenceToUpperSnake<K & string> :
      P extends 'SentenceToUpperDash' ? SentenceToUpperDash<K & string> :
      P extends 'SentenceToTrain' ? SentenceToTrain<K & string> :
      P extends 'SentenceToDot' ? SentenceToDot<K & string> :
      P extends 'SentenceToTitle' ? SentenceToTitle<K & string> :
      never
    ]: Result<T[K], P>
  }> :
  T
;
