import fs from 'fs';
import pkg from '../../package.json';

const main = () => {
    const dimensions = [48, 72, 96, 144, 192, 256, 318, 512] as const;

    const color = '#121212';

    const webmanifest = {
        name: pkg.author,
        short_name: pkg.author,
        icons: dimensions.map((dimension) => ({
            sizes: `${dimension}x${dimension}`,
            src: `/images/icons/icon-${dimension}x${dimension}.png`,
            type: 'image/png',
        })),
        theme_color: color,
        background_color: color,
        display: 'standalone',
    };

    fs.writeFileSync(
        'public/site.webmanifest',
        JSON.stringify(webmanifest, undefined, 4)
    );
};

main();
