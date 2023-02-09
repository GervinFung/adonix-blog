import { expect, it } from 'vitest';
import { dummyData as dummyDataCommonProps } from '../data';

type TestCasesCallBack<Post> = (post: unknown) => Post;

type TestCases<Post> = Readonly<{
    parseAsValidPost: (parse: TestCasesCallBack<Post>) => void;
    parseInvalidPostThrowError: (parse: TestCasesCallBack<Post>) => void;
}>;

type DateTime = 'timeCreated' | 'timeDeleted' | 'timePublished';

const generateTestCases = <Post>(time: DateTime): TestCases<Post> => {
    const dateTime = new Date().toISOString();

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

export { generateTestCases };
