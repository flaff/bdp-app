import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('./styles.scss');

type PreloaderProps = {
    color?: string;
    size?: number;
    strokeWidth?: number;
    absolute?: boolean;
    dimColor?: string;
    className?: string;
};

const Preloader = (props: PreloaderProps) => (
    <div className={classNames(styles.preloader, props.className, {[styles.absolute]: props.absolute})} style={{background: props.dimColor}}>
        <svg style={{
            width: props.size && `${props.size}px`,
            height: props.size && `${props.size}px`,
            marginBottom: props.size && `-${props.size/5}px`,
            marginRight: props.size && `-${props.size/15}px`
        }} viewBox="-3 -4 39 39">
            <polygon points="32,0 0,0 16,25"
                     stroke={props.color} style={{strokeWidth: props.strokeWidth || 1}} />
        </svg>
    </div>
);

export default Preloader;
