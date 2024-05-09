export class UnwrapError extends Error {
  constructor(reason?: string) {
    super(`Invalid result unwrap${reason ? `: ${reason}` : '.'}`);
  }
}

export interface Result<T, E> {
  readonly isOk: boolean;
  readonly isErr: boolean;
  /**
   * @throws UnwrapError(reason) if Err<E> variant
   */
  unwrap: (reason?: string) => T;
  /**
   * @throws UnwrapError(reason) if Ok<T> variant
   */
  unwrapErr: (reason?: string) => E;
}

interface Ok<T> extends Result<T, never> {
  isOk: true;
  isErr: false;
}

interface Err<E> extends Result<never, E> {
  isOk: false;
  isErr: true;
}

export function Ok<T>(value: T): Ok<T> {
  return {
    isOk: true,
    isErr: false,
    unwrap: () => value,
    unwrapErr: (reason) => {
      throw new UnwrapError(reason);
    },
  };
}
export function Err<E>(error: E): Err<E> {
  return {
    isOk: false,
    isErr: true,
    unwrap(reason): never {
      throw new UnwrapError(reason);
    },
    unwrapErr(): E {
      return error;
    },
  };
}
