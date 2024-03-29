import cors, { EndPointFunc } from '../../../../../src/util/api/route/cors';
import auth from '../../../../../src/auth/api';
import adminPropsParser from '../../../../../src/parser/admin';
import Database from '../../../../../src/database/mongo';
import blogPropsParser from '../../../../../src/parser/blog';
import { ObjectId } from 'mongodb';
import { isAllTextValid } from '../../../../../src/common/validation';

type Response = Readonly<{
    message: string;
}>;

const update: EndPointFunc<Response> = async (req, res) => {
    await cors<Response>()(req, res);
    const { body, query } = req;

    await auth().verifyIdToken(
        adminPropsParser().auth.parseAsToken(body.token)
    );

    const { one } = blogPropsParser();

    const id = one.parseAsId(query.id);

    const { posts } = adminPropsParser();

    const database = await Database.instance();

    const objectId = new ObjectId(id);

    const updatedId = await (async () => {
        switch (posts.parseAsPostQueryOption(body.queryOption)) {
            case 'published': {
                const post = one.parseAsUpdatePublishedPost(body.post);
                if (isAllTextValid(post)) {
                    return await database
                        .postCollection()
                        .updatePublishedOne(post, objectId, new Date());
                }
                break;
            }
            case 'unpublished': {
                const post = one.parseAsUpdateUnpublishedPost(body.post);
                if (isAllTextValid(post)) {
                    return await database
                        .postCollection()
                        .updateUnpublishedOne(post, objectId, new Date());
                }
                break;
            }
            case 'deleted': {
                const post = one.parseAsUpdateDeletedPost(body.post);
                if (isAllTextValid(post)) {
                    return await database
                        .postCollection()
                        .updateDeletedOne(post, objectId, new Date());
                }
                break;
            }
        }
        return undefined;
    })();

    if (!updatedId) {
        return res.status(200).json({
            message: 'Input is invalid',
        });
    }

    const updatedStatusId = await (async () => {
        switch (posts.parseAsNullablePostStatus(body.status)) {
            case 'publish': {
                return await database.postCollection().publishOne(objectId);
            }
            case 'restore': {
                return await database.postCollection().restoreOne(objectId);
            }
            case 'unpublish': {
                return await database.postCollection().unpublishOne(objectId);
            }
            case 'delete': {
                return await database.postCollection().deleteOne(objectId);
            }
        }
        return undefined;
    })();

    if (!updatedStatusId) {
        return res.status(200).json({
            message: `Updated post ${updatedId.toHexString()}`,
        });
    }

    if (updatedStatusId.toHexString() !== updatedId.toHexString()) {
        throw new Error(
            `status updated for: ${updatedStatusId} while the entire post updated was ${updatedId}`
        );
    }

    res.status(200).json({
        message: `Updated post ${updatedId.toHexString()}`,
    });
};

export default update;
