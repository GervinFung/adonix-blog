import { TestCases } from '.';
import { UpdatePublishedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';

const testPublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdatePublishedPost>) =>
    describe('Published', () => {
        const { one } = blogPropsParser();
        parseAsValidPost(one.parseAsUpdatePublishedPost);
        parseInvalidPostThrowError(one.parseAsUpdatePublishedPost);
    });

export default testPublished;
