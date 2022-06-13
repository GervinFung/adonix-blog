import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { AdonixBlogContext } from '../../../pages/_app';
import { adonisAdmin } from '../../auth';
import { ToastError, ToastInfo } from '../toastify';
import nullableToUndefinedPropsParser from '../../parser/type';
import useDeviceWidth from '../../hook/should-expand-width';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const Header = () => {
    const title = 'ADONIX-BLOG';

    const {
        admin,
        theme: { setIsDarkMode },
    } = React.useContext(AdonixBlogContext);

    const defaultLinks = [
        {
            name: 'About',
            isExternal: true,
            link: 'https://poolofdeath20.herokuapp.com/about',
        },
        {
            name: 'GitHub',
            isExternal: true,
            link: 'https://github.com/GervinFung/',
        },
        {
            name: 'Posts',
            isExternal: false,
            link: '/posts/1',
        },
    ];

    const links = !admin
        ? defaultLinks
        : defaultLinks.concat({
              name: 'Dashboard',
              isExternal: false,
              link: '/admin/posts/1?queryOption=published',
          });

    const [state, setState] = React.useState({
        anchorElUser: undefined as HTMLElement | undefined,
        anchorElNav: undefined as HTMLElement | undefined,
    });

    const { anchorElNav, anchorElUser } = state;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
        setState((prev) => ({
            ...prev,
            anchorElNav: event.currentTarget,
        }));

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
        setState((prev) => ({
            ...prev,
            anchorElUser: event.currentTarget,
        }));

    const handleCloseNavMenu = () =>
        setState((prev) => ({
            ...prev,
            anchorElNav: undefined,
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
                margin: '0 16px 0 0',
            }}
        />
    );

    const parser = nullableToUndefinedPropsParser();
    const { isTabletAndPhone } = useDeviceWidth();

    return (
        <AppBar position="static">
            <Container
                maxWidth="xl"
                sx={{
                    width: isTabletAndPhone ? '100%' : '75%',
                }}
            >
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            backgroundColor: 'transparent',
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {links.map(({ name, link, isExternal }) => (
                                <MenuItem
                                    key={name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        key={name}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'black',
                                            textDecoration: 'none',
                                            mr: 1,
                                            ml: 1,
                                        }}
                                        target={
                                            isExternal ? '_blank' : undefined
                                        }
                                        href={link}
                                        rel="external nofollow noopener noreferrer"
                                    >
                                        {name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'transparent',
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {links.map(({ name, link, isExternal }) => (
                            <Link
                                key={name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    textDecoration: 'none',
                                    mr: 2,
                                    ml: 2,
                                }}
                                target={isExternal ? '_blank' : undefined}
                                href={link}
                                rel="external nofollow noopener noreferrer"
                            >
                                {name}
                            </Link>
                        ))}
                    </Box>
                    <ThemeSwitch onClick={setIsDarkMode} />
                    {admin && (
                        <Box sx={{ flexGrow: 0, ml: 2 }}>
                            <Tooltip title="Open settings">
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
                            </Tooltip>
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
                                                await adonisAdmin.signOut(
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
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
