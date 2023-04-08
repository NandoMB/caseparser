export function isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function isObject(input: unknown): input is object {
  return typeof input === 'object' && input?.constructor === Object;
}

export function isArray(input: unknown): input is Array<unknown> {
  return Array.isArray(input);
}

export function Lowercase(str: string) {
  return str.toLowerCase();
}
export function Uppercase(str: string) {
  return str.toUpperCase();
}
export function Capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function Uncapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
