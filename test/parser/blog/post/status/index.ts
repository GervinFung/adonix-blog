import blogParser from '../../../../../src/parser/blog';
import { admin } from '../../../../../src/util/const';
import { describe, expect, it } from 'vitest';

const testUpdateStatusParser = () =>
    describe('Update Status Parser', () => {
        const {
            one: { parseAsUpdatePostStatus },
        } = blogParser();
        it.each(admin.updatePostStatus)(
            'should parse "%s" as valid status',
            (status) => {
                expect(parseAsUpdatePostStatus(status)).toBe(status);
            }
        );
        it.each([undefined, 123])(
            'should fail to parse "%p" as valid status and throw error',
            (status) => {
                expect(() => parseAsUpdatePostStatus(status)).toThrowError();
            }
        );
    });

export default testUpdateStatusParser;
