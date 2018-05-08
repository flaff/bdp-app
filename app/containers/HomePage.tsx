import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MainScreen from '../components/MainScreen/MainScreen';
import LoginScreen from './WelcomeScreen';
import ProjectCreation from '@components/ProjectCreation';

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <ProjectCreation />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
