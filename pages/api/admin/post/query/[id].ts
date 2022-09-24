import promisifyMongoDb from '../../../../../src/database/mongo';
import cors, { EndPointFunc } from '../../../../../src/util/api/route/cors';
import { formObjectIdFromString } from '../../../../../src/database/mongo/util';
import { AdminHandlePost } from '../../../../../src/common/type/post';
import blogPropsParser from '../../../../../src/parser/blog';
import auth from '../../../../../src/auth/api';
import adminPropsParser from '../../../../../src/parser/admin';

type Response = AdminHandlePost;

const query: EndPointFunc<Response> = async (req, res) => {
    await cors<Response>()(req, res);
    const { query } = req;
    const { postCollection } = await promisifyMongoDb;

    const { auth: authParser, posts } = adminPropsParser();

    await auth.verifyIdToken(authParser.parseAsToken(query.token));

    const type = posts.parseAsPostQueryOption(query.queryOption);

    switch (type) {
        case 'published':
            return res.status(200).json({
                type,
                post: await postCollection.showPublishedOne(
                    formObjectIdFromString(
                        blogPropsParser().one.parseAsId(query.id)
                    )
                ),
            });
        case 'unpublished':
            return res.status(200).json({
                type,
                post: await postCollection.showUnpublishedOne(
                    formObjectIdFromString(
                        blogPropsParser().one.parseAsId(query.id)
                    )
                ),
            });
        case 'deleted':
            return res.status(200).json({
                type,
                post: await postCollection.showDeletedOne(
                    formObjectIdFromString(
                        blogPropsParser().one.parseAsId(query.id)
                    )
                ),
            });
    }
};

export default query;
