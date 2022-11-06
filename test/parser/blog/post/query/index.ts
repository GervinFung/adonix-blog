import { DummyData } from '..';
import testDeleted from './deleted';
import testPublished from './published';
import testUnpublished from './unpublished';
import testCases from 'cases-of-test';
import { describe, expect, it } from 'vitest';

type TestCasesCallBack<Post> = (post: unknown) => Post;

type TestCases<Post> = Readonly<{
    parseAsValidPost: (parse: TestCasesCallBack<Post>) => void;
    parseInvalidPostThrowError: (parse: TestCasesCallBack<Post>) => void;
    parseAsUndefined: (parse: TestCasesCallBack<Post>) => void;
}>;

type DateTime = 'timeCreated' | 'timeDeleted' | 'timePublished';

const testQueryPostParser = (dummyDataCommonProps: DummyData) =>
    describe('Query Post Parser', () => {
        const dateTime = new Date().toISOString();

        const generateTestCases = <Post>(time: DateTime): TestCases<Post> => {
            const dummyData = { ...dummyDataCommonProps, [time]: dateTime };
            return {
                parseAsUndefined: (parse) =>
                    it('should parse undefined post', () =>
                        expect(parse(undefined)).toBeUndefined()),
                parseAsValidPost: (parse) =>
                    it('should parse valid post', () =>
                        expect(parse(dummyData)).toStrictEqual({
                            ...dummyData,
                            [time]: new Date(dateTime),
                        })),
                parseInvalidPostThrowError: (parse) =>
                    it.each([
                        () =>
                            parse({
                                ...dummyData,
                                title: undefined,
                            }),
                        () =>
                            parse({
                                ...dummyData,
                                description: undefined,
                            }),
                        () =>
                            parse({
                                ...dummyData,
                                content: undefined,
                            }),
                        () =>
                            parse({
                                ...dummyData,
                                [time]: undefined,
                            }),
                    ])(
                        'should fail to parse "%p" as valid post and throw error',
                        (parse) => {
                            expect(parse).toThrowError();
                        }
                    ),
            };
        };

        testCases({
            tests: [
                [() => testPublished(generateTestCases('timePublished'))],
                [() => testDeleted(generateTestCases('timeDeleted'))],
                [() => testUnpublished(generateTestCases('timeCreated'))],
            ],
        });
    });

export type { TestCases, DateTime };
export default testQueryPostParser;
