import * as React from 'react';
import {remote} from 'electron';
const styles = require('./WindowButtons.css');

const
    close = require('./close.svg'),
    maximize = require('./maximize.svg'),
    // restore = require('./restore.svg'),
    minimize = require('./minimize.svg');


const
  onMinimize = () => remote.getCurrentWindow().minimize(),
  onMaximize = () => {
    const window = remote.getCurrentWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
  },
  onClose = () => remote.getCurrentWindow().close();

export default () => (
  <div className={styles.windowButtons}>
    <div className={styles.draggableArea} />
    <i onClick={onMinimize}>
        <img src={minimize} />
    </i>
    <i onClick={onMaximize}>
        <img src={maximize} />
    </i>
    <i onClick={onClose} className={styles.close}>
        <img src={close} />
    </i>
  </div>
);
