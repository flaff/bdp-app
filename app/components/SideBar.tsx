import * as React from 'react';
import {Icon} from 'antd';
import * as classNames from 'classnames';

const styles = require('./SideBar.scss');

interface SideBarProps {
    className?: string;
}

export default class SideBar extends React.Component<SideBarProps> {
    render() {
        return (
            <div className={classNames(styles.sideBar, this.props.className)}>
                <div className={styles.entry}>
                    <Icon type="search" className={styles.icon} />
                    <div>Browse</div>
                </div>
                <div className={styles.entry}>
                    <Icon type="folder" className={styles.icon} />
                    <div>Project</div>
                </div>
                <div className={styles.entry}>
                    <Icon type="eye-o" className={styles.icon} />
                    <div>View</div>
                </div>
                <div className={styles.entry}>
                    <Icon type="database" className={styles.icon} />
                    <div>Model</div>
                </div>
                <div className={styles.entry}>
                    <Icon type="line-chart" className={styles.icon} />
                    <div>Visualization</div>
                </div>
            </div>
        );
    }
}
