import * as React from 'react';
import * as classNames from 'classnames';
import {Icon, Button} from 'antd';

const styles = require('./styles.scss');

export type NotificationType = 'warning' | 'info' | 'success' | 'error' | undefined;

interface NotificationProps {
    type?: NotificationType;

    buttonLoading?: boolean;
    buttonText?: string;
    buttonIcon?: string;
    onButtonClick?: () => void;
    children?: any;
}

const
    notificationTypeToColorMap = {
        'warning': 'orange',
        'info': 'blue',
        'error': 'red',
        'success': 'green'
    },

    notificationTypeToColor = (type: NotificationType) => {
        const color = type && notificationTypeToColorMap[type];
        return color && `var(--${color})`;
    },

    Notification = (props: NotificationProps) => (
        <div className={classNames(styles.notification)} style={{background: notificationTypeToColor(props.type)}}>
            <div>{props.children}</div>
            {(props.buttonText || props.buttonIcon) && (
                <Button
                    ghost
                    type={'dashed'}
                    className={styles.button}
                    icon={props.buttonIcon}
                    size={'small'}
                    onClick={props.onButtonClick}
                    loading={props.buttonLoading}>
                    <span className={styles.buttonText}>{props.buttonText}</span>
                    </Button>
            )}
        </div>
    );

export default Notification;
