import blogParser from '../../../../src/parser/blog';
import { describe, expect, it } from 'vitest';

describe('Id Parser', () => {
    const {
        one: { parseAsId },
    } = blogParser();
    it.each(['507f191e810c19729de860ea', 'hey'])(
        'should parse "%s" as valid id',
        (id) => {
            expect(parseAsId(id)).toStrictEqual(id);
        }
    );
    it.each([undefined, 123])(
        'should fail to parse "%p" as invalid id and throw error',
        (id) => {
            expect(() => parseAsId(id)).toThrowError();
        }
    );
});
