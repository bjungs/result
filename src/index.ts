export * from './error/UnwrapError';

import { Ok, Err, type AsyncResult, type Result } from './result';

export { Result, type AsyncResult };

namespace Result {
  /**
   * Wraps the result of a function call in a `Result`.
   * If the function throws, the thrown value is wrapped in an `Err`.
   * Otherwise, the returned value is wrapped in an `Ok`.
   */
  export function from<T, E>(fn: () => T): Result<T, E> {
    try {
      return _Ok<T>(fn());
    } catch (e: unknown) {
      return _Err<E>(e as unknown as E);
    }
  }

  /**
   * Wraps the result of an async function in an `AsyncResult`.
   * If the Promise rejects, the rejected value is wrapped in an `Err`.
   * Otherwise, the resolved value is wrapped in an `Ok`.
   * @param fn
   */
  export function fromAsync<T, E>(fn: () => Promise<T>): AsyncResult<T, E> {
    return fn()
      .then(_Ok<T>)
      .catch(_Err<E>);
  }
}

/**
 * Returns a new successful Result instance.
 * @param value
 * @constructor
 */
function _Ok<T>(value: T): Ok<T>;
function _Ok(): Ok<void>;
function _Ok<T>(value?: T): Ok<T | void> {
  return new Ok(value);
}
export { _Ok as Ok };

/**
 * Returns a new failed Result instance.
 * @param error
 * @constructor
 */
function _Err<E>(error: E): Err<E>;
function _Err(): Err<void>;
function _Err<E>(error?: E): Err<E | void> {
  return new Err(error);
}
export { _Err as Err };
