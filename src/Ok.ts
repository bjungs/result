import { Result } from './result';
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
}
