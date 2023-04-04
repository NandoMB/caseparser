import { CaseParserInput, CaseParserOutput } from './types';
import * as camelCase from './camelCase';
import * as dashCase from './dashCase';
import * as pascalCase from './pascalCase';
import * as snakeCase from './snakeCase';
import * as upperDashCase from './upperDashCase';
import * as upperSnakeCase from './upperSnakeCase';

export { CaseParserInput, CaseParserOutput };

export default {
  ...camelCase,
  ...dashCase,
  ...pascalCase,
  ...snakeCase,
  ...upperDashCase,
  ...upperSnakeCase
};
