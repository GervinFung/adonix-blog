import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { PostsQueryOption } from '../../../common/type/post';
import { BackButton } from '../common';

const PostUnavailable = ({
    type,
}: Readonly<{
    type: PostsQueryOption;
}>) => (
    <Container
        component="div"
        sx={{
            m: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            mt: 10,
            mb: 8,
        }}
    >
        <Container
            sx={{
                mt: 3,
                mb: 3,
            }}
        >
            <Typography
                variant="h4"
                component="h4"
                sx={{
                    mb: 1,
                }}
            >
                I am sorry
            </Typography>
            <Typography
                variant="h5"
                component="h5"
                sx={{
                    mb: 1,
                }}
            >
                It appears that the post you are looking for have been{' '}
                {(() => {
                    switch (type) {
                        case 'published':
                            return 'unpublished';
                        case 'unpublished':
                            return 'published';
                        case 'deleted':
                            return 'restored';
                    }
                })()}
            </Typography>
        </Container>
        <BackButton />
    </Container>
);

export default PostUnavailable;
