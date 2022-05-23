import { validateIsUInt4 } from '../../validationFunctions';



describe('validationFunctions', () => {
  it('should validateIsUInt4', async () => {
    expect(validateIsUInt4(1)).toBe(1);
    expect(validateIsUInt4(10)).toBe(10);
    expect(() => validateIsUInt4(100)).toThrowError();
    expect(() => validateIsUInt4(-10)).toThrowError();
    //@ts-expect-error - testing bad inputs
    expect(() => validateIsUInt4('test')).toThrowError();
  })
})