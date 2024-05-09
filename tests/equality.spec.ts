import { ok } from '../src';

describe('equality', () => {
  it('should not equal similar results', () => {
    const r1 = ok('some value');
    const r2 = ok('some value');
    expect(r1).not.toBe(r2);
    expect(r1).not.toEqual(r2);
  });
});
