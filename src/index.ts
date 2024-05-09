import _Ok from './Ok';
import _Err from './Err';

export * from './error/UnwrapError';

export function Ok<T>(value: T): _Ok<T> {
  return new _Ok(value);
}

export function Err<T>(value: T): _Err<T> {
  return new _Err(value);
}
