import { Err, Ok } from '../src';

describe('map()', () => {
  it('should map an Ok<T> into Ok<K>', () => {
    const res = Ok('123');
    const mapped = res.map(parseInt);
    expect(mapped.ok()).toEqual(123);
  });

  it('should not affect an Err<E>', () => {
    const error = 'error';
    const res = Err(error);
    const mapped = res.map(parseInt);
    expect(mapped.err()).toEqual(error);
  });
});
