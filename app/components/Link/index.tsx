import * as React from 'react';
import * as classnames from 'classnames';
import {shell} from 'electron';

const styles = require('./styles.scss');

interface LinkProps {
    onClick?: () => void;
    children: any;
    className?: string;
    href?: string;
}

const Link = (props: LinkProps) => {
    const {className, children, ...restProps} = props,
        onClick = props.onClick || props.href && (() => shell.openExternal(props.href as string));
    return <span className={classnames(styles.link, className)} {...restProps} onClick={onClick as any}>{children}</span>
};

export default Link;
