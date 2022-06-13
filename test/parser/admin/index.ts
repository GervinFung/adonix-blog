import testTokenParser from './auth';
import testPostStatusParser from './post-status';
import testQueryOptionParser from './query-option';

const testAdminPropsParser = () =>
    describe('Admin Props', () => {
        testTokenParser();
        testQueryOptionParser();
        testPostStatusParser();
    });

export default testAdminPropsParser;
