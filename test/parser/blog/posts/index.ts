import testPageParser from './page';
import testPostsParser from './query';
import testTotalPostParser from './total';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testBlogPostsParser = () =>
    describe('Posts Parser', () => {
        testCases({
            tests: [[testPageParser], [testTotalPostParser], [testPostsParser]],
        });
    });

export default testBlogPostsParser;
