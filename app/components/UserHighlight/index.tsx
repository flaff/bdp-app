import * as React from 'react';
import {Popover, Icon} from 'antd';
import Image from '@components/Image';
import {GETUserHighlight} from '../../api';
import Link from '@components/Link';

import {TooltipPlacement} from 'antd/lib/tooltip';

const styles = require('./styles.scss');

interface UserHighlightProps {
    children?: any;
    name?: string;
    placement?: TooltipPlacement;
}

interface UserHighlightState {
    fetched?: string;
    avatar?: string;
}

export default class UserHighlight extends React.Component<UserHighlightProps, UserHighlightState> {
    constructor(props) {
        super(props);
        this.state = {};
    }


    renderPopoverContent() {
        return (
            <div className={styles.popoverContent}>
                <div className={styles.name}>{this.props.name}</div>
                {this.state.fetched
                    ? <Image base64={this.state.avatar} className={styles.avatar} />
                    : <Icon type="loading"/>}
                <div>
                    <Link onClick={() => null} className={styles.showProfileLink}>Show profile</Link>
                </div>
            </div>
        )
    }

    onUserData(userData: any) {
        this.setState({
            ...this.state,
            fetched: userData.name,
            avatar: userData.avatar
        })
    }

    onVisibleChange(isVisible: boolean) {
        if (isVisible && this.state.fetched !== this.props.name && this.props.name) {
            GETUserHighlight.fetch({userName: this.props.name})
                .then(this.onUserData.bind(this))
        }
    }

    render() {
        return (
            <Popover content={this.renderPopoverContent()}
                     onVisibleChange={this.onVisibleChange.bind(this)}
                     mouseLeaveDelay={0.5}
                     mouseEnterDelay={0}
                     placement={this.props.placement}
                     overlayClassName={styles.popover}>
                {this.props.children}
            </Popover>
        )
    }
}