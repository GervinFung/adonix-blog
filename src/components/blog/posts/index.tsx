import * as React from 'react';
import { parseAsString } from 'parse-dont-validate';
import { useRouter } from 'next/router';
import { PublishedPosts } from '../../../common/type/post';
import adonisAxios from '../../../axios';
import { api } from '../../../util/const';
import blogPropsParser from '../../../parser/blog';
import { ToastError, ToastPromise } from '../../toastify';
import Preview from './preview';
import usePage from '../../../hook/page';

const Posts = () => {
    const router = useRouter();

    const [state, setState] = React.useState({
        posts: [] as PublishedPosts,
        totalPosts: 0,
    });

    const { posts, totalPosts } = state;

    const { page } = usePage();

    React.useEffect(() => {
        const promise = new Promise<string>((res, rej) =>
            adonisAxios
                .get(`${api.post.paginated}/${page}`)
                .then(({ data }) => {
                    setState((prev) => {
                        const { paginated } = blogPropsParser();
                        return {
                            ...prev,
                            posts: paginated.parseAsPublishedPosts(data.posts),
                            totalPosts: paginated.parseAsTotalPosts(
                                data.totalPosts
                            ),
                        };
                    });
                    res('Completed');
                })
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
    }, [page]);

    return (
        <Preview
            type="user"
            posts={posts.map(({ timePublished, ...props }) => ({
                ...props,
                time: timePublished,
            }))}
            totalPosts={totalPosts}
            page={page}
            onPaginationChange={(page) => router.push(`/posts/${page}`)}
        />
    );
};

export default Posts;
