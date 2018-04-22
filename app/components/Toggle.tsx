import * as React from 'react';
const css = require('./Toggle.css');

interface ToggleProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: boolean;
}

export default function Toggle(props: ToggleProps) {
  return (
    <div className={`${css.toggle} ${props.value && css.on}`} onClick={props.onClick}>
      <div className={css.indicator}/>
    </div>
  )
}
