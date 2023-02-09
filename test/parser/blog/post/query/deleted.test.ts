import blogParser from '../../../../../src/parser/blog';
import { generateTestCases } from './data';
import { describe } from 'vitest';

describe('Deleted', () => {
    const { one } = blogParser();
    const { parseAsUndefined, parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timeDeleted');

    parseAsUndefined(one.parseAsDeletedPost);
    parseAsValidPost(one.parseAsDeletedPost);
    parseInvalidPostThrowError(one.parseAsDeletedPost);
});
