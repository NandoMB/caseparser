const CamelCaseSuite = require('./test-camel-case');
const DashCaseSuite = require('./test-dash-case');
const PascalCaseSuite = require('./test-pascal-case');
const SnakeCaseSuite = require('./test-snake-case');
const UpperDashCaseSuite = require('./test-upper-dash-case');
const UpperSnakeCaseSuite = require('./test-upper-snake-case');


console.log('---------------------------------');
console.log('CamelCaseSuite:');
CamelCaseSuite.testCamelCaseSuite();

console.log('---------------------------------');
console.log('SnakeCaseSuite:');
SnakeCaseSuite.testSnakeCaseSuite();

console.log('---------------------------------');
console.log('DashCaseSuite:');
DashCaseSuite.testDashCaseSuite();

console.log('---------------------------------');
console.log('PascalCaseSuite:');
PascalCaseSuite.testPascalCaseSuite();

console.log('---------------------------------');
console.log('UpperSnakeCaseSuite:');
UpperSnakeCaseSuite.testUpperSnakeCaseSuite();

console.log('---------------------------------');
console.log('UpperDashCaseSuite:');
UpperDashCaseSuite.testUpperDashCaseSuite();
