import { TestCases } from '.';
import { UpdateDeletedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testDeleted = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdateDeletedPost>) =>
    describe('Deleted', () => {
        const { one } = blogPropsParser();
        testCases({
            tests: [
                [() => parseAsValidPost(one.parseAsUpdateDeletedPost)],
                [
                    () =>
                        parseInvalidPostThrowError(
                            one.parseAsUpdateDeletedPost
                        ),
                ],
            ],
        });
    });

export default testDeleted;
