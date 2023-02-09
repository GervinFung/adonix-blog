import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import minutesToRead from 'minutes-to-read';
import StringToMarkdown from './parser';
import { NonNullablePublishedPost } from '../../../common/type/post';
import Skeleton from '@mui/material/Skeleton';

const Preview = ({
    isLoaded,
    post: { title, description, timePublished, content, imagePath },
}: Readonly<{
    isLoaded: boolean;
    post: NonNullablePublishedPost;
}>) => (
    <Container
        maxWidth={false}
        component="div"
        sx={{
            mb: 8,
            width: '85%',
        }}
    >
        {!isLoaded ? (
            <Skeleton
                variant="rectangular"
                width="100%"
                height="400px"
                style={{
                    margin: '0 0 16px 0',
                }}
            />
        ) : (
            <img
                src={imagePath}
                style={{
                    width: '100%',
                    margin: '0 0 16px 0',
                }}
            />
        )}
        <Typography
            variant="h3"
            component="h3"
            sx={{
                mb: 2,
            }}
        >
            {isLoaded ? (
                title
            ) : (
                <Skeleton width="700px" variant="rectangular" />
            )}
        </Typography>
        <Typography
            variant="h6"
            color="text.secondary"
            component="h4"
            sx={{
                mb: 2,
            }}
        >
            {isLoaded ? (
                timePublished.toDateString()
            ) : (
                <Skeleton width="200px" variant="rectangular" />
            )}
        </Typography>
        <Typography
            variant="h5"
            component="h5"
            sx={{
                mb: 2,
            }}
        >
            {isLoaded ? (
                description
            ) : (
                <Skeleton width="800px" variant="rectangular" />
            )}
        </Typography>
        <Typography
            variant="h6"
            color="text.secondary"
            component="em"
            sx={{
                mb: 1,
            }}
        >
            {isLoaded ? (
                minutesToRead(content)
            ) : (
                <Skeleton width="200px" variant="rectangular" />
            )}
        </Typography>
        <Typography
            variant="subtitle1"
            component="div"
            className="preview markdown-body"
            sx={{
                backgroundColor: 'inherit !important',
                '.MuiTypography-root': {
                    backgroundColor: 'inherit !important',
                },
            }}
        >
            {!isLoaded ? (
                <Skeleton height="500vh" variant="rectangular" />
            ) : (
                <StringToMarkdown content={content} />
            )}
        </Typography>
    </Container>
);

export default Preview;
