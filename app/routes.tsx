import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import App from './containers/App';
import HomePage from './containers/EditorScreen';
import Auth from './containers/Auth/Auth';
import RegisterForm from './containers/RegisterForm/RegisterForm';
import UserBar from './containers/UserBar/UserBar';
import Dashboard from './containers/Dashboard/Dashboard';
import ProjectCreation from '@components/ProjectCreation';
import ProjectEditor from '@components/ProjectEditor';
import ElectronDispatcher from '@components/ElectronDispatcher';

export default () => (
    <App>
        <UserBar/>
        <ElectronDispatcher />
        <Switch>
            <Route exact path="/" component={Auth}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/newProject" component={ProjectCreation}/>
            <Route path="/project/:projectAuthor/:projectName" component={ProjectEditor} />
        </Switch>
    </App>
);
