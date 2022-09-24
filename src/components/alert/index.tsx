import Alert from '@mui/material/Alert';
import React from 'react';

type Message = Readonly<{
    message: string;
}>;

const Error = ({ message }: Message) => (
    <Alert severity="error">{message}</Alert>
);
const Warning = ({ message }: Message) => (
    <Alert severity="warning">{message}</Alert>
);
const Info = ({ message }: Message) => <Alert severity="info">{message}</Alert>;
const Success = ({ message }: Message) => (
    <Alert severity="success">{message}</Alert>
);

export { Error, Warning, Info, Success };
