import React from 'react';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const StringToMarkdown = ({
    content,
}: Readonly<{
    content: string;
}>) => (
    <ReactMarkdown
        remarkPlugins={[remarkParse, remarkGfm]}
        components={{
            code({ node: _, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <SyntaxHighlighter
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
            },
        }}
    >
        {content}
    </ReactMarkdown>
);
export default StringToMarkdown;
