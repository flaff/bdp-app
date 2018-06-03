import * as React from 'React';
import {connect} from 'react-redux';

import {StoreState} from '@state';

import Image from '@components/Image';
import {Link} from 'react-router-dom';
import {Button, Input} from 'antd';
import {Row, Column, Container, ContainerFluid} from '@components/Bootstrap';
import {loginUser} from '@state/actions';

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
                <div>
                    <h1>Hello, {this.props.userName}</h1>
                    <div><Image base64={this.props.avatar}/></div>
                </div>
            ) : (
                <ContainerFluid className={'fullHeight ta-c'}>
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
                                    <Link to={'/dashboard'}>Continue as guest</Link>
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
        authorized: state.auth.authorized,
        userName: state.auth.name,
        avatar: state.auth.avatar
    }),

    dispatchToProps = (dispatch) => ({
        loginUser: loginUser(dispatch)
    });

export default connect(
    stateToProps,
    dispatchToProps
)(Auth);