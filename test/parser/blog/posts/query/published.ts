import { TestCases } from '.';
import { PublishedPosts } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testPublished = ({
    parseAsValidPosts,
    parseInvalidPostsThrowError,
    parseAsEmptyPosts,
}: TestCases<PublishedPosts>) =>
    describe('Published', () => {
        const {
            paginated: { parseAsPublishedPosts },
        } = blogParser();
        testCases({
            tests: [
                [() => parseAsValidPosts(parseAsPublishedPosts)],
                [() => parseInvalidPostsThrowError(parseAsPublishedPosts)],
                [() => parseAsEmptyPosts(parseAsPublishedPosts)],
            ],
        });
    });

export default testPublished;
