import * as React from 'react';
import Highlight from 'react-highlight.js';

interface codeNode {
    language?: string;
    value?: string;
    children?: React.ReactChildren;
}

const codeRenderer = (codeNode: codeNode) => {
    return <code className={'hljs'}>{codeNode.value}</code>;
    // return codeNode.value ? (
    //     <Highlight language={codeNode.language}>
    //         <span>{codeNode.value}</span>
    //     </Highlight>
    // ) : (<code>{'empty'}</code>)
};

export default codeRenderer;
