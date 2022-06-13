import * as React from 'react';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const StringToMarkdown = ({
    content,
}: Readonly<{
    content: string;
}>) => {
    return (
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkParse, remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            // @ts-ignore
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        />
    );
};
export default StringToMarkdown;
