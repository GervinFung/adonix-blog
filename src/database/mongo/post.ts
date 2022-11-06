import { Collection, ObjectId, Document } from 'mongodb';
import {
    ChangeStringIdToMongoId,
    InsertPost,
    PublishedPosts,
    UnpublishedPosts,
    DeletedPost,
    UnpublishedPost,
    PublishedPost,
    DeletedPosts,
    PostsQueryOption,
    UpdateDeletedPost,
    UpdatePublishedPost,
    UpdateUnpublishedPost,
} from '../../common/type/post';
import nullableToUndefinedPropsParser from '../../parser/type';
import { postsPerPage } from '../../util/const';
import { assertUpdateOneComplete } from './util';

type ShowManyOptions = Readonly<{
    skip: number;
}>;

export default class Post {
    private readonly nullToUndefinedParser: ReturnType<
        typeof nullableToUndefinedPropsParser
    >;

    constructor(private readonly getPost: () => Collection<Document>) {
        this.nullToUndefinedParser = nullableToUndefinedPropsParser();
    }

    // testing purpose only
    readonly clear = async () => await this.getPost().deleteMany({});

    private readonly totalPosts = async (
        queryOption: PostsQueryOption
    ): Promise<number> =>
        (await this.getPost().find(this.postQuery(queryOption)).toArray())
            .length;

    readonly totalUnpublishedPosts = () => this.totalPosts('unpublished');

    readonly totalPublishedPosts = () => this.totalPosts('published');

    readonly totalDeletedPosts = () => this.totalPosts('deleted');

    private readonly postQuery = (option: PostsQueryOption) => {
        switch (option) {
            case 'unpublished':
                return {
                    timeDeleted: null,
                    timePublished: null,
                };
            case 'published':
                return {
                    timeDeleted: null,
                    //ref: https://www.mongodb.com/docs/manual/reference/operator/query/
                    timePublished: {
                        $ne: null,
                    },
                };
            case 'deleted':
                return {
                    timePublished: null,
                    timeDeleted: {
                        $ne: null,
                    },
                };
        }
    };

    private readonly showOne = async <
        T = DeletedPost | PublishedPost | UnpublishedPost
    >(
        id: ObjectId,
        type: PostsQueryOption
    ) => {
        const timeFieldRequired =
            type === 'published'
                ? 'timePublished'
                : type === 'unpublished'
                ? 'timeCreated'
                : 'timeDeleted';
        const post = await this.getPost().findOne<T>(
            {
                _id: id,
                ...this.postQuery(type),
            },
            {
                projection: {
                    _id: 0,
                    title: 1,
                    description: 1,
                    content: 1,
                    imagePath: 1,
                    [timeFieldRequired]: 1,
                },
            }
        );
        if (post) {
            return this.nullToUndefinedParser.parseObject(post) as T;
        }
        if (
            !(await this.getPost().findOne<T>(
                {
                    _id: id,
                },
                {
                    projection: {
                        _id: 1,
                    },
                }
            ))
        ) {
            throw new Error(
                `Cannot query for post with invalid id of ${id.toHexString()}`
            );
        }
        return undefined;
    };

    readonly showDeletedOne = (id: ObjectId) =>
        this.showOne<DeletedPost>(id, 'deleted');

    readonly showUnpublishedOne = (id: ObjectId) =>
        this.showOne<UnpublishedPost>(id, 'unpublished');

    readonly showPublishedOne = (id: ObjectId) =>
        this.showOne<PublishedPost>(id, 'published');

