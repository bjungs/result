import { Ok, Err, UnwrapError } from '../src';

describe('unwrap', () => {
  it('should return the inner value on Ok', () => {
    const value = { data: 'value' };
    expect(Ok(value).unwrap()).toBe(value);
  });

  it('should throw when on Err', () => {
    expect(() => Err('error').unwrap()).toThrow(UnwrapError);
  });
});

describe('unwrapErr', () => {
  it('should on Ok', () => {
    expect(() => Ok('value').unwrapErr()).toThrow(UnwrapError);
  });

  it('should return the inner valur on Err', () => {
    const error = { data: 'error' };
    expect(Err(error).unwrapErr()).toBe(error);
  });
});
