import testTokenParser from './auth';
import testPostStatusParser from './post-status';
import testQueryOptionParser from './query-option';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testAdminPropsParser = () =>
    describe('Admin Props', () => {
        testCases({
            tests: [
                [testTokenParser],
                [testQueryOptionParser],
                [testPostStatusParser],
            ],
        });
    });

export default testAdminPropsParser;
