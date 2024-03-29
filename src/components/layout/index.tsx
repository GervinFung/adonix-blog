import React from 'react';
import Head from 'next/head';
import Footer from '../common/footer';
import Header from '../common/header';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DefaultSeo } from 'next-seo';
import { parseAsString } from 'parse-dont-validate';

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

    const url = process.env.ORIGIN;
    const description =
        'The Personal Blog of Gervin Fung Da Xuen | PoolOfDeath20, where I write just about anything and share my knowledge or experiences';

    const iconPath = '/images/icon';

    const dimensions = [48, 72, 96, 144, 192, 256, 384, 512] as const;

    const env = process.env.NODE_ENV;

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
                {env !== 'production' && env !== 'development'
                    ? null
                    : (() => {
                          const gaMeasurementId = parseAsString(
                              process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                          ).orElseThrowCustom(
                              'NEXT_PUBLIC_GA_MEASUREMENT_ID is not a string'
                          );

                          return (
                              <>
                                  <script
                                      async
                                      src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                                  />
                                  <script>
                                      {[
                                          'window.dataLayer = window.dataLayer || []',
                                          'function gtag(){window.dataLayer.push(arguments);}',
                                          `gtag('js', new Date())`,
                                          `gtag('config', '${gaMeasurementId}', {page_path: window.location.pathname})`,
                                      ].join('\n')}
                                  </script>
                              </>
                          );
                      })()}
            </Head>
            <DefaultSeo
                title={title}
                canonical={url}
                defaultTitle={title}
                titleTemplate={title}
                description={description}
                twitter={{
                    handle: '@adonix-blog',
                    site: '@adonix-blog',
                    cardType: 'summary_large_image',
                }}
                openGraph={{
                    url,
                    title,
                    description,
                    images: dimensions.map((dimension) => ({
                        alt: description,
                        width: dimension,
                        height: dimension,
                        url: `${iconPath}/icon-${dimension}x${dimension}.png`,
                    })),
                }}
                additionalMetaTags={[
                    {
                        name: 'keyword',
                        content:
                            'Gervin Fung Da Xuen, PoolOfDeath20, NextJS, Blog, Adonix Blog, Adonix, Adonis OS',
                    },
                    {
                        name: 'author',
                        content: 'PoolOfDeath20 | Gervin Fung Da Xuen',
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                    },
                    {
                        name: 'mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        name: 'apple-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        name: 'application-name',
                        content: 'Adonix',
                    },
                    {
                        name: 'application-mobile-web-app-title',
                        content: 'Adonix',
                    },
                    {
                        name: 'theme-color',
                        content: '#000D0D',
                    },
                    {
                        name: 'msapplication-navbutton-color',
                        content: '#000D0D',
                    },
                    {
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#000D0D',
                    },
                    {
                        name: 'msapplication-starturl',
                        content: 'index.html',
                    },
                ]}
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        type: 'image/x-icon',
                        href: `${iconPath}/favicon.ico`,
                    },
                    {
                        rel: 'apple-touch-icon',
                        type: 'image/x-icon',
                        href: `${iconPath}/favicon.ico`,
                    },
                    ...dimensions.flatMap((dimension) => {
                        const sizes = `${dimension}x${dimension}`;
                        const href = `${iconPath}/icon-${sizes}.png`;
                        const icon = {
                            href,
                            sizes,
                            rel: 'icon',
                        };
                        const appleTouchIcon = {
                            href,
                            sizes,
                            rel: 'apple-touch-icon',
                        };
                        return [icon, appleTouchIcon];
                    }),
                ]}
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
