import type { ParserType } from '../types.ts';
import { Capitalize, Uppercase, Uncapitalize, Lowercase } from '../utils.ts';

const CamelToDash = (str: string) => str.replace(/([A-Z])/g, (g) => '-' + g[0].toLowerCase());
const CamelToPascal = (str: string) => Capitalize(str);
const CamelToSnake = (str: string) => str.replace(/([A-Z])/g, (g) => '_' + g[0].toLowerCase());
const CamelToUpperDash = (str: string) => Uppercase(CamelToDash(str));
const CamelToUpperSnake = (str: string) => Uppercase(CamelToSnake(str));
const CamelToTrain = (str: string) => DashToTrain(CamelToDash(str));
const CamelToDot = (str: string) => DashToDot(CamelToDash(str));

const DashToCamel = (str: string) => str.replace(/(\-\w)/g, (g) => g[1].toUpperCase());
const DashToPascal = (str: string) => Capitalize(DashToCamel(str));
const DashToSnake = (str: string) => str.replace(/(\-)/g, '_');
const DashToUpperDash = (str: string) => Uppercase(str);
const DashToUpperSnake = (str: string) => Uppercase(DashToSnake(str));
const DashToTrain = (str: string) => str.split('-').map(Capitalize).join('-');
const DashToDot = (str: string) => str.replace(/(\-)/g, '.');

const PascalToCamel = (str: string) => Uncapitalize(str);
const PascalToDash = (str: string) => CamelToDash(Uncapitalize(str));
const PascalToSnake = (str: string) => CamelToSnake(Uncapitalize(str));
const PascalToUpperDash = (str: string) => Uppercase(PascalToDash(str));
const PascalToUpperSnake = (str: string) => Uppercase(PascalToSnake(str));
const PascalToTrain = (str: string) => DashToTrain(PascalToDash(str));
const PascalToDot = (str: string) => DashToDot(PascalToDash(str));

const SnakeToCamel = (str: string) => str.replace(/(\_\w)/g, (g) => g[1].toUpperCase());
const SnakeToDash = (str: string) => str.replace(/(\_)/g, '-');
const SnakeToPascal = (str: string) => Capitalize(SnakeToCamel(str));
const SnakeToUpperDash = (str: string) => Uppercase(SnakeToDash(str));
const SnakeToTrain = (str: string) => DashToTrain(SnakeToDash(str));
const SnakeToDot = (str: string) => DashToDot(SnakeToDash(str));
const SnakeToUpperSnake = (str: string) => Uppercase(str);

const UpperDashToCamel = (str: string) => DashToCamel(Lowercase(str));
const UpperDashToDash = (str: string) => Lowercase(str);
const UpperDashToPascal = (str: string) => Capitalize(UpperDashToCamel(str));
const UpperDashToSnake = (str: string) => DashToSnake(UpperDashToDash(str));
const UpperDashToUpperSnake = (str: string) => Uppercase(UpperDashToSnake(str));
const UpperDashToTrain = (str: string) => DashToTrain(UpperDashToDash(str));
const UpperDashToDot = (str: string) => DashToDot(UpperDashToDash(str));

const UpperSnakeToCamel = (str: string) => SnakeToCamel(Lowercase(str));
const UpperSnakeToDash = (str: string) => str.replace(/(\_)/g, '-').toLowerCase();
const UpperSnakeToPascal = (str: string) => SnakeToPascal(Lowercase(str));
const UpperSnakeToSnake = (str: string) => Lowercase(str);
const UpperSnakeToUpperDash = (str: string) => Uppercase(UpperSnakeToDash(str));
const UpperSnakeToTrain = (str: string) => DashToTrain(UpperSnakeToDash(str));
const UpperSnakeToDot = (str: string) => DashToDot(UpperSnakeToDash(str));

const TrainToCamel = (str: string) => DashToCamel(TrainToDash(str));
const TrainToDash = (str: string) => Lowercase(str);
const TrainToDot = (str: string) => DashToDot(TrainToDash(str));
const TrainToPascal = (str: string) => DashToPascal(TrainToDash(str));
const TrainToSnake = (str: string) => DashToSnake(TrainToDash(str));
const TrainToUpperDash = (str: string) => Uppercase(str);
const TrainToUpperSnake = (str: string) => DashToUpperSnake(TrainToDash(str));

const DotToCamel = (str: string) => DashToCamel(DotToDash(str));
const DotToDash = (str: string) => str.replace(/(\.)/g, '-');
const DotToPascal = (str: string) => DashToPascal(DotToDash(str));
const DotToSnake = (str: string) => DashToSnake(DotToDash(str));
const DotToTrain = (str: string) => DashToTrain(DotToDash(str));
const DotToUpperDash = (str: string) => Uppercase(DotToDash(str));
const DotToUpperSnake = (str: string) => DashToUpperSnake(DotToDash(str));


export default function parse(input: string, type: ParserType): string {
  return {
    CamelToDash,
    CamelToPascal,
    CamelToSnake,
    CamelToUpperDash,
    CamelToUpperSnake,
    DashToCamel,
    DashToSnake,
    DashToPascal,
    DashToUpperSnake,
    DashToUpperDash,
    PascalToCamel,
    PascalToSnake,
    PascalToDash,
    PascalToUpperSnake,
    PascalToUpperDash,
    SnakeToCamel,
    SnakeToDash,
    SnakeToPascal,
    SnakeToUpperSnake,
    SnakeToUpperDash,
    UpperSnakeToCamel,
    UpperSnakeToSnake,
    UpperSnakeToDash,
    UpperSnakeToPascal,
    UpperSnakeToUpperDash,
    UpperDashToCamel,
    UpperDashToSnake,
    UpperDashToDash,
    UpperDashToPascal,
    UpperDashToUpperSnake,
    CamelToTrain,
    CamelToDot,
    PascalToTrain,
    PascalToDot,
    SnakeToTrain,
    SnakeToDot,
    DashToTrain,
    DashToDot,
    UpperSnakeToTrain,
    UpperSnakeToDot,
    UpperDashToTrain,
    UpperDashToDot,
    TrainToCamel,
    TrainToPascal,
    TrainToSnake,
    TrainToDash,
    TrainToUpperSnake,
    TrainToUpperDash,
    TrainToDot,
    DotToCamel,
    DotToPascal,
    DotToSnake,
    DotToDash,
    DotToUpperSnake,
    DotToUpperDash,
    DotToTrain
  }[type](input);
}
