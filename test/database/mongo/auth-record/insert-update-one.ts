import Database from '../../../../src/database/mongo';
import { beforeEach, describe, expect, it } from 'vitest';

const testInsertUpdate = () =>
    describe('Insert and Update', () => {
        beforeEach(async () => {
            const { authRecordCollection } = await Database.instance();
            await authRecordCollection().clear();
        });
        it('should query, insert, update auth record with defined email', async () => {
            const { authRecordCollection } = await Database.instance();

            const dataOne = {
                aud: 'Adonix-os-blog-local',
                email: 'random@gmail.com',
                timeCreated: new Date(),
                type: 'email-defined',
                uid: 'unique-id',
                authTime: 1,
            } as const;

            const dataTwo = {
                aud: 'Adonix-os-blog-local',
                email: 'random@gmail.com',
                timeCreated: new Date(),
                type: 'email-defined',
                uid: 'unique-id',
                authTime: 2,
            } as const;

            expect(
                (await authRecordCollection().insertOne(dataOne)).toHexString()
            ).toBeTruthy();

            expect(
                (await authRecordCollection().insertOne(dataTwo)).toHexString()
            ).toBeTruthy();

            expect(
                await authRecordCollection().updateOne(
                    {
                        aud: dataTwo.aud,
                        uid: dataTwo.uid,
                        authTime: dataTwo.authTime,
                    },
                    {
                        timeLoggedOut: new Date(),
                    }
                )
            ).toBe(dataTwo.authTime);
        });
    });

export default testInsertUpdate;
