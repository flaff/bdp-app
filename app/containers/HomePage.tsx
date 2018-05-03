import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MainScreen from '../components/MainScreen/MainScreen';
import LoginScreen from './WelcomeScreen';
import ProjectCreationScreen from './ProjectCreationScreen';

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <ProjectCreationScreen />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
