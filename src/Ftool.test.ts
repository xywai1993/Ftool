import { getByteLen } from './Ftool';

test('adds 1 + 2 to equal 3', () => {
    expect(getByteLen('11')).toBe(2);
});
