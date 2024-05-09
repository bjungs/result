import { Err, Ok } from '../src';

describe('andThen()', () => {
  it('should return the chained Result Ok if the result is Ok', () => {
    const r1 = Ok(123);
    const r2 = r1.andThen((v) => Ok((v * 2).toString()));
    expect(r2.ok()).toEqual('246');
  });

  it('should return the Err if the chained result is Err', () => {
    const r1 = Err(123);
    const r2 = r1.andThen((v) => Ok(v * 2));
    expect(r2.err()).toEqual(123);
  });
});
