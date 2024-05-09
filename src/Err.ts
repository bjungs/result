import { Result } from './result';
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
}
