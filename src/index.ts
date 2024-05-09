import { type Result, Ok as _Ok, Err as _Err } from './result';

export type { Result };

export * from './error/UnwrapError';

export function Ok<T>(value: T): _Ok<T> {
  return new _Ok(value);
}

export function Err<T>(value: T): _Err<T> {
  return new _Err(value);
}
