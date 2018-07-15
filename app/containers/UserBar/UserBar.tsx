import * as React from 'React';
import {connect} from 'react-redux';

import {StoreState} from '@state';

import Image from '../../components/Image/index';
import {Link} from 'react-router-dom';
import {Icon, Popover, Drawer} from 'antd';
import {loginUser, logoutUser, restoreUser} from '../../state/actions/index';
import Preloader from '../../components/Preloader/index';

const styles = require('./UserBar.scss');

interface UserBarProps extends ReturnType<typeof stateToProps>, ReturnType<typeof dispatchToProps> {
}

interface UserBarState {
    drawerVisible: boolean;
}

class User extends React.Component<UserBarProps, UserBarState> {
    constructor(props) {
        super(props);

        this.state = {
            drawerVisible: false
        };

        if (props.token && !props.authorized) {
            props.restoreUser({token: props.token});
        }

        this.renderPopover = this.renderPopover.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    renderPopover() {
        return !this.props.authorized ? (
            <div>
                <div>
                    <b>Authorization failed.</b>
                </div>
                To restore privilleges <Link to={'/'}>sign in</Link>.
            </div>
        ) : (
            <div className={'ta-c'}>
                <div className={styles.bigAvatar}>
                    <Image base64={this.props.avatar}/>
                </div>

                <div>
                    Logged in as <b>{this.props.userName}</b>
                </div>
                <div>
                    <Icon type="safety" style={{color: 'var(--green)', fontSize: '24px'}}/>
                </div>

                <Link to={'/'} onClick={this.props.logoutUser}>
                    Logout
                </Link>
            </div>
        )
    }

    toggleDrawer() {
        this.setState({
            drawerVisible: !this.state.drawerVisible
        });
    }

    render() {
        return (
            <div className={styles.userBar}>
                {/*<Popover placement="bottomRight" content={this.renderPopover()} trigger="click">*/}
                    <div className={styles.avatar} onClick={this.toggleDrawer}>
                        <Image base64={this.props.avatar}/>
                        {this.props.restoring && <Preloader size={20} strokeWidth={2} absolute/>}
                        {!this.props.restoring && !this.props.authorized &&
                        <div className={styles.authWarning}>
                            <Icon type={'warning'} />
                        </div>}
                    </div>
                <Drawer
                    onClose={this.toggleDrawer}
                    closable={false}
                    visible={this.state.drawerVisible}>
                    {this.renderPopover()}
                </Drawer>
                {/*</Popover>*/}
            </div>
        );
    }
}

const
    stateToProps = (state: StoreState) => ({
        token: state.auth.token,
        authorized: state.auth.authorized,
        userName: state.auth.name,
        avatar: state.auth.avatar,
        restoring: state.auth.restoring
    }),

    dispatchToProps = (dispatch) => ({
        loginUser: loginUser(dispatch),
        restoreUser: restoreUser(dispatch),
        logoutUser: logoutUser(dispatch)
    });

export default connect(
    stateToProps,
    dispatchToProps
)(User);