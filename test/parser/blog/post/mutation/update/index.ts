import { DummyData } from '../';
import { DateTime } from '../../query';
import testDeleted from './delete';
import testPublished from './published';
import testUnpublished from './unpublished';

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
                    it('should fail to parse invalid post and throw error', () => {
                        expect(() =>
                            parse({
                                ...dummyData,
                                title: undefined,
                            })
                        ).toThrowError();
                        expect(() =>
                            parse({
                                ...dummyData,
                                description: undefined,
                            })
                        ).toThrowError();
                        expect(() =>
                            parse({
                                ...dummyData,
                                content: undefined,
                            })
                        ).toThrowError();
                        expect(() =>
                            parse({
                                ...dummyData,
                                [time]: undefined,
                            })
                        ).toThrowError();
                    }),
            };
        };

        testPublished(generateTestCases('timePublished'));
        testDeleted(generateTestCases('timeDeleted'));
        testUnpublished(generateTestCases('timeCreated'));
    });
};

export type { TestCases };
export default testUpdate;
