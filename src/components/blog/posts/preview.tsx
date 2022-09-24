import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import {
    PostCommonProps,
    PostsQueryOption,
    StringId,
} from '../../../common/type/post';
import BasicPagination from '../../pagination';
import { postsPerPage } from '../../../util/const';

const Preview = (
    props: Readonly<
        {
            posts: ReadonlyArray<
                Omit<PostCommonProps, 'content'> &
                    StringId &
                    Readonly<{
                        time: Date;
                    }>
            >;
            page: number;
            totalPosts: number;
            onPaginationChange: (page: number) => void;
        } & (
            | {
                  type: 'admin';
                  queryOption: PostsQueryOption;
              }
            | {
                  type: 'user';
              }
        )
    >
) => {
    const { posts, page, totalPosts, onPaginationChange } = props;

    const GenerateTypography = ({
        variant,
        value,
        style,
    }: Readonly<{
        variant:
            | 'button'
            | 'caption'
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6'
            | 'inherit'
            | 'subtitle1'
            | 'subtitle2'
            | 'body1'
            | 'body2'
            | 'overline';
        value: string;
        style?: SxProps<Theme>;
    }>) => (
        <Typography
            variant={variant}
            component="div"
            sx={{
                mb: 1,
                ...style,
                wordBreak: 'break-word',
            }}
        >
            {value}
        </Typography>
    );

    return (
        <>
            <Box
                component="div"
                sx={{
                    flexGrow: 1,
                    m: 3,
                    mt: 4,
                    mb: 4,
                    boxSizing: 'border-box',
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 2, sm: 12, md: 12 }}
                >
                    {posts.map(
                        ({ time, description, title, id, imagePath }) => {
                            const link = `/${
                                props.type !== 'admin' ? '' : 'admin/'
                            }post/${id}${
                                props.type !== 'admin'
                                    ? ''
                                    : `?queryOption=${props.queryOption}`
                            }`;
                            return (
                                <Grid item xs={2} sm={6} md={4} key={id}>
                                    <Link href={link}>
                                        <MuiLink href={link} underline="none">
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    height: '100%',
                                                    transition:
                                                        'transform 0.15s ease-in-out',
                                                    '&:hover': {
                                                        transform:
                                                            'scale3d(1.05, 1.05, 1)',
                                                    },
                                                    mb: 2,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <img
                                                    src={imagePath}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        margin: '8px 16px',
                                                    }}
                                                >
                                                    <GenerateTypography
                                                        variant="h5"
                                                        value={title}
                                                        style={{
                                                            fontWeight: '900',
                                                        }}
                                                    />
                                                    <GenerateTypography
                                                        variant="subtitle2"
                                                        value={time.toDateString()}
                                                    />
                                                    <GenerateTypography
                                                        variant="subtitle1"
                                                        value={description}
                                                        style={{
                                                            mb: 0,
                                                            color: 'text.secondary',
                                                        }}
                                                    />
                                                </div>
                                            </Paper>
                                        </MuiLink>
                                    </Link>
                                </Grid>
                            );
                        }
                    )}
                </Grid>
            </Box>
            {totalPosts >= postsPerPage && (
                <Grid
                    container
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    <BasicPagination
                        page={page}
                        count={Math.ceil(totalPosts / postsPerPage)}
                        onChange={onPaginationChange}
                    />
                </Grid>
            )}
        </>
    );
};

export default Preview;
