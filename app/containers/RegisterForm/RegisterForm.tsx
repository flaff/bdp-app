import * as React from 'react';
import {connect} from 'react-redux';

import {StoreState} from '@state';
import {registerUser} from '../../state/actions/index';
import {Column, ContainerFluid, Row} from '../../components/Bootstrap/index';
import Preloader from '../../components/Preloader/index';
import {Button, Input} from 'antd';
import {Link} from 'react-router-dom';

const styles = require('./RegisterForm.scss');

type RegisterFormProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;
type RegisterFormState = {
    nameFieldValue: string;
    passwordFieldValue: string;
    repeatedPasswordFieldValue: string;
};

class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
    constructor(props) {
        super(props);

        this.state = {
            nameFieldValue: '',
            passwordFieldValue: '',
            repeatedPasswordFieldValue: '',
        };

        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
        this.onRepeatedPasswordInputChange = this.onRepeatedPasswordInputChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
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

    onRepeatedPasswordInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            repeatedPasswordFieldValue: event.target.value
        });
    }

    onRegisterClick() {
        this.props.registerUser({
            name: this.state.nameFieldValue,
            password: this.state.passwordFieldValue
        });
    }

    render() {
        return (
            <ContainerFluid className={'fullHeight ta-c'}>
                {this.props.registering && <Preloader absolute={true} className={'row'} color={'var(--blue)'}/>}
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

                            <Input className={'mb-2'}
                                   placeholder={'Password'}
                                   size={'large'}
                                   type={'password'}
                                   value={this.state.repeatedPasswordFieldValue}
                                   onChange={this.onRepeatedPasswordInputChange}/>

                            <Button onClick={this.onRegisterClick}
                                    size={'large'}>Register</Button>
                            <div>
                                Go back to <Link to={'/'}>sign-in form</Link>
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
        registering: state.auth.registering
    }),
    dispatchToProps = (dispatch) => ({
        registerUser: registerUser(dispatch)
    });

export default connect(stateToProps, dispatchToProps)(RegisterForm);
