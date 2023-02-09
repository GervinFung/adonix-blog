import React from 'react';
import adonixAxios from '../../../axios';
import { api } from '../../../util/const';
import blogPropsParser from '../../../parser/blog';
import { ToastPromise } from '../../toastify';
import { UserReadPublishedPost } from '../../../common/type/post';
import { useRouter } from 'next/router';
import Preview from './preview';
import PostUnavailable from './unavailable';
import { processErrorMessage } from '../../../util/error';

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
        const promise = new Promise<string>((resolve, reject) => {
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
                    resolve('Completed');
                })
                .catch((error) => {
                    setState((prev) => ({
                        ...prev,
                        isLoaded: true,
                    }));
                    reject(processErrorMessage(error));
                });
        });
        ToastPromise({
            promise,
            pending: 'Querying post...',
        });
    }, [id]);

    return !post ? (
        <PostUnavailable type="published" />
    ) : (
        <Preview post={post} isLoaded={isLoaded} />
    );
};

export default Post;
