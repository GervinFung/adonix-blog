import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = () => {
    const ExternalLink = ({
        link,
        name,
    }: Readonly<{
        link: `https://${string}`;
        name: string;
    }>) => {
        return (
            <Link
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
                target="_blank"
                href={link}
                rel="external nofollow noopener noreferrer"
            >
                {name}
            </Link>
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            >
                {`Copyright © ${new Date().getFullYear()}`}
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            >
                Made with{' '}
                <ExternalLink name="NextJS" link="https://nextjs.org/" /> &#183;
                Powered by{' '}
                <ExternalLink name="Material-UI" link="https://mui.com/" />{' '}
                &#183; Checked by{' '}
                <ExternalLink
                    name="TypeScript"
                    link="https://www.typescriptlang.org/"
                />
            </Typography>
        </Box>
    );
};

export default Footer;
