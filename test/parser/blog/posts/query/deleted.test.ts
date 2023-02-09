import blogParser from '../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Deleted', () => {
    const {
        parseAsEmptyPosts,
        parseAsValidPosts,
        parseInvalidPostsThrowError,
    } = generateTestCases('timeDeleted');
    const {
        paginated: { parseAsDeletedPosts },
    } = blogParser();

    parseAsValidPosts(parseAsDeletedPosts);
    parseInvalidPostsThrowError(parseAsDeletedPosts);
    parseAsEmptyPosts(parseAsDeletedPosts);
});
