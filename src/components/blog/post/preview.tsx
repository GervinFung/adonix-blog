import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import StringToMarkdown from './parser';
import { NonNullablePublishedPost } from '../../../common/type/post';

const Preview = ({
    post: { title, description, timePublished, content },
}: Readonly<{
    post: NonNullablePublishedPost;
}>) => (
    <Container
        component="div"
        sx={{
            mt: 4,
            mb: 8,
        }}
    >
        <Typography
            variant="h3"
            component="div"
            sx={{
                mb: 1,
            }}
        >
            {title}
        </Typography>
        <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{
                mb: 4,
            }}
        >
            {timePublished.toDateString()}
        </Typography>
        <Typography
            variant="h5"
            component="div"
            sx={{
                mb: 2,
            }}
        >
            {description}
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
