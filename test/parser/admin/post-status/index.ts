import adminPropsParser from '../../../../src/parser/admin';
import { admin } from '../../../../src/util/const';

const testPostStatusParser = () =>
    describe('Post Status Parser', () => {
        const { posts } = adminPropsParser();
        it('should parse valid post status', () => {
            admin.updatePostStatus.every((option) =>
                expect(posts.parseAsNullablePostStatus(option)).toBe(option)
            );
        });
        it('should parse as nullable post status', () => {
            expect(posts.parseAsNullablePostStatus(undefined)).toBeUndefined();
        });
    });

export default testPostStatusParser;
