import * as React from 'React';
import {connect} from 'react-redux';

import {StoreState} from '@state';

import Image from '../../components/Image/index';
import {Link, Redirect} from 'react-router-dom';
import {Button, Input} from 'antd';
import {Row, Column, Container, ContainerFluid} from '../../components/Bootstrap/index';
import {loginUser, logoutUser, restoreUser} from '../../state/actions/index';
import Preloader from '../../components/Preloader/index';

const styles = require('./Auth.scss');

interface AuthProps extends ReturnType<typeof stateToProps>, ReturnType<typeof dispatchToProps> {
}

interface AuthState {
    nameFieldValue: string;
    passwordFieldValue: string;
}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props) {
        super(props);
        this.state = {
            nameFieldValue: '',
            passwordFieldValue: ''
        };
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            nameFieldValue: event.target.value
        });
    }

    onPasswordInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            passwordFieldValue: event.target.value
        });
    }

    onLoginClick() {
        this.props.loginUser({
            name: this.state.nameFieldValue,
            password: this.state.passwordFieldValue
        });
    }

    render() {
        return this.props.authorized
            ? (
                <Redirect to={'/dashboard'} />
            ) : (
                <ContainerFluid className={'fullHeight ta-c'}>
                    {this.props.restoring && <Preloader absolute={true} className={'row'} color={'var(--blue)'}/>}
                    <Row className={'fullHeight'}>
                        <Column size={3}/>
                        <Column size={6} className={'flexCenterer'}>
                            <div>
                                <h1>Hello, guest</h1>

                                <Input className={'mb-2'}
                                       placeholder={'Name'}
                                       size={'large'}
                                       value={this.state.nameFieldValue}
                                       onChange={this.onNameInputChange}/>

                                <Input className={'mb-2'}
                                       placeholder={'Password'}
                                       size={'large'}
                                       type={'password'}
                                       value={this.state.passwordFieldValue}
                                       onChange={this.onPasswordInputChange}/>

                                <Button onClick={this.onLoginClick}
                                        size={'large'}>Login</Button>
                                <div>
                                    <Link to={'/register'}>Register</Link> or <Link to={'/dashboard'}>continue as guest</Link>
                                </div>
                            </div>
                        </Column>
                        <Column size={3}/>
                    </Row>
                </ContainerFluid>
            )
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
)(Auth);