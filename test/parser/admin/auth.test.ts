import adminPropsParser from '../../../src/parser/admin';
import { describe, it, expect } from 'vitest';

describe('Token Parser', () => {
    const { auth } = adminPropsParser();
    it('should parse string as token', () => {
        const token = '123';
        expect(auth.parseAsToken(token)).toBe(token);
        expect(auth.parseAsNullableToken(token)).toBe(token);
    });
    it.each([23, true])(
        'should fail to parse non-string value token (%p) and throw error',
        (value) => {
            expect(() => auth.parseAsToken(value)).toThrowError();
        }
    );
    it.each([23, true])(
        'should parse non-string value "%p" as nullable token as undefined',
        (value) => {
            expect(auth.parseAsNullableToken(value)).toBeUndefined();
        }
    );
});
