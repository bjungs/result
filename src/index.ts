import * as Result from './result';

export * from './error/UnwrapError';

/**
 * Returns a new successful Result instance.
 * @param value
 * @constructor
 */
export function Ok<T>(value: T): Result.Ok<T>;
export function Ok(): Result.Ok<void>;
export function Ok<T>(value?: T): Result.Ok<T | void> {
  return new Result.Ok(value);
}

/**
 * Returns a new failed Result instance.
 * @param error
 * @constructor
 */
export function Err<E>(error: E): Result.Err<E>;
export function Err(): Result.Err<void>;
export function Err<E>(error?: E): Result.Err<E | void> {
  return new Result.Err(error);
}

export function from<T, E>(fn: () => T): Result.Result<T, E> {
  try {
    return Ok<ReturnType<typeof fn>>(fn());
  } catch (e: unknown) {
    return Err<E>(e as unknown as E);
  }
}

const helpers = {
  Ok,
  Err,
  from,
};

export { helpers as Result };
