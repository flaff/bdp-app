import * as React from 'react';
import * as classNames from 'classnames';
const styles = require('./styles.scss');

interface ImageProps {
  base64?: string;
  src?: string;
  className?: string;
}

const
    base64Prefix = 'data:image/png;base64,',
    base64Src = (base64: string) => base64.indexOf(base64Prefix) === -1 ? `${base64Prefix}${base64}` : base64;

export default (props: ImageProps) => (
  <img src={props.src || props.base64 && base64Src(props.base64)}
       className={classNames(styles.image, props.className)} />
);
