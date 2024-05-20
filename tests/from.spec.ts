import { Result } from '../src';

describe('from', () => {
  describe('fallible function', () => {
    it('should catch and return an Err', () => {
      const error = new Error('FAILED!');
      const r = Result.from<unknown, Error>(() => {
        throw error;
      });
      expect(r.err()).toBe(error);
    });

    it('should catch Promise rejection', async () => {
      const error = new Error('REJECTED!');
      const r = await Result.fromAsync<unknown, string>(() => {
        return Promise.reject(error);
      });
      expect(r.err()).toBe(error);
    });
  });
});
