import blogParser from '../../../../../src/parser/blog';
import { generateTestCases } from './data';
import { describe } from 'vitest';

describe('Published', () => {
    const { one } = blogParser();
    const { parseAsUndefined, parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timePublished');

    parseAsUndefined(one.parseAsPublishedPost);
    parseAsValidPost(one.parseAsPublishedPost);
    parseInvalidPostThrowError(one.parseAsPublishedPost);
});
