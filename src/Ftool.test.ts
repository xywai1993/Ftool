import { getByteLen, truncationFont } from './Ftool';
// import { jest } from '@jest/globals';

test('getByteLen', () => {
    expect(getByteLen('')).toBe(0);
    expect(getByteLen('11')).toBe(2);
    expect(getByteLen('a11')).toBe(3);
    expect(getByteLen('你好')).toBe(4);
    expect(getByteLen('你好1')).toBe(5);
    expect(getByteLen('你好a')).toBe(5);
});

test('truncationFont', () => {
    expect(truncationFont('', 1)).toBe('');
    expect(truncationFont('', 1, false)).toBe('');
    expect(truncationFont('abcdefg', 1)).toBe('a...');
    expect(truncationFont('abcdefg', 1, false)).toBe('a');
    expect(truncationFont('abcdefg', 2)).toBe('ab...');
    expect(truncationFont('你好啊大兄弟', 2)).toBe('你...');
    expect(truncationFont('你好啊大兄弟', 4)).toBe('你好...');
    expect(truncationFont('你好啊大兄弟', 4, false)).toBe('你好');
    expect(truncationFont('你好啊大兄弟', 5)).toBe('你好啊...');
});
