import cors, { EndPointFunc } from '../../../src/util/api/route/cors';
import auth from '../../../src/auth/api';
import adminPropsParser from '../../../src/parser/admin';
import promisifyMongoDb from '../../../src/database/mongo';
import { Aud } from '../../../src/common/type/auth-record';

type Response = Readonly<{
    message: string;
}>;

const login: EndPointFunc<Response> = async (req, res) => {
    await cors<Response>()(req, res);
    const { body } = req;
    const token = adminPropsParser().auth.parseAsToken(body.token);

    const mongo = await promisifyMongoDb;
    const verifiedId = await auth.verifyIdToken(token);
    const { email, aud, uid, auth_time: authTime } = verifiedId;
    const data = {
        authTime,
        uid,
        aud: aud as Aud,
        timeCreated: new Date(),
    };

    if (!email) {
        throw new Error(`Email is undefined for token of ${token}`);
    }

    await mongo.authRecordCollection.insertOne({
        ...data,
        email,
    });

    res.status(200).json({
        message: 'valid',
    });
};

export default login;
