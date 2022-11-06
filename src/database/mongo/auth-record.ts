import { Collection, ObjectId, Document } from 'mongodb';
import {
    FilterForUpdateAuth,
    InsertAuth,
    UpdateAuth,
} from '../../common/type/auth-record';
import { assertUpdateOneComplete } from './util';

export default class AuthRecord {
    constructor(private readonly getAuthRecord: () => Collection<Document>) {}
    // testing purpose only
    readonly clear = async () => await this.getAuthRecord().deleteMany({});

    readonly insertOne = async (auth: InsertAuth): Promise<ObjectId> => {
        const { acknowledged, insertedId } =
            await this.getAuthRecord().insertOne(auth);
        if (!acknowledged) {
            throw new Error(`Insert login ${auth} failed`);
        }
        return insertedId;
    };

    readonly updateOne = async (
        filter: FilterForUpdateAuth,
        { timeLoggedOut }: UpdateAuth
    ) =>
        assertUpdateOneComplete(
            await this.getAuthRecord().updateOne(
                {
                    ...filter,
                    timeLoggedOut: undefined,
                },
                {
                    $set: {
                        timeLoggedOut,
                    },
                }
            ),
            {
                debugInfo: filter,
                infoToReturn: filter.authTime,
            }
        );
}
