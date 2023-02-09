import blogPropsParser from '../../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Publish', () => {
    const { one } = blogPropsParser();
    const { parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timePublished');

    parseAsValidPost(one.parseAsUpdatePublishedPost);
    parseInvalidPostThrowError(one.parseAsUpdatePublishedPost);
});
