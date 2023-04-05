type JsonValue = boolean | number | string | null | JsonObject | JsonArray;
type JsonObject = {
    [key: string]: JsonValue;
};
type JsonArray = JsonValue[];
type Json = JsonObject | JsonArray;
type CaseParserInput = string | Json;
type CaseParserOutput = string | Json;

declare const _default: {
    upperSnakeToCamel(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperSnakeToSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperSnakeToDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperSnakeToPascal(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperSnakeToUpperDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperDashToCamel(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperDashToSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperDashToDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperDashToPascal(input: CaseParserInput): string | JsonObject | JsonArray | null;
    upperDashToUpperSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    snakeToCamel(input: CaseParserInput): string | JsonObject | JsonArray | null;
    snakeToDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    snakeToPascal(input: CaseParserInput): string | JsonObject | JsonArray | null;
    snakeToUpperSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    snakeToUpperDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    pascalToCamel(input: CaseParserInput): string | JsonObject | JsonArray | null;
    pascalToSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    pascalToDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    pascalToUpperSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    pascalToUpperDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    dashToSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    dashToCamel(input: CaseParserInput): string | JsonObject | JsonArray | null;
    dashToPascal(input: CaseParserInput): string | JsonObject | JsonArray | null;
    dashToUpperSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    dashToUpperDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    camelToDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
    camelToSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    camelToPascal(input: CaseParserInput): string | JsonObject | JsonArray | null;
    camelToUpperSnake(input: CaseParserInput): string | JsonObject | JsonArray | null;
    camelToUpperDash(input: CaseParserInput): string | JsonObject | JsonArray | null;
};

export { CaseParserInput, CaseParserOutput, _default as default };
