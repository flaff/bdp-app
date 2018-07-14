import * as React from 'react';
import * as Latex from 'react-latex';

const
    latexRegex = /[$]{2}([^\n]*)[$]{2}/,

    latexRenderer = (text: string) =>
        <Latex displayMode={true}>{text}</Latex>;

export const isAnLatex = (text: string) => latexRegex.test(text);
export default latexRenderer;
