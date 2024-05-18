import { Err, Ok, Result } from '../src';

describe('inner', () => {
  it('should return the inner value of the Ok variant', () => {
    const value = 'some value';
    const r1 = Ok(value);
    const inner = r1.inner();
    expect(inner).toEqual(value);
  });

  it('should return the inner value of the Err variant', () => {
    const error = 'some error';
    const r1 = Err(error);
    const inner = r1.inner();
    expect(inner).toEqual(error);
  });
});
