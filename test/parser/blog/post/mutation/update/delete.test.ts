import blogPropsParser from '../../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Deleted', () => {
    const { one } = blogPropsParser();
    const { parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timeDeleted');

    parseAsValidPost(one.parseAsUpdateDeletedPost);
    parseInvalidPostThrowError(one.parseAsUpdateDeletedPost);
});
