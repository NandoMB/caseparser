import { isDeepStrictEqual } from 'node:util';
import { apiResponse, apiResponseIn, inputCase, smallObject, strings, uniqueKeys, uniqueKeysObjectIn } from '../common/fixtures.ts';
import { CASES, keysLibraries, stringsLibraries, type Case } from '../libraries/index.ts';

export interface Task {
  library: string;
  run: () => unknown;
  isCorrect: () => boolean;
}

export interface Scenario {
  name: string;
  unsupported: string[];
  tasks: Task[];
}

// Keeps the result of every iteration, so the engine can't skip a conversion whose result is unused
export let sink: unknown;

export const KINDS = {
  repeated: 'Repeated keys: API response (100 users, 2,104 keys)',
  unique: 'Unique keys: object with 1,000 keys',
} as const;
export type Kind = keyof typeof KINDS;

export const caseScenarioName = (kind: Kind, target: Case) => `${KINDS[kind]} to ${target}`;

function byCase(kind: Kind, target: Case): Scenario {
  const from = inputCase(target);
  const supported = keysLibraries.filter((library) => library.keys[target]);
  return {
    name: caseScenarioName(kind, target),
    unsupported: keysLibraries.filter((library) => !library.keys[target]).map((library) => library.name),
    tasks: supported.map((library) => {
      const convert = library.keys[target]!;
      if (kind === 'repeated') {
        const input = apiResponse[from];
        const expected = apiResponseIn(target);
        return { library: library.name, run: () => (sink = convert(input)), isCorrect: () => isDeepStrictEqual(convert(input), expected) };
      }
      const inputs = uniqueKeys[from];
      let i = 0;
      return {
        library: library.name,
        run: () => (sink = convert(inputs[i++ % inputs.length])),
        isCorrect: () => inputs.every((input, j) => isDeepStrictEqual(convert(input), uniqueKeysObjectIn(target, j))),
      };
    }),
  };
}

function small(target: 'camel' | 'snake'): Scenario {
  const input = smallObject[inputCase(target)];
  const expected = smallObject[target];
  const supported = keysLibraries.filter((library) => library.keys[target]);
  return {
    name: `Small object (8 keys) to ${target}`,
    unsupported: keysLibraries.filter((library) => !library.keys[target]).map((library) => library.name),
    tasks: supported.map((library) => {
      const convert = library.keys[target]!;
      return { library: library.name, run: () => (sink = convert(input)), isCorrect: () => isDeepStrictEqual(convert(input), expected) };
    }),
  };
}

function stringList(target: 'camel' | 'snake'): Scenario {
  return {
    name: `10 strings to ${target}`,
    unsupported: [],
    tasks: stringsLibraries.map((library) => {
      const convert = library.strings![target];
      return {
        library: library.name,
        run: () => {
          for (const item of strings) sink = convert(item.input);
        },
        isCorrect: () => strings.every((item) => convert(item.input) === item[target]),
      };
    }),
  };
}

export const caseScenarios = (Object.keys(KINDS) as Kind[]).flatMap((kind) => (Object.keys(CASES) as Case[]).map((target) => byCase(kind, target)));
export const otherScenarios = [small('camel'), small('snake'), stringList('camel'), stringList('snake')];
export const scenarios = [...caseScenarios, ...otherScenarios];
