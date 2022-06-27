import * as React from 'react';
import Head from 'next/head';
import Footer from '../common/footer';
import Header from '../common/header';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DefaultSeo } from 'next-seo';

const Layout = ({
    children,
    title,
}: Readonly<{
    children: React.ReactNode;
    title: string;
}>) => {
    const trigger = useScrollTrigger({
        target: typeof window === 'undefined' ? undefined : window,
        disableHysteresis: true,
        threshold: 400,
    });

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
        >
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="shortcut icon" href="/images/icon/favicon.ico" />
            </Head>
            <DefaultSeo
                title={title}
                titleTemplate={title}
                defaultTitle={title}
                description="PoolOfDeath20 or GervinFung's blog"
                canonical="https://adonix-blog.vercel.app"
                openGraph={{
                    title,
                    url: 'https://adonix-blog.vercel.app',
                    description: "PoolOfDeath20 or GervinFung's blog",
                    images: [
                        {
                            url: '/og-image.png',
                            width: 800,
                            height: 420,
                            alt: 'Adonix - The Blog of PoolOfDeath20',
                        },
                    ],
                }}
                twitter={{
                    handle: '@adonix',
                    site: '@adonix',
                    cardType: 'summary_large_image',
                }}
            />
            <Header />
            <div
                style={{
                    margin: 'auto',
                    width: '100%',
                }}
            >
                {children}
            </div>
            <Fade in={trigger}>
                <Box
                    role="presentation"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Fade>
            <Footer />
        </div>
    );
};

export default Layout;
