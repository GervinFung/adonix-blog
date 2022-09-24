import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const Unauthenticated = () => {
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
                    Please authenticate yourself
                </Typography>
            </Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.replace('/admin')}
            >
                Sign In
            </Button>
        </Container>
    );
};

export default Unauthenticated;
