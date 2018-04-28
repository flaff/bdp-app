import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import linkRenderer from './link';
import codeRenderer from './code';

interface MarkdownProps {
    source: string;
}

const Markdown = (props: MarkdownProps) => {
    return <ReactMarkdown
        renderers={{
            'link': linkRenderer,
            'code': codeRenderer
        }}
        {...props} />
};

export default Markdown;
