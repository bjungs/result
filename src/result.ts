import { UnwrapError } from './error/UnwrapError';

/**
 * Represents the result of a fallible operation (i.e. one that may throw).
 * The `Ok` variant represents a successful result;
 * while the `Err` variant represents a failed result.
 */
export type Result<T, E> = Ok<T> | Err<E>;
export type AsyncResult<T, E> = Promise<Result<T, E>>;

interface IResult<T, E> {
  readonly isOk: boolean;
  readonly isErr: boolean;

  /**
   * @returns the inner value of `Ok`.
   * @throws UnwrapError if `Err`
   */
  unwrap(): T;

  /**
   * @returns the inner value of `Err`.
   * @throws UnwrapError if `Ok`
   */
  unwrapErr(): E;

  /**
   * Similar to `unwrap` but does not throw. Instead, it
   * returns either the inner value of `Ok`
   * or `undefined` (noop) if `Err`.
   */
  ok(): T | undefined;

  /**
   * Similar to `unwrapErr` but does not throw. Instead, it
   * returns either the inner value of `Err`
   * or `undefined` (noop) if `Ok`.
   */
  err(): E | undefined;

  /**
   * Maps the inner value of `Ok` into a value of type `U`.
   * On `Err`, if a `defaultValue` is given, that value is
   * returned wrapped in `Ok`.
   * @param mapperFn
   * @param defaultValue
   */
  map<U>(mapperFn: (value: T) => U, defaultValue?: U): Result<U, E>;

  /**
   * Maps the inner value of `Err` into a value of type `F`.
   * The call is a noop on `Ok`.
   * @param mapperFn
   */
  mapErr<F>(mapperFn: (value: E) => F): Result<T, F>;

  /**
   * Returns the result of calling a fallible function (`fn`)
   * with the inner value of the `Ok` variant;
   * The call is a noop on `Err`.
   * @param fn
   */
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
}

export class Ok<T> implements IResult<T, never> {
  readonly #inner: T;

  readonly isErr = false;
  readonly isOk = true;

  constructor(value: T) {
    this.#inner = value;
  }

  unwrap(): T {
    return this.#inner;
  }

  unwrapErr(): never {
    throw new UnwrapError();
  }

  ok(): T {
    return this.#inner;
  }

  err(): undefined {}

  map<U>(mapperFn: (value: T) => U, defaultValue?: U): Ok<U> {
    return new Ok<U>(mapperFn(this.#inner));
  }

  mapErr<F>(mapperFn: (value: never) => F): Ok<T> {
    return this;
  }

  andThen<U, F>(fn: (value: T) => Ok<U>): Ok<U>;
  andThen<U, F>(fn: (value: T) => Err<F>): Err<F>;
  andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.#inner);
  }
}

export class Err<E> implements IResult<never, E> {
  readonly #inner: E;

  readonly isOk = false;
  readonly isErr = true;

  constructor(error: E) {
    this.#inner = error;
  }

  unwrap(): never {
    throw new UnwrapError();
  }

  unwrapErr(): E {
    return this.#inner;
  }

  ok(): undefined {}

  err(): E {
    return this.#inner;
  }

  map<U>(mapperFn: (value: never) => U): Err<E>;
  map<U>(mapperFn: (value: never) => U, defaultValue: U): Ok<U>;
  map<U>(mapperFn: (value: never) => U, defaultValue?: U): Result<U, E> {
    if (defaultValue == undefined) return this;
    return new Ok(defaultValue);
  }

  mapErr<F>(mapperFn: (value: E) => F): Err<F> {
    return new Err<F>(mapperFn(this.#inner));
  }

  andThen<U>(fn: (value: never) => Result<U, E>): Err<E> {
    return this;
  }
}
