import { Capitalize, Uppercase, Uncapitalize, Lowercase } from '../utils';

const CamelToDash = (str: string) => str.replace(/([A-Z])/g, (g) => '-' + g[0].toLowerCase());
const CamelToPascal = (str: string) => Capitalize(str);
const CamelToSnake = (str: string) => str.replace(/([A-Z])/g, (g) => '_' + g[0].toLowerCase());
const CamelToUpperDash = (str: string) => Uppercase(CamelToDash(str));
const CamelToUpperSnake = (str: string) => Uppercase(CamelToSnake(str));

const DashToCamel = (str: string) => str.replace(/(\-\w)/g, (g) => g[1].toUpperCase());
const DashToPascal = (str: string) => Capitalize(DashToCamel(str));
const DashToSnake = (str: string) => str.replace(/(\-)/g, '_');
const DashToUpperDash = (str: string) => Uppercase(str);
const DashToUpperSnake = (str: string) => Uppercase(DashToSnake(str));

const PascalToCamel = (str: string) => Uncapitalize(str);
const PascalToDash = (str: string) => CamelToDash(Uncapitalize(str));
const PascalToSnake = (str: string) => CamelToSnake(Uncapitalize(str));
const PascalToUpperDash = (str: string) => Uppercase(PascalToDash(str));
const PascalToUpperSnake = (str: string) => Uppercase(PascalToSnake(str));

const SnakeToCamel = (str: string) => str.replace(/(\_\w)/g, (g) => g[1].toUpperCase());
const SnakeToDash = (str: string) => str.replace(/(\_)/g, '-');
const SnakeToPascal = (str: string) => Capitalize(SnakeToCamel(str));
const SnakeToUpperDash = (str: string) => Uppercase(SnakeToDash(str));
const SnakeToUpperSnake = (str: string) => Uppercase(str);

const UpperDashToCamel = (str: string) => DashToCamel(Lowercase(str));
const UpperDashToDash = (str: string) => Lowercase(str);
const UpperDashToPascal = (str: string) => Capitalize(UpperDashToCamel(str));
const UpperDashToSnake = (str: string) => DashToSnake(UpperDashToDash(str));
const UpperDashToUpperSnake = (str: string) => Uppercase(UpperDashToSnake(str));

const UpperSnakeToCamel = (str: string) => SnakeToCamel(Lowercase(str));
const UpperSnakeToDash = (str: string) => str.replace(/(\_)/g, '-').toLowerCase();
const UpperSnakeToPascal = (str: string) => SnakeToPascal(Lowercase(str));
const UpperSnakeToSnake = (str: string) => Lowercase(str);
const UpperSnakeToUpperDash = (str: string) => Uppercase(UpperSnakeToDash(str));

export default {
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
  UpperDashToUpperSnake
};
