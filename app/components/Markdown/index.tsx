import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import linkRenderer from './link';
import codeRenderer from './code';
import textRenderer from './text';

const styles = require('./styles.scss');

interface MarkdownProps {
    source: string;
}

const Markdown = (props: MarkdownProps) => {
    return <ReactMarkdown
        className={styles.md}
        renderers={{
            'link': linkRenderer,
            'code': codeRenderer,
            'text': textRenderer
        }}
        {...props} />
};

export default Markdown;
