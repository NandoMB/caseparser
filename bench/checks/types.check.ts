// Checked by `tsc` in `pnpm test`: the "Typed keys" row of results/features.md
import camelcaseKeys from 'camelcase-keys';
import * as changeCaseKeys from 'change-case/keys';
import { toCamelCaseKeys, toSnakeCaseKeys } from 'es-toolkit/object';
import humps from 'humps';
import snakecaseKeys from 'snakecase-keys';
import { toCamel, toSnake } from '../../dist/index.js';
import { typedKeysInput as input, typedKeysCamelInput as camelInput } from '../common/fixtures.ts';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
const assert = <T extends true>() => {};

type Camel = { userId: number; firstName: string; lastName: string; accountStatus: string; displayName: string; nestedList: { orderId: number }[] };
type Snake = { user_id: number; first_name: string; nested_list: { order_id: number }[] };

// ✅ The inferred type is the runtime result
const caseparserCamel = toCamel(input);
assert<Equal<typeof caseparserCamel, Camel>>();
const caseparserSnake = toSnake(camelInput);
assert<Equal<typeof caseparserSnake, Snake>>();
const camelcaseKeysResult = camelcaseKeys(input, { deep: true });
assert<Equal<typeof camelcaseKeysResult, Camel>>();
const snakecaseKeysResult = snakecaseKeys(camelInput);
assert<Equal<typeof snakecaseKeysResult, Snake>>();

// ⚠️ Keys in some cases are typed differently from the runtime result
const esToolkitCamel = toCamelCaseKeys(input);
assert<Equal<keyof typeof esToolkitCamel, 'userId' | 'firstName' | 'last-name' | 'accountStatus' | 'display Name' | 'nestedList'>>();
const esToolkitSnake = toSnakeCaseKeys(camelInput);
assert<Equal<keyof typeof esToolkitSnake, 'user_id' | 'first_name' | 'nested_list'>>();

// ❌ No keys: `object` and `unknown`
const humpsCamel = humps.camelizeKeys(input);
assert<Equal<typeof humpsCamel, object>>();
const humpsSnake = humps.decamelizeKeys(camelInput);
assert<Equal<typeof humpsSnake, object>>();
const changeCaseCamel = changeCaseKeys.camelCase(input, Infinity);
assert<Equal<typeof changeCaseCamel, unknown>>();
