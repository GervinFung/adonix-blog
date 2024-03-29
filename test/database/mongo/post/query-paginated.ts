import { ObjectId } from 'mongodb';
import Database from '../../../../src/database/mongo';
import { beforeAll, it, describe, expect } from 'vitest';

const testQueryPaginated = () =>
    describe('Paginated Query', () => {
        const dummyData = Array.from({ length: 36 }, (_, index) => {
            const timeStamp = `2022-05-12T14:53:${
                index >= 10 ? index : `0${index}`
            }.165Z`;
            const data = {
                _id: new ObjectId(),
                content: `Content ${index}`,
                description: `Description ${index}`,
                title: `Title ${index}`,
                imagePath: `Image ${index}`,
                timeCreated: new Date(timeStamp),
                timeUpdated: new Date('2022-05-12T14:53:00.165Z'),
                timePublished: new Date(timeStamp),
                timeDeleted: undefined,
            };
            if (index < 18) {
                return data;
            }
            if (index < 27) {
                return {
                    ...data,
                    timePublished: undefined,
                };
            }
            return {
                ...data,
                timePublished: undefined,
                timeDeleted: new Date(timeStamp),
            };
        });
        beforeAll(async () => {
            const { postCollection } = await Database.instance();
            await postCollection().clear();
            await postCollection().bulkInsert(dummyData);
        });
        it('should query paginated posts', async () => {
            const paginatePublishedDummyData = ({
                start,
                end,
            }: Readonly<{
                start: number;
                end: number;
            }>) =>
                dummyData
                    .filter((_, index) => index >= start && index <= end)
                    .flatMap(
                        ({
                            _id,
                            title,
                            description,
                            timePublished,
                            imagePath,
                        }) =>
                            !timePublished
                                ? []
                                : [
                                      {
                                          id: _id.toHexString(),
                                          title,
                                          description,
                                          timePublished,
                                          imagePath,
                                      },
                                  ]
                    )
                    .sort(
                        (a, b) =>
                            b.timePublished.getTime() -
                            a.timePublished.getTime()
                    );

            const { postCollection } = await Database.instance();

            // published posts
            expect(
                (await postCollection().showManyPublished({ skip: 2 })).length
            ).toBe(0);
            expect(
                await postCollection().showManyPublished({ skip: 0 })
            ).toStrictEqual(
                paginatePublishedDummyData({
                    start: 9,
                    end: 17,
                })
            );
            expect(
                await postCollection().showManyPublished({ skip: 1 })
            ).toStrictEqual(
                paginatePublishedDummyData({
                    start: 0,
                    end: 8,
                })
            );

            // unpublished posts
            expect(
                (await postCollection().showManyUnpublished({ skip: 1 })).length
            ).toBe(0);
            expect(
                await postCollection().showManyUnpublished({
                    skip: 0,
                })
            ).toStrictEqual(
                dummyData
                    .filter((_, index) => index >= 18 && index <= 26)
                    .map(
                        ({
                            _id,
                            title,
                            description,
                            timeCreated,
                            imagePath,
                        }) => ({
                            id: _id.toHexString(),
                            title,
                            description,
                            timeCreated,
                            imagePath,
                        })
                    )
                    .sort(
                        (a, b) =>
                            b.timeCreated.getTime() - a.timeCreated.getTime()
                    )
            );

            // deleted posts
            expect(
                (await postCollection().showManyDeleted({ skip: 1 })).length
            ).toBe(0);

            expect(
                await postCollection().showManyDeleted({
                    skip: 0,
                })
            ).toStrictEqual(
                dummyData
                    .flatMap(
                        ({ _id, title, description, timeDeleted, imagePath }) =>
                            !timeDeleted
                                ? []
                                : [
                                      {
                                          id: _id.toHexString(),
                                          title,
                                          description,
                                          timeDeleted,
                                          imagePath,
                                      },
                                  ]
                    )
                    .sort(
                        (a, b) =>
                            b.timeDeleted.getTime() - a.timeDeleted.getTime()
                    )
            );
        });
        it('should return total number of deleted posts', async () => {
            const database = await Database.instance();
            expect(await database.postCollection().totalDeletedPosts()).toBe(
                dummyData.filter((data) => data.timeDeleted).length
            );
        });
        it('should return total number of unpublished posts', async () => {
            const database = await Database.instance();
            expect(
                await database.postCollection().totalUnpublishedPosts()
            ).toBe(
                dummyData.filter(
                    (data) => !data.timePublished && !data.timeDeleted
                ).length
            );
        });
        it('should return total number of published posts', async () => {
            const database = await Database.instance();
            expect(await database.postCollection().totalPublishedPosts()).toBe(
                dummyData.filter((data) => data.timePublished).length
            );
        });
        it('should return true for published + unpublished + deleted post equal to total posts', async () => {
            const { postCollection } = await Database.instance();
            expect(
                (await postCollection().totalPublishedPosts()) +
                    (await postCollection().totalUnpublishedPosts()) +
                    (await postCollection().totalDeletedPosts())
            ).toBe(dummyData.length);
        });
    });

export default testQueryPaginated;
