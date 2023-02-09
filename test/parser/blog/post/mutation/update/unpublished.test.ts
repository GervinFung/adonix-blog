import blogPropsParser from '../../../../../../src/parser/blog';

import { describe } from 'vitest';
import { generateTestCases } from './data';

describe('Unpublished', () => {
    const { one } = blogPropsParser();
    const { parseAsValidPost, parseInvalidPostThrowError } =
        generateTestCases('timeCreated');

    parseAsValidPost(one.parseAsUpdateUnpublishedPost);
    parseInvalidPostThrowError(one.parseAsUpdateUnpublishedPost);
});
