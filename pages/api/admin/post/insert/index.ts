import cors, { EndPointFunc } from '../../../../../src/util/api/route/cors';
import auth from '../../../../../src/auth/api';
import adminPropsParser from '../../../../../src/parser/admin';
import Database from '../../../../../src/database/mongo';
import blogPropsParser from '../../../../../src/parser/blog';
import { isAllTextValid } from '../../../../../src/common/validation';

type Response = Readonly<{
    message: string;
}>;

const insert: EndPointFunc<Response> = async (req, res) => {
    await cors<Response>()(req, res);
    const { body } = req;

    await auth().verifyIdToken(
        adminPropsParser().auth.parseAsToken(body.token)
    );

    const post = blogPropsParser().one.parseAsInsertPost(body.post);

    if (!isAllTextValid(post)) {
        return res.status(200).json({
            message: 'Input is invalid',
        });
    }

    const database = await Database.instance();
    const insertedId = await database.postCollection().insertOne({
        ...post,
        timeCreated: new Date(),
    });

    res.status(200).json({
        message: `Inserted post ${insertedId.toHexString()}`,
    });
};

export default insert;
