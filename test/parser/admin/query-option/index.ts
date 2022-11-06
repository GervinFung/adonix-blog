import adminPropsParser from '../../../../src/parser/admin';
import { admin } from '../../../../src/util/const';
import { describe, it, expect } from 'vitest';

const testQueryOptionParser = () =>
    describe('Query Option Parser', () => {
        const { posts } = adminPropsParser();
        it.each(admin.postQueryOptions)(
            'should parse "%s" as valid option',
            (option) => {
                expect(posts.parseAsPostQueryOption(option)).toBe(option);
            }
        );
        it.each(['option', undefined])(
            'should fail to parse "%s" as valid option and throw error',
            (option) => {
                expect(() =>
                    posts.parseAsPostQueryOption(option)
                ).toThrowError();
            }
        );
    });

export default testQueryOptionParser;
