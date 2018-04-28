import * as React from 'react';

interface linkNode {
    href: string;
    children: React.ReactChildren;
}

const linkRenderer = (linkNode: linkNode) => {
    return (
        <a href={linkNode.href} target={'_blank'}>
            {linkNode.children}
        </a>
    )
};

export default linkRenderer;
