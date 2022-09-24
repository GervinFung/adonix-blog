import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import minutesToRead from 'minutes-to-read';
import StringToMarkdown from './parser';
import { NonNullablePublishedPost } from '../../../common/type/post';

const Preview = ({
    post: { title, description, timePublished, content, imagePath },
}: Readonly<{
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
        <img
            src={imagePath}
            style={{
                width: '100%',
                margin: '0 0 16px 0',
            }}
        />
        <Typography
            variant="h3"
            component="h3"
            sx={{
                mb: 2,
            }}
        >
            {title}
        </Typography>
        <Typography
            variant="h6"
            color="text.secondary"
            component="h4"
            sx={{
                mb: 2,
            }}
        >
            {timePublished.toDateString()}
        </Typography>
        <Typography
            variant="h5"
            component="h5"
            sx={{
                mb: 2,
            }}
        >
            {description}
        </Typography>
        <Typography
            variant="h6"
            color="text.secondary"
            component="em"
            sx={{
                mb: 1,
            }}
        >
            {minutesToRead(content)}
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
            <StringToMarkdown content={content} />
        </Typography>
    </Container>
);

export default Preview;
