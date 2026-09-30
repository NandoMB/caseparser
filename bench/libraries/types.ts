export type Convert = (input: any) => any;

export const CASES = {
  camel: 'firstName',
  pascal: 'FirstName',
  snake: 'first_name',
  kebab: 'first-name',
  'upper snake': 'FIRST_NAME',
  'upper kebab': 'FIRST-NAME',
  train: 'First-Name',
  title: 'First Name',
  sentence: 'First name',
  'pascal snake': 'First_Name',
  lower: 'first name',
  upper: 'FIRST NAME',
  dot: 'first.name',
  path: 'first/name',
} as const;
export type Case = keyof typeof CASES;

export interface Library {
  name: string;
  packages: string[];
  keys: Partial<Record<Case, Convert>>;
  strings?: { camel: (input: string) => string; snake: (input: string) => string };
  skipKey?: (input: object, key: string) => unknown;
  typedKeys?: string;
}
