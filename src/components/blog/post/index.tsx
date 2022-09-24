import React from 'react';
import adonixAxios from '../../../axios';
import { api } from '../../../util/const';
import blogPropsParser from '../../../parser/blog';
import { ToastError, ToastPromise } from '../../toastify';
import { parseAsString } from 'parse-dont-validate';
import { UserReadPublishedPost } from '../../../common/type/post';
import { useRouter } from 'next/router';
import Preview from './preview';
import PostUnavailable from './unavailable';

const Post = () => {
    const router = useRouter();
    const { query } = router;

    const [state, setState] = React.useState({
        post: undefined as UserReadPublishedPost['post'] | undefined,
        isLoaded: false,
    });

    const { post, isLoaded } = state;

    const id = typeof query.id === 'string' ? query.id : undefined;

    React.useEffect(() => {
        if (!id) {
            return;
        }
        const promise = new Promise<string>((res, rej) =>
            adonixAxios
                .get(`${api.post.one}/${id}`)
                .then(({ data }) => {
                    setState((prev) => ({
                        ...prev,
                        isLoaded: true,
                        post: blogPropsParser().one.parseAsPublishedPost(
                            data.post
                        ),
                    }));
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
            pending: 'Querying post...',
            success: {
                render: ({ data }) =>
                    parseAsString(data).orElseThrowDefault('data'),
            },
            error: {
                render: ({ data }) => ToastError(data),
            },
        });
    }, [id]);

    return !isLoaded ? null : !post ? (
        <PostUnavailable type="published" />
    ) : (
        <Preview post={post} />
    );
};

export default Post;
