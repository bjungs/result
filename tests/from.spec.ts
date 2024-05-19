import { Result } from '../src';

describe('from', () => {
  describe('fallible function', () => {
    it('should catch and return an Err', () => {
      const error = new Error('FAILED!');
      const r = Result.from<number, Error>(() => {
        throw error;
      });
      expect(r.err()).toBe(error);
    });
  });
});
