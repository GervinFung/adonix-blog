import { TestCases } from '.';
import { DeletedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testDeleted = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<DeletedPost>) =>
    describe('Deleted', () => {
        const { one } = blogParser();
        testCases({
            tests: [
                [() => parseAsUndefined(one.parseAsDeletedPost)],
                [() => parseAsValidPost(one.parseAsDeletedPost)],
                [() => parseInvalidPostThrowError(one.parseAsDeletedPost)],
            ],
        });
    });

export default testDeleted;
