import * as React from 'react';
import { useRouter } from 'next/router';
import { parseAsString } from 'parse-dont-validate';
import { AdonixBlogContext } from '../../../../pages/_app';
import adonisAxios from '../../../axios';
import { AdminHandlePosts } from '../../../common/type/post';
import usePage from '../../../hook/page';
import adminPropsParser from '../../../parser/admin';
import blogPropsParser from '../../../parser/blog';
import { api } from '../../../util/const';
import Preview from '../../blog/posts/preview';
import { ToastError, ToastPromise } from '../../toastify';
import { admin as adminConst } from '../../../util/const';
import { Option } from '../common';
import Unauthenticated from '../auth/unauthenticated';

const Posts = () => {
    const [state, setState] = React.useState<AdminHandlePosts>({
        totalPosts: 0,
        type: 'published',
        posts: [],
    });

    const router = useRouter();
    const adminParser = adminPropsParser();

    const { page } = usePage();
    const { admin } = React.useContext(AdonixBlogContext);
    const { totalPosts, type, posts } = state;
    const { query } = router;

    const queryOption = adminParser.posts.parseAsNullablePostQueryOption(
        query.queryOption
    );

    React.useEffect(() => {
        if (!admin || !queryOption) {
            return;
        }
        const promise = new Promise<string>((res, rej) =>
            admin
                .getIdToken()
                .then((token) =>
                    adonisAxios
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
                            res('Completed');
                        })
                        .catch(rej)
                )
                .catch(rej)
        );
        ToastPromise({
            promise,
            pending: 'Querying posts...',
            success: {
                render: ({ data }) =>
                    parseAsString(data).orElseThrowDefault('data'),
            },
            error: {
                render: ({ data }) => ToastError(data),
            },
        });
    }, [queryOption, page, admin?.uid]);

    if (!queryOption) {
        return null;
    }

    if (!admin) {
        return <Unauthenticated />;
    }

    return (
        <>
            <Option
                label="Post Status"
                isUseDisabled={false}
                options={adminConst.postQueryOptions}
                onOptionSelected={(queryOption) =>
                    router.push(`/admin/posts/1?queryOption=${queryOption}`)
                }
                value={queryOption}
            />
            <Preview
                type="admin"
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
