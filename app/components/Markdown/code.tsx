import * as React from 'react';
import {Highlight} from 'react-fast-highlight';

interface codeNode {
    language?: string;
    value?: string;
    children?: React.ReactChildren;
}

const codeRenderer = (codeNode: codeNode) => {
    return codeNode.value ? (
        <Highlight languages={[codeNode.language]}>
            {codeNode.value}
        </Highlight>
    ) : (<code>{'empty'}</code>)
};

export default codeRenderer;
