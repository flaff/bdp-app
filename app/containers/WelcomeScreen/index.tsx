import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import Image from '@components/Image';
import {StoreState} from '@state';
import UserHighlight from '@components/UserHighlight';


const styles = require('./styles.css');

interface WelcomeScreenProps extends ReturnType<typeof stateToProps>, ReturnType<typeof dispatchToProps> {
}

class WelcomeScreen extends React.Component<WelcomeScreenProps, {}> {
    render() {
        return (
            <div className={styles.LoginScreen}>
                <Image base64={this.props.avatar} className={styles.avatar}/>
                <div>Welcome,{' '}
                    <UserHighlight name={this.props.name}>
                        <a>{this.props.name}</a>
                    </UserHighlight>
                    !
                </div>
                <div>Not </div>
                <div></div>
            </div>
        )
    }
}

const stateToProps = (state: StoreState) => ({
        avatar: state.auth.avatar,
        name: state.auth.name
    }),
    dispatchToProps = () => ({});

export default connect(
    stateToProps
)(WelcomeScreen as any) as any as React.StatelessComponent<WelcomeScreenProps>;
