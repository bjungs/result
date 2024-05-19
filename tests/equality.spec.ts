import { Ok } from '../src';

describe('equality', () => {
  it('should not equal similar results', () => {
    const r1 = Ok('some value');
    const r2 = Ok('some value');
    expect(r1).toEqual(r2); // similar...
    expect(r1).not.toBe(r2); // but not the same...
  });
});
