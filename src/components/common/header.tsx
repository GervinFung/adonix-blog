import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { SxProps, Theme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { ToastError, ToastInfo } from '../toastify';
import nullableToUndefinedPropsParser from '../../parser/type';
import { AdonixBlogContext } from '../../../pages/_app';
import { adonixAdmin } from '../../auth';

const Header = () => {
    const title = 'ADONIX';
    const { route } = useRouter();

    const { admin, theme } = React.useContext(AdonixBlogContext);

    const defaultLinks = [
        {
            name: 'About',
            link: 'https://poolofdeath20.herokuapp.com/about',
        },
        {
            name: 'GitHub',
            link: 'https://github.com/GervinFung/',
        },
        {
            name: 'Posts',
            link: '/1',
        },
    ];

    const links = !admin
        ? defaultLinks
        : defaultLinks.concat({
              name: 'Dashboard',
              link: '/admin/1?queryOption=published',
          });

    const [state, setState] = React.useState({
        anchorElUser: undefined as HTMLElement | undefined,
    });

    const { anchorElUser } = state;

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
        setState((prev) => ({
            ...prev,
            anchorElUser: event.currentTarget,
        }));

    const handleCloseUserMenu = () =>
        setState((prev) => ({
            ...prev,
            anchorElUser: undefined,
        }));

    const Logo = () => (
        <img
            src="/images/bar/blog.webp"
            alt="alternative"
            style={{
                width: 35,
                height: 'auto',
                cursor: 'pointer',
                margin: '0 8px 0 0',
            }}
        />
    );

    const parser = nullableToUndefinedPropsParser();

    const isPosts = route === '/[page]' || route === '/';

    const linkStyle: SxProps<Theme> = {
        my: 2,
        display: 'block',
        textDecoration: 'none',
        textAlign: 'center',
        mr: 2,
        ml: 2,
        color: isPosts ? '#90caf9' : undefined,
    };

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
            }}
            position={isPosts ? 'absolute' : 'static'}
        >
            <Container
                maxWidth={false}
                sx={{
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'transparent',
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Link href="/1">
                            <MuiLink
                                href="/1"
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Logo />
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        textDecoration: 'none',
                                        color: isPosts
                                            ? '#fff'
                                            : 'text.primary',
                                    }}
                                >
                                    {title}
                                </Typography>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'transparent',
                            display: {
                                xs: 'flex',
                                md: 'none',
                            },
                        }}
                    >
                        <Link href="/1">
                            <MuiLink
                                href="/1"
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Logo />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        flexGrow: 1,
                                        textDecoration: 'none',
                                        color: isPosts
                                            ? '#fff'
                                            : 'text.primary',
                                    }}
                                >
                                    {title}
                                </Typography>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {links.map(({ name, link }) => (
                            <React.Fragment key={link}>
                                {link.startsWith('/') ? (
                                    <Link href={link}>
                                        <Button href={link} sx={linkStyle}>
                                            {name}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        href={link}
                                        target="_blank"
                                        rel="external nofollow noopener noreferrer"
                                        sx={linkStyle}
                                    >
                                        {name}
                                    </Button>
                                )}
                            </React.Fragment>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Switch
                            checked={theme.isDarkMode}
                            onChange={theme.setIsDarkMode}
                        />
                        {admin && (
                            <Box sx={{ flexGrow: 0, ml: 2 }}>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={parser.parseValue(
                                            admin.displayName
                                        )}
                                        src={parser.parseValue(admin.photoURL)}
                                    />
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            textAlign="center"
                                            onClick={async () => {
                                                const result =
                                                    await adonixAdmin.signOut(
                                                        admin
                                                    );
                                                switch (result.type) {
                                                    case 'succeed':
                                                        return ToastInfo(
                                                            'Signed Out'
                                                        );
                                                    case 'failed': {
                                                        return ToastError(
                                                            result.error
                                                        );
                                                    }
                                                }
                                            }}
                                        >
                                            Sign Out
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
