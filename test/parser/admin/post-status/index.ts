import adminPropsParser from '../../../../src/parser/admin';
import { admin } from '../../../../src/util/const';
import { describe, it, expect } from 'vitest';

const testPostStatusParser = () =>
    describe('Post Status Parser', () => {
        const { posts } = adminPropsParser();
        it.each(admin.updatePostStatus)(
            'should parse "%s" as valid post status',
            (option) => {
                expect(posts.parseAsNullablePostStatus(option)).toBe(option);
            }
        );
        it.each(['option', undefined])(
            'should parse "%s" as nullable post status',
            (status) => {
                expect(posts.parseAsNullablePostStatus(status)).toBeUndefined();
            }
        );
    });

export default testPostStatusParser;
