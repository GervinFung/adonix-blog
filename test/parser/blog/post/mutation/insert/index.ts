import { DummyData } from '..';
import blogPropsParser from '../../../../../../src/parser/blog';
import { describe, expect, it } from 'vitest';

const testInsert = (dummyData: DummyData) => {
    describe('Insert', () => {
        const {
            one: { parseAsInsertPost },
        } = blogPropsParser();
        it('should parse data as valid insert post', () => {
            expect(parseAsInsertPost(dummyData)).toStrictEqual(dummyData);
        });
        it.each([
            () =>
                parseAsInsertPost({
                    ...dummyData,
                    title: undefined,
                }),
            () =>
                parseAsInsertPost({
                    ...dummyData,
                    description: undefined,
                }),
            () =>
                parseAsInsertPost({
                    ...dummyData,
                    content: undefined,
                }),
        ])('should fail to parse "%p" and throw error', (parseAsInsertPost) => {
            expect(parseAsInsertPost).toThrowError();
        });
    });
};

export default testInsert;
