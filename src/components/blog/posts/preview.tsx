import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import Link from '@mui/material/Link';
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
            }}
        >
            {value}
        </Typography>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 4, mt: 4 }}>
                {posts.map(({ time, description, title, id }) => (
                    <Link
                        key={id}
                        sx={{
                            textDecoration: 'none',
                        }}
                        href={`/${
                            props.type !== 'admin' ? '' : 'admin/'
                        }post/${id}${
                            props.type !== 'admin'
                                ? ''
                                : `?queryOption=${props.queryOption}`
                        }`}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 3,
                                height: '100%',
                                transition: 'transform 0.15s ease-in-out',
                                '&:hover': {
                                    transform: 'scale3d(1.05, 1.05, 1)',
                                },
                                mb: 2,
                            }}
                        >
                            <GenerateTypography
                                variant="subtitle1"
                                value={time.toDateString()}
                            />
                            <GenerateTypography
                                variant="h5"
                                value={title}
                                style={{
                                    color: '#2a7ae2',
                                }}
                            />
                            <GenerateTypography
                                variant="h6"
                                value={description}
                            />
                        </Paper>
                    </Link>
                ))}
            </Box>
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
        </>
    );
};

export default Preview;
