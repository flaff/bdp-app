import * as React from 'react';
import {Icon} from 'antd';

const styles = require('./styles.css');

export default class StatusBar extends React.Component {
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
