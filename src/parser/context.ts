export interface Context {
  convertKey: (key: string) => string;
  cache?: Map<string, string>;
}
