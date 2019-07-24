'use strict';

//
// Camel Case
//
const camelToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'camelToSnake');
  return _convertObject(data, this['camelToSnake']);
};

const camelToDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'camelToDash');
  return _convertObject(data, this['camelToDash']);
};

const camelToPascal = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'camelToPascal');
  return _convertObject(data, this['camelToPascal']);
};

const camelToUpperSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'camelToUpperSnake');
  return _convertObject(data, this['camelToUpperSnake']);
};

const camelToUpperDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'camelToUpperDash');
  return _convertObject(data, this['camelToUpperDash']);
};

//
// Snake Case
//
const snakeToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'snakeToCamel');
  return _convertObject(data, this['snakeToCamel']);
};

const snakeToDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'snakeToDash');
  return _convertObject(data, this['snakeToDash']);
};

const snakeToPascal = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'snakeToPascal');
  return _convertObject(data, this['snakeToPascal']);
};

const snakeToUpperSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'snakeToUpperSnake');
  return _convertObject(data, this['snakeToUpperSnake']);
};

const snakeToUpperDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'snakeToUpperDash');
  return _convertObject(data, this['snakeToUpperDash']);
};

//
// Dash Case
//
const dashToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'dashToSnake');
  return _convertObject(data, this['dashToSnake']);
};

const dashToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'dashToCamel');
  return _convertObject(data, this['dashToCamel']);
};

const dashToPascal = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'dashToPascal');
  return _convertObject(data, this['dashToPascal']);
};

const dashToUpperSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'dashToUpperSnake');
  return _convertObject(data, this['dashToUpperSnake']);
};

const dashToUpperDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'dashToUpperDash');
  return _convertObject(data, this['dashToUpperDash']);
};

//
// Pascal Case
//
const pascalToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'pascalToCamel');
  return _convertObject(data, this['pascalToCamel']);
};

const pascalToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'pascalToSnake');
  return _convertObject(data, this['pascalToSnake']);
};

const pascalToDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'pascalToDash');
  return _convertObject(data, this['pascalToDash']);
};

const pascalToUpperSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'pascalToUpperSnake');
  return _convertObject(data, this['pascalToUpperSnake']);
};

const pascalToUpperDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'pascalToUpperDash');
  return _convertObject(data, this['pascalToUpperDash']);
};

//
// Upper Snake Case
//
const upperSnakeToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperSnakeToCamel');
  return _convertObject(data, this['upperSnakeToCamel']);
};

const upperSnakeToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperSnakeToSnake');
  return _convertObject(data, this['upperSnakeToSnake']);
};

const upperSnakeToDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperSnakeToDash');
  return _convertObject(data, this['upperSnakeToDash']);
};

const upperSnakeToPascal = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperSnakeToPascal');
  return _convertObject(data, this['upperSnakeToPascal']);
};

const upperSnakeToUpperDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperSnakeToUpperDash');
  return _convertObject(data, this['upperSnakeToUpperDash']);
};

//
// Upper Dash Case
//
const upperDashToCamel = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperDashToCamel');
  return _convertObject(data, this['upperDashToCamel']);
};

const upperDashToSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperDashToSnake');
  return _convertObject(data, this['upperDashToSnake']);
};

const upperDashToDash = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperDashToDash');
  return _convertObject(data, this['upperDashToDash']);
};

const upperDashToPascal = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperDashToPascal');
  return _convertObject(data, this['upperDashToPascal']);
};

const upperDashToUpperSnake = function (data) {
  if (!data) return null;
  if (typeof data === 'string') return _convertStringKey(data, 'upperDashToUpperSnake');
  return _convertObject(data, this['upperDashToUpperSnake']);
};

//
// Common
//
const _isObject = function (data) {
  return Object.prototype.toString.call(data) === '[object Object]';
};

const _isArray = function (data) {
  return Object.prototype.toString.call(data) === '[object Array]';
};

