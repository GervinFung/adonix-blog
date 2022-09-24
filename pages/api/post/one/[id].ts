import promisifyMongoDb from '../../../../src/database/mongo';
import cors, { EndPointFunc } from '../../../../src/util/api/route/cors';
import { formObjectIdFromString } from '../../../../src/database/mongo/util';
import { UserReadPublishedPost } from '../../../../src/common/type/post';
import blogPropsParser from '../../../../src/parser/blog';

type Response = UserReadPublishedPost;

const one: EndPointFunc<Response> = async (req, res) => {
    await cors<Response>()(req, res);
    const { query } = req;
    const { postCollection } = await promisifyMongoDb;
    res.status(200).json({
        post: await postCollection.showPublishedOne(
            formObjectIdFromString(blogPropsParser().one.parseAsId(query.id))
        ),
    });
};

export default one;
