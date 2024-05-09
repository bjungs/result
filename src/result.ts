export const UnwrapError = new Error('Unsafe result unwrap');

export interface Result<T, E> {
  isOk: boolean;
  isErr: Boolean;
  /**
   * @throws Error if Err<E> variant
   */
  unwrap: () => T;
  /**
   * @throws Error if Ok<T> variant
   */
  unwrapErr: () => E;
}

interface Ok<T> extends Result<T, never> {
  isOk: true;
  isErr: false;
  unwrap: () => T;
  /**
   * @throws Error
   */
  unwrapErr: () => never;
}

interface Err<E> extends Result<never, E> {
  isOk: false;
  isErr: true;
  unwrap: () => never;
  unwrapErr: () => E;
}

export function Ok<T>(value: T): Ok<T> {
  return {
    isOk: true,
    isErr: false,
    unwrap: () => value,
    unwrapErr: () => {
      throw new Error('Unsafe result unwrap!');
    },
  };
}
export function Err<E>(error: E): Err<E> {
  return {
    isOk: false,
    isErr: true,
    unwrap(): never {
      throw new Error('Unsafe result unwrap!');
    },
    unwrapErr(): E {
      return error;
    },
  };
}
