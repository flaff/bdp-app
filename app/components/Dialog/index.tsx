import * as React from 'react';
const styles = require('./styles.scss');

interface DialogProps {
    children?: any;
}

export default class Dialog extends React.Component<DialogProps> {
    render() {
        return (
            <div className={styles.dialog}>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}