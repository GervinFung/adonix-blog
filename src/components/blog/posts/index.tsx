import React from 'react';
import { parseAsString } from 'parse-dont-validate';
import { useRouter } from 'next/router';
import { PublishedPosts } from '../../../common/type/post';
import adonixAxios from '../../../axios';
import { api } from '../../../util/const';
import blogPropsParser from '../../../parser/blog';
import { ToastError, ToastPromise } from '../../toastify';
import Preview from './preview';
import usePage from '../../../hook/page';
import PostsUnavailable from './unavailable';

const Posts = () => {
    const router = useRouter();

    const [state, setState] = React.useState({
        posts: [] as PublishedPosts,
        totalPosts: 0,
        isLoaded: false,
    });

    const { posts, totalPosts, isLoaded } = state;

    const { page } = usePage();

    React.useEffect(() => {
        const promise = new Promise<string>((res, rej) =>
            adonixAxios
                .get(`${api.post.paginated}/${page}`)
                .then(({ data }) => {
                    setState((prev) => {
                        const { paginated } = blogPropsParser();
                        return {
                            ...prev,
                            isLoaded: true,
                            posts: paginated.parseAsPublishedPosts(data.posts),
                            totalPosts: paginated.parseAsTotalPosts(
                                data.totalPosts
                            ),
                        };
                    });
                    res('Completed');
                })
                .catch((error) => {
                    setState((prev) => ({
                        ...prev,
                        isLoaded: true,
                    }));
                    rej(error);
                })
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

    const Background = () => (
        <div
            style={{
                backgroundImage: "url('/images/background/bg.webp')",
                width: '100%',
                height: '70vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1,
            }}
        />
    );

    return !isLoaded ? null : !posts.length ? (
        <>
            <Background />
            <PostsUnavailable type="published" />
        </>
    ) : (
        <>
            <Background />
            <Preview
                type="user"
                posts={posts.map(({ timePublished, ...props }) => ({
                    ...props,
                    time: timePublished,
                }))}
                totalPosts={totalPosts}
                page={page}
                onPaginationChange={(page) =>
                    router.push(`/${page}`, undefined, { shallow: true })
                }
            />
        </>
    );
};

export default Posts;
