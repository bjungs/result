import * as Result from './result';

export * from './error/UnwrapError';

export function Ok<T>(value: T): Result.Ok<T>;
export function Ok(): Result.Ok<void>;
export function Ok<T>(value?: T): Result.Ok<T | void> {
  return new Result.Ok(value);
}

export function Err<E>(error: E): Result.Err<E>;
export function Err(): Result.Err<void>;
export function Err<E>(error?: E): Result.Err<E | void> {
  return new Result.Err(error);
}
