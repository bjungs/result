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
   * Breaks out of the encapsulation by returning
   * either the inner value `T` of an `Ok<T>` variant
   * or `undefined` in case of an `Err<E>` variant,
   * ignoring the error E.
   * Can be useful when you don't care about the error.
   */
  ok(): T | undefined;

  /**
   * Breaks out of the encapsulation by returning
   * either the inner error `E` of an `Err<E>` variant
   * or `undefined` in case of an `Ok<T>` variant,
   * ignoring the value of T.
   * Can be useful when you don't care about the value.
   */
  err(): E | undefined;
}
