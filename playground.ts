import caseparser from './src';

const stringTest = caseparser.camelToDash('loremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry');
//    ^?

const jsonTest = caseparser.camelToDash({ firstName: 'John', lastName: 'Doe' });
//    ^?


