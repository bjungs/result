import { type Result, Ok as _Ok, Err as _Err } from './result';

export type { Result };

export * from './error/UnwrapError';

export function Ok<T>(value: T): _Ok<T> {
  return new _Ok(value);
}

export function Err<E>(error: E): _Err<E> {
  return new _Err(error);
}
