import { Ftool } from './Ftool';

test('getByteLen', () => {
    expect(Ftool.getByteLen('你好')).toBe(4);
});
