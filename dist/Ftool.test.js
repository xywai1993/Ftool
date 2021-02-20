import { getByteLen, isArray } from './Ftool';
test('getByteLen', () => {
    expect(getByteLen('你好')).toBe(4);
    expect(getByteLen('abc')).toBe(3);
    expect(getByteLen('你好abc')).toBe(7);
});
test('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray('')).toBe(false);
    expect(isArray({})).toBe(false);
});
