import { ok, err, Result } from '../src';

describe('result unwrap', () => {
  it('should unwrap values wrapped in Ok', () => {
    const result: Result<string, never> = ok('some value');
    expect(result.unwrap()).toBe('some value');
  });
  it('should unwrap errors wrapped in Err', () => {
    const result: Result<never, string> = err('some error');
    expect(result.unwrapErr()).toBe('some error');
  });
  it('should throw when calling .unwrap() on an Err', () => {
    const result: Result<never, string> = err('some error');
    expect(() => result.unwrap()).toThrow();
  });
  it('should throw when calling .unwrapErr() on Ok', () => {
    const result: Result<string, never> = ok('some value');
    expect(() => result.unwrapErr()).toThrow();
  });
});
