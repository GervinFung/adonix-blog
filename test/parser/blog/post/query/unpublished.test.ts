import blogParser from '../../../../../src/parser/blog';
import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Unpublished', () => {
    const { one } = blogParser();
    const { parseAsUndefined, parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timeCreated');

    parseAsUndefined(one.parseAsUnpublishedPost);
    parseAsValidPost(one.parseAsUnpublishedPost);
    parseInvalidPostThrowError(one.parseAsUnpublishedPost);
});
