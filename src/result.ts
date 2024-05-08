type Ok<T> = Readonly<{
  isOk: true;
  isErr: false;
  unwrap: () => T;
  /**
   * @throws
   */
  unwrapErr: () => never;
}>;

type Err<E> = Readonly<{
  isOk: false;
  isErr: true;
  /**
   * @throws
   */
  unwrap: () => never;
  unwrapErr: () => E;
}>;

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
  return {
    isOk: true,
    isErr: false,
    unwrap: () => value,
    unwrapErr: () => {
      throw new Error('Unsafe result unwrap!');
    },
  };
}
export function err<E>(error: E): Err<E> {
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
