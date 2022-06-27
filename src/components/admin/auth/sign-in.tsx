import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { adonixAdmin } from '../../../auth';
import { ToastError } from '../../toastify';
import { Input } from '../common';
import { blue } from '@mui/material/colors';

const SignIn = () => {
    const [state, setState] = React.useState({
        email: '',
        password: '',
    });

    const { email, password } = state;

    return (
        <Paper
            elevation={0}
            component="form"
            sx={{
                flexGrow: 1,
                mt: 4,
                mb: 4,
                p: 3,
                boxSizing: 'border-box',
                '& .MuiTextField-root': {
                    mb: 4,
                    mt: 2,
                    width: '100%',
                },
            }}
            noValidate
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
        >
            <Container
                sx={{
                    width: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                        mb: 4,
                        pt: 2,
                    }}
                >
                    Welcome
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        mb: 4,
                    }}
                >
                    This is the admin page of the application, please verify
                    that this web application belongs to you, as there is only
                    one user per domain. If this does not belongs to you and you
                    wish to have one for yourself, you can create one yourself
                </Typography>
            </Container>
            <Input
                id="email"
                type="email"
                placeholder="johnwick@gmail.com"
                onChanged={(email) =>
                    setState((prev) => ({
                        ...prev,
                        email,
                    }))
                }
            />
            <Input
                id="password"
                type="password"
                placeholder={`*`.repeat(20)}
                autoComplete="current-password"
                onChanged={(password) =>
                    setState((prev) => ({
                        ...prev,
                        password,
                    }))
                }
            />
            <Container
                sx={{
                    margin: 'auto',
                    display: 'grid',
                    placeItems: 'center',
                    mt: 2,
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        background: blue[500],
                        color: 'white',
                    }}
                    onClick={async () => {
                        const result = await adonixAdmin.signIn({
                            email,
                            password,
                        });
                        switch (result.type) {
                            case 'succeed':
                                return;
                            case 'failed': {
                                const { error } = result;
                                if (!(error instanceof Error)) {
                                    return ToastError(error);
                                }
                                const { message } = error;
                                return ToastError(message, (message) =>
                                    message.includes('password') ||
                                    message.includes('email')
                                        ? 'Invalid credential'
                                        : message
                                );
                            }
                        }
                    }}
                >
                    Sign In
                </Button>
            </Container>
        </Paper>
    );
};

export default SignIn;
