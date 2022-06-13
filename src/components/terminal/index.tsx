import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReactUnixTerminal from 'react-unix-terminal';
import 'react-unix-terminal/dist/style.css';
import Typewriter from 'typewriter-effect';
import json from '../../../package.json';
import { useRouter } from 'next/router';
import useDeviceWidth from '../../hook/should-expand-width';

const Terminal = () => {
    const router = useRouter();
    const { isTabletAndPhone } = useDeviceWidth();

    return (
        <Container
            sx={{
                mt: 2,
                mb: 3,
            }}
        >
            <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                    mb: 5,
                    mt: 5,
                    textAlign: 'center',
                }}
            >
                <Typewriter
                    options={{
                        cursor: '',
                    }}
                    onInit={(typewriter) =>
                        typewriter
                            .typeString(
                                `Welcome to my blog${
                                    !isTabletAndPhone ? '. ' : '<br/>'
                                } Fancy a terminal?`
                            )
                            .start()
                    }
                />
            </Typography>
            <Container
                sx={{
                    mt: 2,
                    mb: 2,
                    height: 530,
                }}
            >
                <ReactUnixTerminal
                    user="guest"
                    name="poolofdeath20"
                    fontFamily="JetBrains+Mono"
                    height="100%"
                    width="100%"
                    commands={{
                        vi: () => `why use 'vi'? when you can use 'vim'`,
                        vim: () => `vi improved? give 'nvim' a try, cmon`,
                        emacs: () => `emacs? seriously? legends use 'nano'`,
                        nvim: () =>
                            `nvim is good, but I heard 'emacs' is not bad too`,
                        nano: () =>
                            `one does not simply use nano, one shall use 'vi' to be efficient`,
                        julia: () =>
                            'ah yes my beloved, wonder who she is? click <a href="https://julialang.org/" target="_blank" rel="external nofollow noopener noreferrer">Here</a> to find out more',
                        posts: () => {
                            router.push('/posts/1');
                            return 'opening posts...';
                        },
                        php: () => {
                            open(
                                'https://www.reddit.com/r/ProgrammerHumor/comments/7ug52d/another_php_joke/'
                            );
                            return 'HA'.repeat(20);
                        },
                        tsc: () => {
                            open(
                                'https://www.reddit.com/r/ProgrammerHumor/comments/csi35q/typescript_and_javascript/'
                            );
                            return `version ${json.devDependencies.typescript.replace(
                                '^',
                                ''
                            )}`;
                        },
                    }}
                />
            </Container>
        </Container>
    );
};

export default Terminal;
