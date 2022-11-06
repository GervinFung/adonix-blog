import { DummyData } from '..';
import testInsert from './insert';
import testUpdate from './update';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testMutatePostParser = (dummyDataCommonProps: DummyData) =>
    describe('Mutate Post Parser', () => {
        testCases({
            tests: [
                [() => testInsert(dummyDataCommonProps)],
                [() => testUpdate(dummyDataCommonProps)],
            ],
        });
    });

export type { DummyData };
export default testMutatePostParser;
