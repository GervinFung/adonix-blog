import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Unauthenticated = () => (
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
                display: 'grid',
                placeItems: 'center',
                gridGap: 100,
            }}
        >
            <Typography variant="h1" component="h1">
                WARNING
            </Typography>
            <Typography variant="h5" component="h5">
                You are not authorized to view this page
            </Typography>
        </Container>
    </Container>
);

export default Unauthenticated;
