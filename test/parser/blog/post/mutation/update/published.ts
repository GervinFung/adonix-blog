import { TestCases } from '.';
import { UpdatePublishedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testPublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdatePublishedPost>) =>
    describe('Published', () => {
        const { one } = blogPropsParser();
        testCases({
            tests: [
                [() => parseAsValidPost(one.parseAsUpdatePublishedPost)],
                [
                    () =>
                        parseInvalidPostThrowError(
                            one.parseAsUpdatePublishedPost
                        ),
                ],
            ],
        });
    });

export default testPublished;
