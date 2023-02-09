import blogParser from '../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Unpublished', () => {
    const {
        parseAsEmptyPosts,
        parseAsValidPosts,
        parseInvalidPostsThrowError,
    } = generateTestCases('timeCreated');
    const {
        paginated: { parseAsUnpublishedPosts },
    } = blogParser();

    parseAsValidPosts(parseAsUnpublishedPosts);
    parseInvalidPostsThrowError(parseAsUnpublishedPosts);
    parseAsEmptyPosts(parseAsUnpublishedPosts);
});
