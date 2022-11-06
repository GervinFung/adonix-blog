import { DummyData } from '../';
import { DateTime } from '../../query';
import testDeleted from './delete';
import testPublished from './published';
import testUnpublished from './unpublished';
import { describe, expect, it } from 'vitest';

type TestCasesCallBack<Post> = (post: unknown) => Post;

type TestCases<Post> = Readonly<{
    parseAsValidPost: (parse: TestCasesCallBack<Post>) => void;
    parseInvalidPostThrowError: (parse: TestCasesCallBack<Post>) => void;
}>;

const testUpdate = (dummyDataCommonProps: DummyData) => {
    describe('Update Post', () => {
        const dateTime = new Date().toISOString();

        const generateTestCases = <Post>(time: DateTime): TestCases<Post> => {
            const dummyData = {
                ...dummyDataCommonProps,
                [time]: dateTime,
            };

            return {
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

        testPublished(generateTestCases('timePublished'));
        testDeleted(generateTestCases('timeDeleted'));
        testUnpublished(generateTestCases('timeCreated'));
    });
};

export type { TestCases };
export default testUpdate;
