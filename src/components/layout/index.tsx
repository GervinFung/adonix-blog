import * as React from 'react';
import Head from 'next/head';
import Footer from '../common/footer';
import Header from '../common/header';
import useDeviceWidth from '../../hook/should-expand-width';

const Layout = ({
    children,
    title,
}: Readonly<{
    children: React.ReactNode;
    title: string;
}>) => {
    const { isTabletAndPhone } = useDeviceWidth();

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
            <Header />
            <div
                style={{
                    margin: 'auto',
                    width: isTabletAndPhone ? '100%' : '75%',
                }}
            >
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
