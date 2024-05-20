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

/**
 * Calls the given async function and wraps the returned value in a `Result`.
 * If the returned Promise rejects, returns an `Err` with the rejected value.
 * Otherwise, returns an `Ok` with the returned value.
 * @param fn
 */
export function fromAsync<T, E>(
  fn: () => Promise<T>,
): Result.AsyncResult<T, E> {
  return fn()
    .then(Ok<T>)
    .catch(Err<E>);
}

/**
 * Calls the given function and wraps the returned value in a `Result`.
 * If the function throws, returns an `Err` with the value thrown.
 * Otherwise, returns an `Ok` with the returned value.
 * @param fn
 */
export function from<T, E>(fn: () => T): Result.Result<T, E> {
  try {
    return Ok<T>(fn());
  } catch (e: unknown) {
    return Err<E>(e as unknown as E);
  }
}

const helpers = {
  Ok,
  Err,
  from,
  fromAsync,
};

export { helpers as Result };
