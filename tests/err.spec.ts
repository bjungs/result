import { Err, Ok } from '../src';

describe('err()', () => {
  it('should return the inner error of an Err<E> variant', () => {
    const error = new Error('message');
    const res = Err(error);
    expect(res.err()).toBe(error);
  });

  it('should return the inner error of an Err<E> variant', () => {
    const value = { data: 'value' };
    const res = Ok(value);
    expect(res.err()).toBe(undefined);
  });
});
