var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/camelCase/index.ts
var camelCase_exports = {};
__export(camelCase_exports, {
  camelToDash: () => camelToDash,
  camelToPascal: () => camelToPascal,
  camelToSnake: () => camelToSnake,
  camelToUpperDash: () => camelToUpperDash,
  camelToUpperSnake: () => camelToUpperSnake
});

// src/utils.ts
function isString(data) {
  return typeof data === "string";
}
function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}
function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
}

// src/parser/parser.ts
var STRING_PARSER = {
  camelToSnake: (str) => str.replace(/([A-Z])/g, (g) => "_" + g[0].toLowerCase()),
  camelToDash: (str) => str.replace(/([A-Z])/g, (g) => "-" + g[0].toLowerCase()),
  camelToPascal: (str) => str.replace(/(^\w)/g, (g) => g[0].toUpperCase()),
  camelToUpperSnake: (str) => str.replace(/([A-Z])/g, (g) => "_" + g[0]).toUpperCase(),
  camelToUpperDash: (str) => str.replace(/([A-Z])/g, (g) => "-" + g[0]).toUpperCase(),
  dashToCamel: (str) => str.replace(/(\-\w)/g, (g) => g[1].toUpperCase()),
  dashToSnake: (str) => str.replace(/(\-)/g, "_"),
  dashToPascal: (str) => str.replace(/(^\w)|(\-\w)/g, (g) => g[0] !== "-" ? g[0].toUpperCase() : g[1].toUpperCase()),
  dashToUpperSnake: (str) => str.replace(/(\-)/g, (g) => "_").toUpperCase(),
  dashToUpperDash: (str) => str.toUpperCase(),
  pascalToCamel: (str) => str.replace(/(^[A-Z])/g, (g) => g[0].toLowerCase()),
  pascalToSnake: (str) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? "_" + g[0].toLowerCase() : "").toLowerCase(),
  pascalToDash: (str) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? "-" + g[0].toLowerCase() : "").toLowerCase(),
  pascalToUpperSnake: (str) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? "_" + g[0] : "").toUpperCase(),
  pascalToUpperDash: (str) => str.replace(/(?=^[A-Z])|([A-Z])/g, (g) => g[0] ? "-" + g[0] : "").toUpperCase(),
  snakeToCamel: (str) => str.replace(/(\_\w)/g, (g) => g[1].toUpperCase()),
  snakeToDash: (str) => str.replace(/(\_)/g, "-"),
  snakeToPascal: (str) => str.replace(/(^\w)|(\_\w)/g, (g) => g[0] !== "_" ? g[0].toUpperCase() : g[1].toUpperCase()),
  snakeToUpperSnake: (str) => str.toUpperCase(),
  snakeToUpperDash: (str) => str.replace(/(\_)/g, "-").toUpperCase(),
  upperSnakeToCamel: (str) => convertStringKey(str.toLowerCase(), "snakeToCamel"),
  upperSnakeToSnake: (str) => str.toLowerCase(),
  upperSnakeToDash: (str) => convertStringKey(str.toLowerCase(), "snakeToDash"),
  upperSnakeToPascal: (str) => convertStringKey(str.toLowerCase(), "snakeToPascal"),
  upperSnakeToUpperDash: (str) => str.replace(/(\_)/g, "-"),
  upperDashToCamel: (str) => convertStringKey(str.toLowerCase(), "dashToCamel"),
  upperDashToSnake: (str) => convertStringKey(str.toLowerCase(), "dashToSnake"),
  upperDashToDash: (str) => str.toLowerCase(),
  upperDashToPascal: (str) => convertStringKey(str.toLowerCase(), "dashToPascal"),
  upperDashToUpperSnake: (str) => str.replace(/(\-)/g, "_")
};
function convertStringKey(str, type) {
  return STRING_PARSER[type](str);
}
function convertJson(data, parser) {
  return isArray(data) ? convertJsonArray(data, parser) : convertObjectKeys(data, parser);
}
function convertJsonArray(data, parser) {
  return data.map((item) => isArray(item) || isObject(item) ? convertObjectKeys(item, parser) : item) || [];
}
function convertObjectKeys(data, parser) {
  const resultObject = {};
  for (const property in data) {
    const element = data[property];
    const key = parser(property);
    resultObject[key] = isArray(element) || isObject(element) ? convertJson(element, parser) : resultObject[key] = element;
  }
  return resultObject;
}

// src/camelCase/camelCase.ts
function camelToDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "camelToDash");
  return convertJson(input, camelToDash);
}
function camelToSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "camelToSnake");
  return convertJson(input, camelToSnake);
}
function camelToPascal(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "camelToPascal");
  return convertJson(input, camelToPascal);
}
function camelToUpperSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "camelToUpperSnake");
  return convertJson(input, camelToUpperSnake);
}
function camelToUpperDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "camelToUpperDash");
  return convertJson(input, camelToUpperDash);
}

