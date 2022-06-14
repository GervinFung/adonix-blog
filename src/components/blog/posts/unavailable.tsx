import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PostsQueryOption } from '../../../common/type/post';
import { useRouter } from 'next/router';

const PostsUnavailable = ({
    type,
}: Readonly<{
    type: PostsQueryOption;
}>) => {
    const router = useRouter();

    return (
        <Container
            component="div"
            sx={{
                m: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                mt: 4,
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
                    It appears that there are no {type} post(s) available
                </Typography>
            </Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.back()}
            >
                Back
            </Button>
        </Container>
    );
};

export default PostsUnavailable;
