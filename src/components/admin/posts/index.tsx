import React from 'react';
import { useRouter } from 'next/router';
import adonixAxios from '../../../axios';
import { AdminHandlePosts } from '../../../common/type/post';
import usePage from '../../../hook/page';
import adminPropsParser from '../../../parser/admin';
import blogPropsParser from '../../../parser/blog';
import { api } from '../../../util/const';
import Preview from '../../blog/posts/preview';
import { ToastPromise } from '../../toastify';
import { admin as adminConst } from '../../../util/const';
import { Option } from '../common';
import PostsUnavailable from '../../blog/posts/unavailable';
import { NonNullableAdonixAdmin } from '../../../auth/web';
import { processErrorMessage } from '../../../util/error';
import Skeleton from '@mui/material/Skeleton';

const Posts = ({
    admin,
}: Readonly<{
    admin: NonNullableAdonixAdmin;
}>) => {
    const [state, setState] = React.useState<
        AdminHandlePosts &
            Readonly<{
                isLoaded: boolean;
            }>
    >({
        totalPosts: 0,
        type: 'published',
        posts: [],
        isLoaded: false,
    });

    const router = useRouter();
    const adminParser = adminPropsParser();

    const { page } = usePage();
    const { totalPosts, type, posts, isLoaded } = state;
    const { query } = router;

    const queryOption = adminParser.posts.parseAsNullablePostQueryOption(
        query.queryOption
    );

    React.useEffect(() => {
        if (!queryOption) {
            return;
        }
        const promise = new Promise<string>((resolve, reject) => {
            admin
                .getIdToken()
                .then((token) =>
                    adonixAxios
                        .get(
                            `${api.post.paginated}/${page}?queryOption=${queryOption}&token=${token}`
                        )
                        .then(({ data }) => {
                            setState((prev) => {
                                const { paginated } = blogPropsParser();
                                const { posts } = adminParser;
                                const type = posts.parseAsPostQueryOption(
                                    data.type
                                );

                                return {
                                    ...prev,
                                    isLoaded: true,
                                    totalPosts: paginated.parseAsTotalPosts(
                                        data.totalPosts
                                    ),
                                    ...(() => {
                                        switch (type) {
                                            case 'published':
                                                return {
                                                    type,
                                                    posts: paginated.parseAsPublishedPosts(
                                                        data.posts
                                                    ),
                                                };
                                            case 'unpublished':
                                                return {
                                                    type,
                                                    posts: paginated.parseAsUnpublishedPosts(
                                                        data.posts
                                                    ),
                                                };
                                            case 'deleted':
                                                return {
                                                    type,
                                                    posts: paginated.parseAsDeletedPosts(
                                                        data.posts
                                                    ),
                                                };
                                        }
                                    })(),
                                };
                            });
                            return resolve('Completed');
                        })
                        .catch((error) => {
                            setState((prev) => ({
                                ...prev,
                                isLoaded: true,
                            }));
                            throw new Error(processErrorMessage(error));
                        })
                )
                .catch((error) => reject(processErrorMessage(error)));
        });
        ToastPromise({
            promise,
            pending: 'Querying posts...',
        });
    }, [queryOption, page]);

    if (!queryOption || !isLoaded) {
        return <Skeleton />;
    }

    if (!posts.length) {
        return <PostsUnavailable type={type} />;
    }

    return (
        <>
            <Option
                label="Post Status"
                isUseDisabled={false}
                options={adminConst.postQueryOptions}
                onOptionSelected={(queryOption) =>
                    router.push(`/admin/1?queryOption=${queryOption}`)
                }
                value={queryOption}
            />
            <Preview
                type="admin"
                isLoaded={isLoaded}
                queryOption={queryOption}
                posts={(() => {
                    switch (type) {
                        case 'published':
                            return posts.map(({ timePublished, ...props }) => ({
                                ...props,
                                time: timePublished,
                            }));
                        case 'unpublished':
                            return posts.map(({ timeCreated, ...props }) => ({
                                ...props,
                                time: timeCreated,
                            }));
                        case 'deleted':
                            return posts.map(({ timeDeleted, ...props }) => ({
                                ...props,
                                time: timeDeleted,
                            }));
                    }
                })()}
                totalPosts={totalPosts}
                page={page}
                onPaginationChange={(page) =>
                    router.push(
                        `/admin/posts/${page}?queryOption=${queryOption}`
                    )
                }
            />
        </>
    );
};

export default Posts;