    private readonly showMany = async <
        T extends UnpublishedPosts | PublishedPosts | DeletedPosts
    >(
        { skip }: ShowManyOptions,
        type: PostsQueryOption
    ) => {
        const timeFieldRequired =
            type === 'published'
                ? 'timePublished'
                : type === 'unpublished'
                ? 'timeCreated'
                : 'timeDeleted';
        return (
            await this.getPost()
                .find<ChangeStringIdToMongoId<T[0]>>(this.postQuery(type), {
                    projection: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        imagePath: 1,
                        [timeFieldRequired]: 1,
                    },
                })
                .limit(postsPerPage)
                .skip(skip * postsPerPage)
                .sort({
                    [timeFieldRequired]: -1,
                })
                .toArray()
        ).map(({ _id, ...props }) => ({
            ...props,
            id: _id.toHexString(),
        }));
    };

    readonly showManyUnpublished = (options: ShowManyOptions) =>
        this.showMany<UnpublishedPosts>(options, 'unpublished');

    readonly showManyPublished = (options: ShowManyOptions) =>
        this.showMany<PublishedPosts>(options, 'published');

    readonly showManyDeleted = (options: ShowManyOptions) =>
        this.showMany<DeletedPosts>(options, 'deleted');

    private readonly updateOne = async <
        T = UpdateDeletedPost | UpdatePublishedPost | UpdateUnpublishedPost
    >(
        post: T,
        queryOption: PostsQueryOption,
        id: ObjectId,
        timeUpdated: Date
    ) =>
        assertUpdateOneComplete(
            await this.getPost().updateOne(
                {
                    _id: id,
                    ...this.postQuery(queryOption),
                },
                {
                    $set: {
                        ...post,
                        timeUpdated,
                    },
                }
            ),
            {
                debugInfo: id,
                infoToReturn: id,
            }
        );

    readonly deleteOne = async (id: ObjectId): Promise<ObjectId> =>
        assertUpdateOneComplete(
            await this.getPost().updateOne(
                {
                    _id: id,
                    timeDeleted: undefined,
                },
                {
                    $set: {
                        timeDeleted: new Date(),
                        timeUpdated: new Date(),
                        timePublished: undefined,
                    },
                }
            ),
            {
                debugInfo: id,
                infoToReturn: id,
            }
        );

    readonly updateUnpublishedOne = async (
        post: UpdateUnpublishedPost,
        id: ObjectId,
        timeUpdated: Date
    ): Promise<ObjectId> =>
        this.updateOne<UpdateUnpublishedPost>(
            post,
            'unpublished',
            id,
            timeUpdated
        );

    readonly updateDeletedOne = async (
        post: UpdateDeletedPost,
        id: ObjectId,
        timeUpdated: Date
    ): Promise<ObjectId> =>
        this.updateOne<UpdateDeletedPost>(post, 'deleted', id, timeUpdated);

    readonly unpublishOne = async (id: ObjectId) =>
        assertUpdateOneComplete(
            await this.getPost().updateOne(
                {
                    _id: id,
                    timeDeleted: undefined,
                    timePublished: {
                        $ne: undefined,
                    },
                },
                {
                    $set: {
                        timePublished: undefined,
                        timeUpdated: new Date(),
                    },
                }
            ),
            {
                debugInfo: id,
                infoToReturn: id,
            }
        );
    readonly publishOne = async (id: ObjectId) =>
        assertUpdateOneComplete(
            await this.getPost().updateOne(
                {
                    _id: id,
                    timeDeleted: undefined,
                    timePublished: undefined,
                },
                {
                    $set: {
                        timePublished: new Date(),
                        timeUpdated: new Date(),
                    },
                }
            ),
            {
                debugInfo: id,
                infoToReturn: id,
            }
        );

    readonly updatePublishedOne = async (
        post: UpdatePublishedPost,
        id: ObjectId,
        timeUpdated: Date
    ): Promise<ObjectId> =>
        this.updateOne<UpdatePublishedPost>(post, 'published', id, timeUpdated);

    readonly bulkInsert = async (
        posts: ReadonlyArray<InsertPost>
    ): Promise<
        Readonly<{
            [key: number]: ObjectId;
        }>
    > => {
        const { acknowledged, insertedIds, insertedCount } =
            await this.getPost().insertMany(Array.from(posts));
        if (!(acknowledged && insertedCount === posts.length)) {
            throw new Error(
                `Faulty insertion, acknowledged: ${acknowledged}, insertedCount: ${insertedCount} and length: ${posts.length}`
            );
        }
        return insertedIds;
    };

    readonly insertOne = async (post: InsertPost): Promise<ObjectId> => {
        const { acknowledged, insertedId } = await this.getPost().insertOne({
            ...post,
            timeDeleted: undefined,
            timePublished: undefined,
        });
        if (!acknowledged) {
            throw new Error(`Insert post ${post} failed`);
        }
        return insertedId;
    };

    readonly restoreOne = async (id: ObjectId) =>
        assertUpdateOneComplete(
            await this.getPost().updateOne(
                {
                    _id: id,
                    timeDeleted: {
                        $ne: undefined,
                    },
                },
                {
                    $set: {
                        timeDeleted: undefined,
                        timeUpdated: new Date(),
                    },
                }
            ),
            {
                debugInfo: id,
                infoToReturn: id,
            }
        );
}
