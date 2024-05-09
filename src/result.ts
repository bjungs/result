import { UnwrapError } from './error/UnwrapError';

/**
 * Represents the result of a fallible operation (i.e. one that may throw).
 * The {Ok} variant represents the successful result;
 * while the {Err} variant represents the unsuccessful result.
 */
export interface Result<T, E> {
  readonly isOk: boolean;
  readonly isErr: boolean;

  /**
   * @returns the inner value of an `Ok` variant or throws an error on `Err` variant.
   * @throws UnwrapError if `Err` variant
   */
  unwrap(): T;

  /**
   * @returns the inner errors of an `Err` variant or throws an error on `Ok` variant.
   * @throws UnwrapError if `Ok` variant
   */
  unwrapErr(): E;

  /**
   * Similar to `unwrap` but safe (does not throw). Instead, it
   * breaks out of the abstraction by returning
   * either the inner value of an `Ok` variant
   * or `undefined` (NOOP) in case of an `Err` variant,
   * ignoring its inner error.
   */
  ok(): T | undefined;

  /**
   * Similar to `unwrapErr` but safe (does not throw). Instead, it
   * breaks out of the abstraction by returning
   * either the inner error of an `Err` variant
   * or `undefined` (NOOP) in case of an `Ok` variant,
   * ignoring its inner value.
   */
  err(): E | undefined;

  /**
   * Maps the inner value of an `Ok` variant into a value of type `U`.
   * NOOP on `Err` variant, unless a defaultValue is given,
   * in which case that value is returned inside an `Ok` instead.
   * @param mapperFn
   * @param defaultValue
   */
  map<U>(mapperFn: (value: T) => U, defaultValue?: U): Result<U, E>;

  /**
   * Maps the inner error of an `Err` variant into another of type `F`;
   * or performs a NOOP on `Ok` variant.
   * @param mapperFn
   */
  mapErr<F>(mapperFn: (value: E) => F): Result<T, F>;

  /**
   * Returns the result of calling the `fn` function by passing the
   * inner value of the `Ok` variant;
   * or performs a NOOP on `Err` variant.
   * @param fn
   */
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
}

export class Ok<T> implements Result<T, never> {
  readonly isErr = false;
  readonly isOk = true;

  readonly #inner: T;

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
}

export class Err<E> implements Result<never, E> {
  readonly isOk = false;
  readonly isErr = true;

  readonly #inner: E;

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
}
