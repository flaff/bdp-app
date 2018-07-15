import * as React from 'react';
import * as classNames from 'classnames';

type BootstrapColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColumnProps {
    size?: BootstrapColSize;
    className?: string;
    [any: string]: any;
}

const
    createBootstrapComponent = (bootstrapClassName: string) => (props: any = {}) => {
        const {children, className, ...otherProps} = props;
        return (
            <div {...otherProps} className={classNames(bootstrapClassName, className)}>{children}</div>
        )
    },
    ContainerFluid = createBootstrapComponent('container-fluid'),
    Container = createBootstrapComponent('container'),
    Row = createBootstrapComponent('row'),

    Column = (props: ColumnProps = {}) => {
        const {children, className, ...otherProps} = props;
        return (
            <div {...otherProps} className={classNames(`col${props.size ? '-' + props.size : ''}`, className)}>{children || ' '}</div>
        )
    };

export {
    Container,
    ContainerFluid,
    Row,
    Column
};
