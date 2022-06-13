import { TestCases } from '.';
import { PublishedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';

const testPublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<PublishedPost>) =>
    describe('Published', () => {
        const { one } = blogParser();
        parseAsUndefined(one.parseAsPublishedPost);
        parseAsValidPost(one.parseAsPublishedPost);
        parseInvalidPostThrowError(one.parseAsPublishedPost);
    });

export default testPublished;
