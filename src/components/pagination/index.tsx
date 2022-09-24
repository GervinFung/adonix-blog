import React from 'react';
import Pagination from '@mui/material/Pagination';

const BasicPagination = ({
    count,
    page,
    onChange,
}: Readonly<{
    count: number;
    page: number;
    onChange: (page: number) => void;
}>) => (
    <Pagination
        size="large"
        count={count}
        page={page}
        onChange={(_, page) => onChange(page)}
        sx={{
            mb: 2,
        }}
    />
);

export default BasicPagination;
