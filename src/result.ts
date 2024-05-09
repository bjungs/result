import { UnwrapError } from './error/UnwrapError';

/**
 * Represents the result of a fallible operation.
 * The {Ok} variant represents the successful result;
 * and the {Err} variant represents the unsuccessful result.
 */
export interface Result<T, E> {
  readonly isOk: boolean;
  readonly isErr: boolean;

  /**
   * @returns the inner T of an `Ok<T>` variant.
   * @throws UnwrapError if `Err` variant
   */
  unwrap(): T;

  /**
   * @returns the inner E of an `Err<E>` variant.
   * @throws UnwrapError if `Ok` variant
   */
  unwrapErr(): E;

  /**
   * Similar to unwrap but safe (does not throw). Instead, it
   * breaks out of the abstraction by returning
   * either the inner value of an `Ok` variant
   * or `undefined` in case of an `Err` variant,
   * ignoring its inner error.
   */
  ok(): T | undefined;

  /**
   * Similar to unwrapErr but safe (does not throw). Instead, it
   * breaks out of the encapsulation by returning
   * either the inner error of an `Err` variant
   * or `undefined` in case of an `Ok` variant,
   * ignoring its inner value.
   */
  err(): E | undefined;

  /**
   * Maps the inner value of an `Ok` variant into a value of type `U`.
   * It is a NOOP on Err<E> variant, unless a defaultValue is given,
   * in which case that value is returned inside an Ok<U> instead.
   * @param mapperFn
   * @param defaultValue
   */
  map<U>(mapperFn: (value: T) => U, defaultValue?: U): Result<U, E>;

  /**
   * Maps the inner error of an Err<E> variant into another of type F.
   * NOOP on Ok<T> variant.
   * @param mapperFn
   */
  mapErr<F>(mapperFn: (value: E) => F): Result<T, F>;
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
    return defaultValue ? new Ok(defaultValue) : this;
  }

  mapErr<F>(mapperFn: (value: E) => F): Err<F> {
    return new Err<F>(mapperFn(this.#inner));
  }
}
