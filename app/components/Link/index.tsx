import * as React from 'react';
import * as classnames from 'classnames';

const styles = require('./styles.scss');

interface LinkProps {
    onClick?: () => void;
    children: any;
    className?: string;
}

const Link = (props: LinkProps) => {
    const {className, children, ...restProps} = props;
    return <span className={classnames(styles.link, className)} {...restProps}>{children}</span>
};

export default Link;
