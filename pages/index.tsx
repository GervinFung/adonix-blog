import * as React from 'react';
import Container from '@mui/material/Container';
import Terminal from '../src/components/terminal';

// <Box sx={{ my: 4 }}>
//     <Typography variant="h4" component="h1" gutterBottom>
//         Next.js example
//     </Typography>
//     <Link href="/about" color="secondary">
//         Go to the about page
//     </Link>
// </Box>

const Index = () => (
    <Container
        sx={{
            '.MuiContainer-root': {
                p: 0,
            },
        }}
    >
        <Terminal />
    </Container>
);

export default Index;
