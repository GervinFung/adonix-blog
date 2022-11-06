import { TestCases } from '.';
import { UpdateUnpublishedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testUnpublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdateUnpublishedPost>) =>
    describe('Unpublished', () => {
        const { one } = blogPropsParser();
        testCases({
            tests: [
                [() => parseAsValidPost(one.parseAsUpdateUnpublishedPost)],
                [
                    () =>
                        parseInvalidPostThrowError(
                            one.parseAsUpdateUnpublishedPost
                        ),
                ],
            ],
        });
    });

export default testUnpublished;
