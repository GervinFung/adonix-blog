import testIdParser from './id';
import testMutatePostParser from './mutation';
import testQueryPostParser from './query';
import testUpdateStatusParser from './status';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const dummyDataCommonProps = {
    title: 'Title',
    description: 'Description',
    content: 'Content',
    imagePath: 'Image Path',
} as const;

type DummyData = typeof dummyDataCommonProps;

const testBlogPostParser = () =>
    describe('Blog', () => {
        testCases({
            tests: [
                [() => testQueryPostParser(dummyDataCommonProps)],
                [() => testMutatePostParser(dummyDataCommonProps)],
                [testIdParser],
                [testUpdateStatusParser],
            ],
        });
    });

export type { DummyData };
export default testBlogPostParser;
