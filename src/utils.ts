export function isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function isObject(input: unknown): input is object {
  if (typeof input !== 'object' || input === null) return false;
  const proto = Object.getPrototypeOf(input);
  return proto !== null && proto.constructor === Object;
}

export function isArray(input: unknown): input is Array<unknown> {
  return Array.isArray(input);
}
