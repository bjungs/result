import { Result } from './Result';
import { UnwrapError } from './error/UnwrapError';

export default class Ok<T> implements Result<T, never> {
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

  map<U>(mapperFn: (value: T) => U): Ok<U> {
    return new Ok<U>(mapperFn(this.#inner));
  }

  mapErr<F>(mapperFn: (value: never) => F): Ok<T> {
    return this;
  }
}
