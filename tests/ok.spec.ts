import { Err, Ok } from '../src';

describe('ok()', () => {
  it('should return the inner value of an Ok variant', () => {
    const value = { data: 'value' };
    const res = Ok(value);
    expect(res.ok()).toBe(value);
  });

  it('should return undefined when called on the Err variant', () => {
    const res = Err(new Error('message'));
    expect(res.ok()).toBe(undefined);
  });
});
