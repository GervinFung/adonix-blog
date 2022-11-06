import { TestCases } from '.';
import { UnpublishedPosts } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testUnpublished = ({
    parseAsValidPosts,
    parseInvalidPostsThrowError,
    parseAsEmptyPosts,
}: TestCases<UnpublishedPosts>) =>
    describe('Unpublished', () => {
        const {
            paginated: { parseAsUnpublishedPosts },
        } = blogParser();
        testCases({
            tests: [
                [() => parseAsValidPosts(parseAsUnpublishedPosts)],
                [() => parseInvalidPostsThrowError(parseAsUnpublishedPosts)],
                [() => parseAsEmptyPosts(parseAsUnpublishedPosts)],
            ],
        });
    });

export default testUnpublished;
