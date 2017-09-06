'use strict';

var snakeToCamel = function (data) {
  if (typeof data === 'string')
    return _convertString(data, 'snakeToCamel');
  return _convertObject(data, this['snakeToCamel']);
};

var camelToSnake = function (data) {
  if (typeof data === 'string')
    return _convertString(data, 'camelToSnake');
  return _convertObject(data, this['camelToSnake']);
};

var _convertString = function (str, type) {
  if (type === 'snakeToCamel') return str.replace(/(\_\w)/g, function (g) { return g[1].toUpperCase(); });
  if (type === 'camelToSnake') return str.replace(/([A-Z])/g, function (g) { return '_' + g[0].toLowerCase(); });
};

var _convertObject = function (data, fn) {
  if (_isArray(data)) {
    return data.map(function (dataItem) {
      return convertObjectKeys(dataItem, fn);
    });
  }
  return convertObjectKeys(data, fn);
};

var convertObjectKeys = function (data, fn) {
  var resultObject = {};
  for (var property in data) {
    if (_isArray(data[property]) || _isObject(data[property])) {
      resultObject[fn(property)] = _convertObject(data[property], fn);
    } else {
      resultObject[fn(property)] = data[property];
    }
  }
  return resultObject;
};

var _isObject = function (data) {
  return Object.prototype.toString.call(data) === '[object Object]';
};

var _isArray = function (data) {
  return Object.prototype.toString.call(data) === '[object Array]';
};

module.exports = {
  snakeToCamel: snakeToCamel,
  camelToSnake: camelToSnake
};
