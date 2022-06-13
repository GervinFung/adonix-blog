import { TestCases } from '.';
import { UpdateDeletedPost } from '../../../../../../src/common/type/post';
import blogPropsParser from '../../../../../../src/parser/blog';

const testDeleted = ({
    parseAsValidPost,
    parseInvalidPostThrowError,
}: TestCases<UpdateDeletedPost>) =>
    describe('Deleted', () => {
        const { one } = blogPropsParser();
        parseAsValidPost(one.parseAsUpdateDeletedPost);
        parseInvalidPostThrowError(one.parseAsUpdateDeletedPost);
    });

export default testDeleted;
