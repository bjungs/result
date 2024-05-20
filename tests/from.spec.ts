import { Result } from '../src';

describe('from', () => {
  describe('sync', () => {
    it('should return the returned value wrapped in a Result', () => {
      const r = Result.from(() => 42);
      expect(r.ok()).toEqual(42);
    });

    it('should catch and return an Err', () => {
      const error = new Error('FAILED!');
      const r = Result.from(() => {
        throw error;
      });
      expect(r.err()).toBe(error);
    });
  });

  describe('async', () => {
    it('should return the resolved value of a Promise', async () => {
      const r = await Result.fromAsync(async () => 42);
      expect(r.ok()).toBe(42);
    });

    it('should catch Promise rejection', async () => {
      const error = new Error('REJECTED!');
      const r = await Result.fromAsync(() => {
        return Promise.reject(error);
      });
      expect(r.err()).toBe(error);
    });
  });
});
