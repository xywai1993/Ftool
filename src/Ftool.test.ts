import { getByteLen, truncationFont, formatDate } from './Ftool';
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

test('formatDate', () => {
    // const h = (-480 - new Date().getTimezoneOffset()) * 3600;

    //TODO: 暂时没想到好办法去处理服务器的时间来测试，
    // 只有东八区才测
    if (new Date().getTimezoneOffset() === -480) {
        expect(formatDate(1615973183953, 'HH:mm:ss')).toBe('17:26:23');
        expect(formatDate(1615973183953, 'YYYY-MM-DD HH:mm:ss')).toBe('2021-03-17 17:26:23');
        expect(formatDate(1615973183953, 'YYYY-MM HH:mm:ss')).toBe('2021-03 17:26:23');
        expect(formatDate(1615973183953, 'YY-MM-DD HH:mm:ss')).toBe('21-03-17 17:26:23');
        expect(formatDate(1615973183953, 'YY-MM-DD HH:mm')).toBe('21-03-17 17:26');
        expect(formatDate(1615973183953, 'YY-MM-DD HH')).toBe('21-03-17 17');
        expect(formatDate(1615973183953, 'MM-DD HH')).toBe('03-17 17');
        expect(formatDate(1615788299000, 'HH:mm:ss')).toBe('14:04:59');
        expect(formatDate(1615971041343, 'YYYY-MM-DD')).toBe('2021-03-17');
    }
});
