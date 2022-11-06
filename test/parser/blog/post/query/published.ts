import { TestCases } from '.';
import { PublishedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testPublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<PublishedPost>) =>
    describe('Published', () => {
        const { one } = blogParser();
        testCases({
            tests: [
                [() => parseAsUndefined(one.parseAsPublishedPost)],
                [() => parseAsValidPost(one.parseAsPublishedPost)],
                [() => parseInvalidPostThrowError(one.parseAsPublishedPost)],
            ],
        });
    });

export default testPublished;
