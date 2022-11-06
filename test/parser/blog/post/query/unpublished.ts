import { TestCases } from '.';
import { UnpublishedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testUnpublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<UnpublishedPost>) =>
    describe('Unpublished', () => {
        const { one } = blogParser();
        testCases({
            tests: [
                [() => parseAsUndefined(one.parseAsUnpublishedPost)],
                [() => parseAsValidPost(one.parseAsUnpublishedPost)],
                [() => parseInvalidPostThrowError(one.parseAsUnpublishedPost)],
            ],
        });
    });

export default testUnpublished;
