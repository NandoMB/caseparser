import { ConversionType, StringParser, Parser, CaseParserInput, JsonArray, JsonObject, JsonValue } from '../types';
import { isArray, isObject } from '../utils';


const STRING_PARSER: StringParser = {
  camelToSnake: (str: string) => str.replace(/([A-Z])/g, (g) => '_' + g[0].toLowerCase()),
  camelToDash: (str: string) => str.replace(/([A-Z])/g, (g) => '-' + g[0].toLowerCase()),
  camelToPascal: (str: string) => str.replace(/(^\w)/g, (g) => g[0].toUpperCase()),
  camelToUpperSnake: (str: string) => str.replace(/([A-Z])/g, (g) => '_' + g[0]).toUpperCase(),
  camelToUpperDash: (str: string) => str.replace(/([A-Z])/g, (g) => '-' + g[0]).toUpperCase(),
  dashToCamel: (str: string) => str.replace(/(\-\w)/g, (g) => g[1].toUpperCase()),
  dashToSnake: (str: string) => str.replace(/(\-)/g, '_'),
  dashToPascal: (str: string) => str.replace(/(^\w)|(\-\w)/g, (g) => g[0] !== '-' ? g[0].toUpperCase() : g[1].toUpperCase()),
  dashToUpperSnake: (str: string) => str.replace(/(\-)/g, (g) => '_').toUpperCase(),
  dashToUpperDash: (str: string) => str.toUpperCase(),
  pascalToCamel: (str: string) => str.replace(/(^[A-Z])/g, (g) => g[0].toLowerCase()),
  pascalToSnake: (str: string) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? '_' + g[0].toLowerCase() : '').toLowerCase(),
  pascalToDash: (str: string) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? '-' + g[0].toLowerCase() : '').toLowerCase(),
  pascalToUpperSnake: (str: string) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? '_' + g[0] : '').toUpperCase(),
  pascalToUpperDash: (str: string) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? '-' + g[0] : '').toUpperCase(),
  snakeToCamel: (str: string) => str.replace(/(\_\w)/g, (g) => g[1].toUpperCase()),
  snakeToDash: (str: string) => str.replace(/(\_)/g, '-'),
  snakeToPascal: (str: string) => str.replace(/(^\w)|(\_\w)/g, (g) => g[0] !== '_' ? g[0].toUpperCase() : g[1].toUpperCase()),
  snakeToUpperSnake: (str: string) => str.toUpperCase(),
  snakeToUpperDash: (str: string) => str.replace(/(\_)/g, '-').toUpperCase(),
  upperSnakeToCamel: (str: string) => convertStringKey(str.toLowerCase(), 'snakeToCamel'),
  upperSnakeToSnake: (str: string) => str.toLowerCase(),
  upperSnakeToDash: (str: string) => convertStringKey(str.toLowerCase(), 'snakeToDash'),
  upperSnakeToPascal: (str: string) => convertStringKey(str.toLowerCase(), 'snakeToPascal'),
  upperSnakeToUpperDash: (str: string) => str.replace(/(\_)/g, '-'),
  upperDashToCamel: (str: string) => convertStringKey(str.toLowerCase(), 'dashToCamel'),
  upperDashToSnake: (str: string) => convertStringKey(str.toLowerCase(), 'dashToSnake'),
  upperDashToDash: (str: string) => str.toLowerCase(),
  upperDashToPascal: (str: string) => convertStringKey(str.toLowerCase(), 'dashToPascal'),
  upperDashToUpperSnake: (str: string) => str.replace(/(\-)/g, '_')
};

export function convertStringKey(str: string, type: ConversionType) {
  return STRING_PARSER[type](str);
}

export function convertJson(data: CaseParserInput, parser: Parser) {
  return isArray(data) ? convertJsonArray(data as JsonArray, parser) : convertObjectKeys(data, parser);
}

function convertJsonArray(data: JsonArray, parser: Parser): JsonArray {
  return data.map(item => (isArray(item) || isObject(item)) ? convertObjectKeys(item, parser) : item) || [];
}

function convertObjectKeys(data: any, parser: Parser) {
  const resultObject: JsonObject = {};
  for (const property in data) {
    const element = data[property] as CaseParserInput;
    const key = parser(property) as string;
    resultObject[key] = (isArray(element) || isObject(element)) ? convertJson(element, parser) : resultObject[key] = element;
  }
  return resultObject;
};


