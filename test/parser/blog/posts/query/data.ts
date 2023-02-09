import { DateTime } from '../../post/query';
import { expect, it } from 'vitest';

type TestCasesCallBack<Posts> = (post: unknown) => Posts;

type TestCases<Posts> = Readonly<{
    parseAsValidPosts: (parse: TestCasesCallBack<Posts>) => void;
    parseInvalidPostsThrowError: (parse: TestCasesCallBack<Posts>) => void;
    parseAsEmptyPosts: (parse: TestCasesCallBack<Posts>) => void;
}>;

const generateTestCases = <Posts>(time: DateTime): TestCases<Posts> => {
    const dateTime = new Date().toISOString();

    const dummyDatasCommonProps = [
        {
            id: '628a48e232347c40baef8bad',
            description: 'Description 0',
            title: 'Title 0',
            imagePath: 'Image Path 0',
        },
    ] as const;

    const dummyDatas = dummyDatasCommonProps.map((data) => ({
        ...data,
        [time]: new Date(dateTime),
    }));
    return {
        parseAsEmptyPosts: (parse) =>
            it.each(['123', { wifi: '123' }])(
                'should fail to parse "%p" as valid posts and return empty posts',
                (posts) => {
                    expect(parse(posts)).toStrictEqual([]);
                }
            ),
        parseAsValidPosts: (parse) =>
            it('should parse valid posts', () => {
                expect(
                    parse(
                        dummyDatasCommonProps.map((data) => ({
                            ...data,
                            [time]: dateTime,
                        }))
                    )
                ).toStrictEqual(dummyDatas);
            }),
        parseInvalidPostsThrowError: (parse) =>
            it.each([
                () => parse(dummyDatas.map(({ id: _, ...props }) => props)),
                () =>
                    parse(
                        dummyDatas.map(({ description: _, ...props }) => props)
                    ),
                () => parse(dummyDatas.map(({ title: _, ...props }) => props)),
                () => parse(dummyDatasCommonProps),
            ])(
                'should fail to parse "%p" as valid properties of posts and throw error',
                (parse) => {
                    expect(parse).toThrowError();
                }
            ),
    };
};

export { generateTestCases };