// src/dashCase/index.ts
var dashCase_exports = {};
__export(dashCase_exports, {
  dashToCamel: () => dashToCamel,
  dashToPascal: () => dashToPascal,
  dashToSnake: () => dashToSnake,
  dashToUpperDash: () => dashToUpperDash,
  dashToUpperSnake: () => dashToUpperSnake
});

// src/dashCase/dashCase.ts
function dashToSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "dashToSnake");
  return convertJson(input, dashToSnake);
}
function dashToCamel(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "dashToCamel");
  return convertJson(input, dashToCamel);
}
function dashToPascal(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "dashToPascal");
  return convertJson(input, dashToPascal);
}
function dashToUpperSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "dashToUpperSnake");
  return convertJson(input, dashToUpperSnake);
}
function dashToUpperDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "dashToUpperDash");
  return convertJson(input, dashToUpperDash);
}

// src/pascalCase/index.ts
var pascalCase_exports = {};
__export(pascalCase_exports, {
  pascalToCamel: () => pascalToCamel,
  pascalToDash: () => pascalToDash,
  pascalToSnake: () => pascalToSnake,
  pascalToUpperDash: () => pascalToUpperDash,
  pascalToUpperSnake: () => pascalToUpperSnake
});

// src/pascalCase/pascalCase.ts
function pascalToCamel(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "pascalToCamel");
  return convertJson(input, pascalToCamel);
}
function pascalToSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "pascalToSnake");
  return convertJson(input, pascalToSnake);
}
function pascalToDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "pascalToDash");
  return convertJson(input, pascalToDash);
}
function pascalToUpperSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "pascalToUpperSnake");
  return convertJson(input, pascalToUpperSnake);
}
function pascalToUpperDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "pascalToUpperDash");
  return convertJson(input, pascalToUpperDash);
}

// src/snakeCase/index.ts
var snakeCase_exports = {};
__export(snakeCase_exports, {
  snakeToCamel: () => snakeToCamel,
  snakeToDash: () => snakeToDash,
  snakeToPascal: () => snakeToPascal,
  snakeToUpperDash: () => snakeToUpperDash,
  snakeToUpperSnake: () => snakeToUpperSnake
});

// src/snakeCase/snakeCase.ts
function snakeToCamel(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "snakeToCamel");
  return convertJson(input, snakeToCamel);
}
function snakeToDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "snakeToDash");
  return convertJson(input, snakeToDash);
}
function snakeToPascal(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "snakeToPascal");
  return convertJson(input, snakeToPascal);
}
function snakeToUpperSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "snakeToUpperSnake");
  return convertJson(input, snakeToUpperSnake);
}
function snakeToUpperDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "snakeToUpperDash");
  return convertJson(input, snakeToUpperDash);
}

// src/upperDashCase/index.ts
var upperDashCase_exports = {};
__export(upperDashCase_exports, {
  upperDashToCamel: () => upperDashToCamel,
  upperDashToDash: () => upperDashToDash,
  upperDashToPascal: () => upperDashToPascal,
  upperDashToSnake: () => upperDashToSnake,
  upperDashToUpperSnake: () => upperDashToUpperSnake
});

// src/upperDashCase/upperDashCase.ts
function upperDashToCamel(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperDashToCamel");
  return convertJson(input, upperDashToCamel);
}
function upperDashToSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperDashToSnake");
  return convertJson(input, upperDashToSnake);
}
function upperDashToDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperDashToDash");
  return convertJson(input, upperDashToDash);
}
function upperDashToPascal(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperDashToPascal");
  return convertJson(input, upperDashToPascal);
}
function upperDashToUpperSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperDashToUpperSnake");
  return convertJson(input, upperDashToUpperSnake);
}

// src/upperSnakeCase/index.ts
var upperSnakeCase_exports = {};
__export(upperSnakeCase_exports, {
  upperSnakeToCamel: () => upperSnakeToCamel,
  upperSnakeToDash: () => upperSnakeToDash,
  upperSnakeToPascal: () => upperSnakeToPascal,
  upperSnakeToSnake: () => upperSnakeToSnake,
  upperSnakeToUpperDash: () => upperSnakeToUpperDash
});

// src/upperSnakeCase/upperSnakeCase.ts
function upperSnakeToCamel(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperSnakeToCamel");
  return convertJson(input, upperSnakeToCamel);
}
function upperSnakeToSnake(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperSnakeToSnake");
  return convertJson(input, upperSnakeToSnake);
}
function upperSnakeToDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperSnakeToDash");
  return convertJson(input, upperSnakeToDash);
}
function upperSnakeToPascal(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperSnakeToPascal");
  return convertJson(input, upperSnakeToPascal);
}
function upperSnakeToUpperDash(input) {
  if (input === null || input === void 0)
    return null;
  if (isString(input))
    return convertStringKey(input, "upperSnakeToUpperDash");
  return convertJson(input, upperSnakeToUpperDash);
}

// src/index.ts
var src_default = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, camelCase_exports), dashCase_exports), pascalCase_exports), snakeCase_exports), upperDashCase_exports), upperSnakeCase_exports);
export {
  src_default as default
};
