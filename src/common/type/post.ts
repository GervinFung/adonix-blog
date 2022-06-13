import { ObjectId } from 'mongodb';
import { admin } from '../../util/const';

type Post = Readonly<{
    id: ObjectId;
    timeCreated: Date;
    timeUpdated: Date | undefined;
    timePublished: Date | undefined;
    timeDeleted: Date | undefined;
    content: string;
    description: string;
    title: string;
}>;

type PostCommonProps = Pick<Post, 'content' | 'description' | 'title'>;

type PublishedPost =
    | undefined
    | (PostCommonProps &
          Readonly<{
              timePublished: NonNullable<Post['timePublished']>;
          }>);

type NonNullablePublishedPost = NonNullable<PublishedPost>;

type UnpublishedPost =
    | undefined
    | (PostCommonProps & Pick<Post, 'timeCreated'>);

type NonNullableUnpublishedPost = NonNullable<UnpublishedPost>;

type DeletedPost =
    | undefined
    | (PostCommonProps &
          Readonly<{
              timeDeleted: Date;
          }>);

type NonNullableDeletedPost = NonNullable<DeletedPost>;

type InsertPost = NonNullableUnpublishedPost;

type InsertPostExcludeTimeCreated = Omit<InsertPost, 'timeCreated'>;

type UpdatePostCommonProps = Pick<Post, 'content' | 'description' | 'title'>;

type UpdatePublishedPost = UpdatePostCommonProps &
    Readonly<{
        timePublished: NonNullable<Post['timePublished']>;
    }>;

type UpdateUnpublishedPost = UpdatePostCommonProps &
    Readonly<{
        timeCreated: Post['timeCreated'];
    }>;

type UpdateDeletedPost = UpdatePostCommonProps &
    Readonly<{
        timeDeleted: NonNullable<Post['timeDeleted']>;
    }>;

type StringId = Readonly<{
    id: string;
}>;

type PublishedPosts = ReadonlyArray<
    StringId & Omit<NonNullablePublishedPost, 'content'>
>;

type UnpublishedPosts = ReadonlyArray<
    StringId & Omit<NonNullableUnpublishedPost, 'content'>
>;

type DeletedPosts = ReadonlyArray<
    StringId & Omit<NonNullableDeletedPost, 'content'>
>;

type ChangeStringIdToMongoId<T extends StringId> = Omit<T, 'id'> &
    Readonly<{
        _id: ObjectId;
    }>;

type ChangeIdToString<
    T extends {
        id: ObjectId;
    }
> = Omit<T, 'id'> & StringId;

type AdminHandlePosts = Readonly<
    {
        totalPosts: number;
    } & (
        | {
              type: 'published';
              posts: PublishedPosts;
          }
        | {
              type: 'unpublished';
              posts: UnpublishedPosts;
          }
        | {
              type: 'deleted';
              posts: DeletedPosts;
          }
    )
>;

type UserReadPosts = Readonly<{
    posts: PublishedPosts;
    totalPosts: number;
}>;

type PostsQueryOption = typeof admin.postQueryOptions[number];

type UserReadPublishedPost = Readonly<{
    post: PublishedPost;
}>;

type AdminHandlePost = Readonly<
    | {
          type: 'published';
          post: PublishedPost;
      }
    | {
          type: 'unpublished';
          post: UnpublishedPost;
      }
    | {
          type: 'deleted';
          post: DeletedPost;
      }
>;

type UpdatePostStatus = typeof admin.updatePostStatus[number];

export type {
    PublishedPosts,
    InsertPost,
    ChangeStringIdToMongoId,
    InsertPostExcludeTimeCreated,
    ChangeIdToString,
    UnpublishedPosts,
    UnpublishedPost,
    DeletedPost,
    PublishedPost,
    DeletedPosts,
    PostCommonProps,
    AdminHandlePosts,
    UserReadPosts,
    PostsQueryOption,
    UserReadPublishedPost,
    AdminHandlePost,
    UpdatePostStatus,
    NonNullablePublishedPost,
    NonNullableUnpublishedPost,
    NonNullableDeletedPost,
    StringId,
    UpdateDeletedPost,
    UpdatePublishedPost,
    UpdateUnpublishedPost,
    UpdatePostCommonProps,
};
