import dotenv from 'dotenv';
import { parseAsStringEnv } from 'esbuild-env-parsing';

const mongodbConfig = () => {
    dotenv.config({
        path: `${process.cwd()}/.env${
            process.env.NODE_ENV === 'test' ? '.test' : ''
        }`,
    });

    return {
        port: process.env.MONGO_PORT,
        srv: process.env.MONGO_SRV,
        dbName: parseAsStringEnv({
            env: process.env.MONGO_DB,
            name: 'MONGO_DB',
        }),
        address: parseAsStringEnv({
            env: process.env.MONGO_ADDRESS,
            name: 'MONGO_ADDRESS',
        }),
        collections: {
            post: parseAsStringEnv({
                env: process.env.MONGO_COLLECTION_POST,
                name: 'MONGO_COLLECTION_POST',
            }),
            authRecord: parseAsStringEnv({
                env: process.env.MONGO_COLLECTION_AUTH_RECORD,
                name: 'MONGO_COLLECTION_AUTH_RECORD',
            }),
        },
        auth: {
            user: parseAsStringEnv({
                env: process.env.MONGO_USER,
                name: 'MONGO_USER',
            }),
            password: parseAsStringEnv({
                env: process.env.MONGO_PASSWORD,
                name: 'MONGO_PASSWORD',
            }),
        },
    } as const;
};

export default mongodbConfig;
