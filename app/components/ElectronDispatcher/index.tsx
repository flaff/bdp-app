import * as React from 'react';
import * as moment from 'moment';
import {connect} from 'react-redux';
import {ipcRenderer} from 'electron';

type ElectronDispatcherProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;

class ElectronDispatcher extends React.Component<ElectronDispatcherProps> {
    constructor(props) {
        super(props);
        ipcRenderer.on('ACTION', this.onAction.bind(this));
        // ipcRenderer.send('ACTION', {
        //     type: 'CREATE_AND_PUSH_REPOSITORY',
        //     payload: {
        //         user: {
        //             name: 'flaff',
        //             email: 'flaff@email.com'
        //         },
        //         repository: {
        //             address: 'http://localhost:7617',
        //             name: 'flaff/views/some-view',
        //             type: 'VIEW',
        //             files: [
        //                 {
        //                     name: 'README.md',
        //                     content: '### markdown readme\n[google](http://google.pl)'
        //                 },
        //                 {
        //                     name: 'view.py',
        //                     content:
        //                     '# created ' + moment().format('HH:mm DD.MM.YYYY') + '\n' +
        //                     'import pandas as pd\nimport numpy as np'
        //                 }
        //             ]
        //         }
        //     }
        // })
    }

    render() {
        return (<div/>);
    }

    onAction(event, action) {
        console.log('[ElectronDispatcher] onAction', action);
        this.props.dispatch(action);
    }
}


const
    stateToProps = () => ({}),
    dispatchToProps = (dispatch) => ({
        dispatch
    });

export default connect(stateToProps, dispatchToProps)(ElectronDispatcher);