import { Ok, Err, UnwrapError } from '../src';

describe('unwrapping', () => {
  describe('unwrap', () => {
    it('should return the inner value on Ok', () => {
      const value = { data: 'value' };
      const res = Ok(value);
      expect(res.unwrap()).toBe(value);
    });

    it('should throw on Err', () => {
      const res = Err('error');
      expect(() => res.unwrap()).toThrow(UnwrapError);
    });
  });

  describe('unwrapErr', () => {
    it('should throw on Ok', () => {
      const res = Ok('value');
      expect(() => res.unwrapErr()).toThrow(UnwrapError);
    });

    it('should return the inner value on Err', () => {
      const error = { data: 'error' };
      const res = Err(error);
      expect(res.unwrapErr()).toBe(error);
    });
  });
});
