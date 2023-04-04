import caseparser from './dist';

const stringTest = caseparser.camelToDash('loremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry');
//    ^?

const jsonTest = caseparser.camelToDash({ firstName: 'John', lastName: 'Doe' });
//    ^?


