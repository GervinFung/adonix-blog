import blogParser from '../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Published', () => {
    const {
        parseAsEmptyPosts,
        parseAsValidPosts,
        parseInvalidPostsThrowError,
    } = generateTestCases('timePublished');
    const {
        paginated: { parseAsPublishedPosts },
    } = blogParser();

    parseAsValidPosts(parseAsPublishedPosts);
    parseInvalidPostsThrowError(parseAsPublishedPosts);
    parseAsEmptyPosts(parseAsPublishedPosts);
});
