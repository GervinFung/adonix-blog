import { TestCases } from '.';
import { DeletedPost } from '../../../../../src/common/type/post';
import blogParser from '../../../../../src/parser/blog';

const testDeleted = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
    parseAsUndefined,
}: TestCases<DeletedPost>) =>
    describe('Deleted', () => {
        const { one } = blogParser();
        parseAsUndefined(one.parseAsDeletedPost);
        parseAsValidPost(one.parseAsDeletedPost);
        parseInvalidPostThrowError(one.parseAsDeletedPost);
    });

export default testDeleted;
