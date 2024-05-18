import { Err, Ok } from '../src';

describe('mapping methods', () => {
  describe('map', () => {
    it('should map an Ok<T> into Ok<U>', () => {
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

    it('should default to the given value', () => {
      const error = 'error';
      const res = Err(error);
      const mapped = res.map(parseInt, 42);
      expect(mapped.ok()).toEqual(42);
    });

    it('should default to the given value even if falsy ', () => {
      const error = 0;
      const res = Err(error);
      const mapped = res.map(parseInt, 42);
      expect(mapped.ok()).toEqual(42);
    });

    it('should not consider defaultValue on Ok', () => {
      const res = Ok('42');
      const mapped = res.map(parseInt, 42);
      expect(mapped.ok()).toEqual(42);
    });
  });

  describe('mapErr', () => {
    it('should map an Err<E> into an Err<F>', () => {
      const res = Err('123');
      const mapped = res.mapErr(parseInt);
      expect(mapped.err()).toEqual(123);
    });

    it('should not affect an Ok<T>', () => {
      const res = Ok('123');
      const mapped = res.map(parseInt);
      expect(mapped.ok()).toEqual(123);
    });
  });
});
