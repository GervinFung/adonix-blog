import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { blue } from '@mui/material/colors';

const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            variant="contained"
            onClick={() => router.back()}
            sx={{
                background: blue[500],
                color: 'white',
                mt: 4,
            }}
        >
            Back
        </Button>
    );
};

export { BackButton };
