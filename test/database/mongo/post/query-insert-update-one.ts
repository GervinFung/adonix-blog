import promisifyMongoDb from '../../../../src/database/mongo';

const testQueryInsertUpdateOne = () =>
    describe('Query, Insert and Update', () => {
        const dummy = {
            content: 'Hello Eillie',
            description: 'Hello to a friend of mine',
            title: 'A friend',
            timeCreated: new Date(),
            imagePath: 'imagePath',
        };
        const dataCommonProps = {
            title: 'New title',
            content: 'New content',
            description: 'New description',
            imagePath: 'imagePath',
        };
        beforeEach(async () => {
            const { postCollection } = await promisifyMongoDb;
            await postCollection.clear();
        });
        it('should insert, update and query an unpublished post', async () => {
            const { postCollection } = await promisifyMongoDb;

            const id = await postCollection.insertOne(dummy);
            expect(id).toBeTruthy();

            const data = {
                ...dataCommonProps,
                timeCreated: dummy.timeCreated,
            };

            expect(
                (
                    await postCollection.updateUnpublishedOne(
                        data,
                        id,
                        new Date()
                    )
                ).toHexString()
            ).toBe(id.toHexString());

            expect(await postCollection.showUnpublishedOne(id)).toStrictEqual(
                data
            );
        });
        it('should insert, update and query an deleted post', async () => {
            const { postCollection } = await promisifyMongoDb;
            const id = await postCollection.insertOne(dummy);

            const data = {
                ...dataCommonProps,
                timeDeleted: new Date(),
            };

            await postCollection.deleteOne(id);

            expect(
                (
                    await postCollection.updateDeletedOne(data, id, new Date())
                ).toHexString()
            ).toBe(id.toHexString());

            expect(await postCollection.showDeletedOne(id)).toStrictEqual(data);
        });
        it('should insert, update and query an published post', async () => {
            const { postCollection } = await promisifyMongoDb;

            const id = await postCollection.insertOne(dummy);

            const data = {
                ...dataCommonProps,
                timePublished: new Date(),
            };

            await postCollection.publishOne(id);

            expect(
                (
                    await postCollection.updatePublishedOne(
                        data,
                        id,
                        new Date()
                    )
                ).toHexString()
            ).toBe(id.toHexString());

            expect(await postCollection.showPublishedOne(id)).toStrictEqual(
                data
            );
        });
    });

export default testQueryInsertUpdateOne;
