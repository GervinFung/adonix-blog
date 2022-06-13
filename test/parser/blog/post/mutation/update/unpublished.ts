import { TestCases } from '.';
import { UpdateUnpublishedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';

const testUnpublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdateUnpublishedPost>) =>
    describe('Unpublished', () => {
        const { one } = blogPropsParser();
        parseAsValidPost(one.parseAsUpdateUnpublishedPost);
        parseInvalidPostThrowError(one.parseAsUpdateUnpublishedPost);
    });

export default testUnpublished;
