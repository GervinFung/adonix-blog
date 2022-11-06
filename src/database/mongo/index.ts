import { MongoClient } from 'mongodb';
import mongodbConfig from './config';
import AuthRecord from './auth-record';
import Post from './post';

export default class Database {
    private readonly post: Post;
    private readonly authRecord: AuthRecord;

    private static readonly create = async () => {
        const config = mongodbConfig();
        const client = (() => {
            const createURL = ({
                srv,
                port,
            }: Readonly<{
                srv: string | undefined;
                port: string | undefined;
            }>) => {
                if (srv) {
                    return `mongodb${srv}://${user}:${password}@${address}/${dbName}?authSource=admin&retryWrites=true&w=majority`;
                }
                if (port) {
                    return `mongodb://${user}:${password}@${address}:${port}/${dbName}?authSource=admin&retryWrites=true&w=majority`;
                }
                throw new Error('Port or SRV are not defined');
            };

            const {
                auth: { user, password },
                dbName,
                port,
                address,
                srv,
            } = config;
            return new MongoClient(createURL({ srv, port }));
        })();

        await client.connect();
        return new this(client, config);
    };

    private static database: Promise<Database> | undefined = undefined;

    static readonly instance = (): Promise<Database> => {
        const { database } = this;
        switch (typeof database) {
            case 'undefined': {
                this.database = Database.create();
                return this.database;
            }
        }
        return database;
    };

    private constructor(
        private readonly client: MongoClient,
        config: ReturnType<typeof mongodbConfig>
    ) {
        const database = this.client.db(config.dbName);

        const { collections } = config;

        this.post = new Post(() => database.collection(collections.post));
        this.authRecord = new AuthRecord(() =>
            database.collection(collections.authRecordCollection)
        );
    }

    readonly postCollection = () => this.post;

    readonly authRecordCollection = () => this.authRecord;

    readonly close = () => this.client.close();
}