const _convertStringKey = function (str, type) {
  //
  // Camel Case
  //
  if (type === 'camelToSnake') {
    return str.replace(/([A-Z])/g, function (g) {
      return '_' + g[0].toLowerCase();
    });
  }
  if (type === 'camelToDash') {
    return str.replace(/([A-Z])/g, function (g) {
      return '-' + g[0].toLowerCase();
    });
  }
  if (type === 'camelToPascal') {
    return str.replace(/(^\w)/g, function (g) {
      return g[0].toUpperCase();
    });
  }
  if (type === 'camelToUpperSnake') {
    return str.replace(/([A-Z])/g, function (g) {
      return '_' + g[0];
    }).toUpperCase();
  }
  if (type === 'camelToUpperDash') {
    return str.replace(/([A-Z])/g, function (g) {
      return '-' + g[0];
    }).toUpperCase();
  }
  //
  // Snake Case
  //
  if (type === 'snakeToCamel') {
    return str.replace(/(\_\w)/g, function (g) {
      return g[1].toUpperCase();
    });
  }
  if (type === 'snakeToDash') {
    return str.replace(/(\_)/g, '-');
  }
  if (type === 'snakeToPascal') {
    return str.replace(/(^\w)|(\_\w)/g, function (g) {
      return g[0] !== '_' ? g[0].toUpperCase() : g[1].toUpperCase();
    });
  }
  if (type === 'snakeToUpperSnake') {
    return str.toUpperCase();
  }
  if (type === 'snakeToUpperDash') {
    return str.replace(/(\_)/g, '-').toUpperCase();
  }
  //
  // Dash Case
  //
  if (type === 'dashToCamel') {
    return str.replace(/(\-\w)/g, function (g) {
      return g[1].toUpperCase();
    });
  }
  if (type === 'dashToSnake') {
    return str.replace(/(\-)/g, '_');
  }
  if (type === 'dashToPascal') {
    return str.replace(/(^\w)|(\-\w)/g, function (g) {
      return g[0] !== '-' ? g[0].toUpperCase() : g[1].toUpperCase();
    });
  }
  if (type === 'dashToUpperSnake') {
    return str.replace(/(\-)/g, function (g) {
      return '_';
    }).toUpperCase();
  }
  if (type === 'dashToUpperDash') {
    return str.toUpperCase();
  }
  //
  // Pascal Case
  //
  if (type === 'pascalToCamel') {
    return str.replace(/(^[A-Z])/g, function (g) {
      return g[0].toLowerCase();
    });
  }
  if (type === 'pascalToSnake') {
    return str.replace(/(?=^[A-Z])|([A-Z])/g, function (g) {
      return g[0] ? '_' + g[0].toLowerCase() : '';
    }).toLowerCase();
  }
  if (type === 'pascalToDash') {
    return str.replace(/(?=^[A-Z])|([A-Z])/g, function (g) {
      return g[0] ? '-' + g[0].toLowerCase() : '';
    }).toLowerCase();
  }
  if (type === 'pascalToUpperSnake') {
    return str.replace(/(?=^[A-Z])|([A-Z])/g, function (g) {
      return g[0] ? '_' + g[0] : '';
    }).toUpperCase();
  }
  if (type === 'pascalToUpperDash') {
    return str.replace(/(?=^[A-Z])|([A-Z])/g, function (g) {
      return g[0] ? '-' + g[0] : '';
    }).toUpperCase();
  }
  //
  // Upper Snake Case
  //
  if (type === 'upperSnakeToCamel') {
    return _convertStringKey(str.toLowerCase(), 'snakeToCamel');
  }
  if (type === 'upperSnakeToSnake') {
    return str.toLowerCase();
  }
  if (type === 'upperSnakeToDash') {
    return _convertStringKey(str.toLowerCase(), 'snakeToDash');
  }
  if (type === 'upperSnakeToPascal') {
    return _convertStringKey(str.toLowerCase(), 'snakeToPascal');
  }
  if (type === 'upperSnakeToUpperDash') {
    return str.replace(/(\_)/g, '-');
  }
  //
  // Upper Dash Case
  //
  if (type === 'upperDashToCamel') {
    return _convertStringKey(str.toLowerCase(), 'dashToCamel');
  }
  if (type === 'upperDashToSnake') {
    return _convertStringKey(str.toLowerCase(), 'dashToSnake');
  }
  if (type === 'upperDashToDash') {
    return str.toLowerCase();
  }
  if (type === 'upperDashToPascal') {
    return _convertStringKey(str.toLowerCase(), 'dashToPascal');
  }
  if (type === 'upperDashToUpperSnake') {
    return str.replace(/(\-)/g, '_');
  }
};

const _convertObject = function (data, fn) {
  if (_isArray(data)) {
    return data.map(function (dataItem) {
      if (_isArray(dataItem) || _isObject(dataItem))
        return convertObjectKeys(dataItem, fn);
      return dataItem;
    });
  }
  return convertObjectKeys(data, fn);
};

const convertObjectKeys = function (data, fn) {
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

module.exports = {
  // camel
  camelToSnake,
  camelToDash,
  camelToPascal,
  camelToUpperSnake,
  camelToUpperDash,
  // snake
  snakeToCamel,
  snakeToDash,
  snakeToPascal,
  snakeToUpperSnake,
  snakeToUpperDash,
  // dash
  dashToCamel,
  dashToSnake,
  dashToPascal,
  dashToUpperSnake,
  dashToUpperDash,
  // pascal
  pascalToCamel,
  pascalToSnake,
  pascalToDash,
  pascalToUpperSnake,
  pascalToUpperDash,
  // upperSnake
  upperSnakeToCamel,
  upperSnakeToSnake,
  upperSnakeToDash,
  upperSnakeToPascal,
  upperSnakeToUpperDash,
  // upperDash
  upperDashToCamel,
  upperDashToSnake,
  upperDashToDash,
  upperDashToPascal,
  upperDashToUpperSnake,
};
