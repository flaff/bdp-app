import * as React from 'react';
import {shell} from 'electron';
import Link from '@components/Link';

interface linkNode {
    href: string;
    children: React.ReactChildren;
}

const linkRenderer = (linkNode: linkNode) => {
    return (
        <Link onClick={() => shell.openExternal(linkNode.href)}>
            {linkNode.children}
        </Link>
    )
};

export default linkRenderer;
