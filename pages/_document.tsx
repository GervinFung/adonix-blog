import * as React from 'react';
import Document, {
    DocumentContext,
    Head,
    Main,
    NextScript,
    Html,
} from 'next/document';

export default class Doc extends Document {
    static getInitialProps = async (ctx: DocumentContext) => {
        const { renderPage: originalRenderPage } = ctx;

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        return await Document.getInitialProps(ctx);
    };

    render = () => (
        <Html lang="en">
            <Head />
            <body
                style={{
                    padding: 0,
                    margin: 0,
                    overflowX: 'hidden',
                }}
            >
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
