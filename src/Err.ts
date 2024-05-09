import { Result } from './Result';
import { UnwrapError } from './error/UnwrapError';

export default class Err<E> implements Result<never, E> {
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

  map<U>(mapperFn: (value: never) => U): Err<E> {
    return this;
  }

  mapErr<F>(mapperFn: (value: E) => F): Err<F> {
    return new Err<F>(mapperFn(this.#inner));
  }
}
