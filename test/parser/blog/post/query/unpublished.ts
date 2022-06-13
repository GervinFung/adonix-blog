import { TestCases } from '.';
import { UnpublishedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';

const testUnpublished = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<UnpublishedPost>) =>
    describe('Unpublished', () => {
        const { one } = blogParser();
        parseAsUndefined(one.parseAsUnpublishedPost);
        parseAsValidPost(one.parseAsUnpublishedPost);
        parseInvalidPostThrowError(one.parseAsUnpublishedPost);
    });

export default testUnpublished;
