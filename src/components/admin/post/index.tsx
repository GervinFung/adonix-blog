import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/router';
import { parseAsString } from 'parse-dont-validate';
import { AdonixBlogContext } from '../../../../pages/_app';
import adonisAxios from '../../../axios';
import { AdminHandlePost, UpdatePostStatus } from '../../../common/type/post';
import adminPropsParser from '../../../parser/admin';
import blogPropsParser from '../../../parser/blog';
import nullableToUndefinedPropsParser from '../../../parser/type';
import { api } from '../../../util/const';
import { ToastError, ToastPromise } from '../../toastify';
import { Input, Option } from '../common';
import { isAllTextValid } from '../../../common/validation';
import { equal } from '../../../util/deep-equal';
import Typography from '@mui/material/Typography';
import Preview from '../../blog/post/preview';
import PostUnavailable from '../../blog/post/unavailable';
import Unauthenticated from '../auth/unauthenticated';

type NameOfMutableData = 'title' | 'description' | 'content';

type TabPanelProps = Readonly<{
    children: React.ReactNode;
    index: number;
    value: number;
}>;

const Post = () => {
    const [state, setState] = React.useState({
        updated: undefined as AdminHandlePost | undefined,
        original: undefined as AdminHandlePost | undefined,
        status: undefined as UpdatePostStatus | undefined,
        value: 0,
        isLoaded: false,
    });

    const router = useRouter();
    const adminParser = adminPropsParser();

    const { admin } = React.useContext(AdonixBlogContext);
    const { one } = blogPropsParser();
    const { query } = router;
    const { updated, original, status, value, isLoaded } = state;

    const id = one.parseAsNullableId(query.id);
    const queryOption = adminParser.posts.parseAsNullablePostQueryOption(
        query.queryOption
    );

    React.useEffect(() => {
        if (!admin || !queryOption || !id) {
            return;
        }
        const promise = new Promise<string>((res, rej) =>
            admin
                .getIdToken(true)
                .then((token) =>
                    adonisAxios
                        .get(
                            `${api.admin.post.query}/${id}?token=${token}&queryOption=${queryOption}`
                        )
                        .then(({ data }) => {
                            setState((prev) => {
                                const { one } = blogPropsParser();

                                const type =
                                    adminPropsParser().posts.parseAsPostQueryOption(
                                        data.type
                                    );

                                const postData = (() => {
                                    switch (type) {
                                        case 'published':
                                            return {
                                                type,
                                                post: one.parseAsPublishedPost(
                                                    data.post
                                                ),
                                            };
                                        case 'unpublished':
                                            return {
                                                type,
                                                post: one.parseAsUnpublishedPost(
                                                    data.post
                                                ),
                                            };
                                        case 'deleted':
                                            return {
                                                type,
                                                post: one.parseAsDeletedPost(
                                                    data.post
                                                ),
                                            };
                                    }
                                })();

                                return {
                                    ...prev,
                                    queryOption,
                                    updated: postData,
                                    original: postData,
                                    isLoaded: true,
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
                )
                .catch(rej)
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
    }, [id, admin?.uid]);

    if (!updated || !isLoaded) {
        return null;
    }

    if (!admin) {
        return <Unauthenticated />;
    }

    const { type, post } = updated;

    if (!post) {
        return <PostUnavailable type={type} />;
    }

    const { title, description, content } = post;

    const { parseAsNonNullable } = nullableToUndefinedPropsParser();

    const formOptionsForPost = () => {
        switch (type) {
            case 'deleted':
                return ['restore', type] as const;

            case 'published':
                return ['unpublish', 'delete', type] as const;

            case 'unpublished':
                return ['publish', 'delete', type] as const;
        }
    };

    const getDiscriminatedUnionOfPost = (
        postType: AdminHandlePost,
        {
            key,
            value,
        }: Readonly<{
            key: NameOfMutableData;
            value: string;
        }>
    ): AdminHandlePost => {
        const { type } = postType;
        switch (type) {
            case 'published':
                return {
                    type,
                    post: {
                        ...parseAsNonNullable(postType.post),
                        [key]: value,
                    },
                };
            case 'unpublished':
                return {
                    type,
                    post: {
                        ...parseAsNonNullable(postType.post),
                        [key]: value,
                    },
                };
            case 'deleted':
                return {
                    type,
                    post: {
                        ...parseAsNonNullable(postType.post),
                        [key]: value,
                    },
                };
        }
    };

    if (!admin || !queryOption) {
        return null;
    }

    const TabPanel = ({ children, value, index }: TabPanelProps) => (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );

    const isPreview = value === 1;

    return (
        <Paper
            elevation={2}
            component="form"
            sx={{
                flexGrow: 1,
                mt: 4,
                mb: 4,
                p: 3,
                boxSizing: 'border-box',
                '& .MuiTextField-root': {
                    mb: 4,
                    mt: 2,
                    width: '100%',
                },
            }}
            noValidate
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={isPreview ? 'Preview' : 'Edit'}
                    onChange={(_, value) =>
                        setState((prev) => ({
                            ...prev,
                            value,
                        }))
                    }
                    aria-label="basic tabs example"
                >
                    <Tab label="Edit" />
                    <Tab label="Preview" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={1}>
                <Preview
                    post={{
                        ...post,
                        timePublished: new Date(),
                    }}
                />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <Container
                    sx={{
                        width: '100%',
                        mb: 4,
                    }}
                >
                    <Option
                        label="Status"
                        isUseDisabled={true}
                        options={formOptionsForPost()}
                        value={status ?? queryOption}
                        onOptionSelected={(status) => {
                            if (
                                status === 'published' ||
                                status === 'deleted' ||
                                status === 'unpublished'
                            ) {
                                return setState((prev) => ({
                                    ...prev,
                                    status: undefined,
                                }));
                            }
                            setState((prev) => ({
                                ...prev,
                                status,
                            }));
                        }}
                    />
                </Container>
                <Input
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChanged={(title) =>
                        setState((prev) => {
                            const updated = parseAsNonNullable(prev.updated);
                            return {
                                ...prev,
                                updated: {
                                    ...updated,
                                    ...getDiscriminatedUnionOfPost(updated, {
                                        key: 'title',
                                        value: title,
                                    }),
                                },
                            };
                        })
                    }
                />
                <Input
                    id="description"
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChanged={(description) =>
                        setState((prev) => {
                            const updated = parseAsNonNullable(prev.updated);
                            return {
                                ...prev,
                                updated: {
                                    ...updated,
                                    ...getDiscriminatedUnionOfPost(updated, {
                                        key: 'description',
                                        value: description,
                                    }),
                                },
                            };
                        })
                    }
                />
                <Input
                    id="content"
                    multiline
                    type="text"
                    value={content}
                    placeholder="Content"
                    onChanged={(content) =>
                        setState((prev) => {
                            const updated = parseAsNonNullable(prev.updated);
                            return {
                                ...prev,
                                updated: {
                                    ...updated,
                                    ...getDiscriminatedUnionOfPost(updated, {
                                        key: 'content',
                                        value: content,
                                    }),
                                },
                            };
                        })
                    }
                />
                <Container
                    sx={{
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        mb: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={equal(updated, original)}
                        onClick={() =>
                            setState((prev) => {
                                const { original } = prev;
                                if (!original) {
                                    throw new Error(
                                        'should fetch data and have original defined'
                                    );
                                }
                                return {
                                    ...prev,
                                    status: undefined,
                                    updated: original,
                                };
                            })
                        }
                    >
                        Revert
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={equal(updated, original)}
                        onClick={() => {
                            const { type } = updated;
                            const post = parseAsNonNullable(updated.post);
                            if (!isAllTextValid(post)) {
                                ToastError('Invalid input');
                                return;
                            }
                            const promise = new Promise<string>((res, rej) =>
                                admin
                                    .getIdToken(true)
                                    .then((token) =>
                                        adonisAxios
                                            .post(
                                                `${api.admin.post.update}/${id}`,
                                                {
                                                    data: {
                                                        post: updated.post,
                                                        id,
                                                        queryOption: type,
                                                        status,
                                                        token,
                                                    },
                                                }
                                            )
                                            .then(({ data }) =>
                                                res(data.message)
                                            )
                                    )
                                    .catch(rej)
                            );
                            ToastPromise({
                                promise,
                                pending: 'Updating post...',
                                success: {
                                    render: ({ data }) =>
                                        parseAsString(data).orElseThrowDefault(
                                            'data'
                                        ),
                                },
                                error: {
                                    render: ({ data }) => ToastError(data),
                                },
                            });
                            if (!status) {
                                return;
                            }
                            router.replace(
                                `/admin/post/${id}?queryOption=${(() => {
                                    switch (status) {
                                        case 'publish':
                                            return 'published';
                                        case 'restore':
                                        case 'unpublish':
                                            return 'unpublished';
                                        case 'delete':
                                            return 'deleted';
                                    }
                                })()}`
                            );
                        }}
                    >
                        Update
                    </Button>
                </Container>
            </TabPanel>
        </Paper>
    );
};

export default Post;
