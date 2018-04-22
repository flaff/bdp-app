import * as React from 'react';
import {Icon} from 'antd';

const styles = require('./Statusbar.css');

export default class Statusbar extends React.Component {
  render() {
    return (
      <div className={styles.statusBar}>
        <span className={styles.success}>
          <span className={styles.text}>Ready</span>
          <Icon type={'check-circle'} />
        </span>
      </div>
    );
  }
}
