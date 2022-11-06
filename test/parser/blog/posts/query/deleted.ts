import { TestCases } from '.';
import { DeletedPosts } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testDeleted = ({
    parseAsValidPosts,
    parseInvalidPostsThrowError,
    parseAsEmptyPosts,
}: TestCases<DeletedPosts>) =>
    describe('Deleted', () => {
        const {
            paginated: { parseAsDeletedPosts },
        } = blogParser();
        testCases({
            tests: [
                [() => parseAsValidPosts(parseAsDeletedPosts)],
                [() => parseInvalidPostsThrowError(parseAsDeletedPosts)],
                [() => parseAsEmptyPosts(parseAsDeletedPosts)],
            ],
        });
    });

export default testDeleted;
