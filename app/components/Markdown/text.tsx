import * as React from 'react';
import {isAnLatex, default as latexRenderer} from '@components/Markdown/latex';

type textNode = string;
const textRenderer = (TEXT: textNode) => {
    return (
        isAnLatex(TEXT) ? latexRenderer(TEXT) : <span>{TEXT}</span>
    )
};

export default textRenderer;
