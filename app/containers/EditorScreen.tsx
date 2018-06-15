import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MainScreen from '../components/MainScreen/MainScreen';
import LoginScreen from './WelcomeScreen';
import ProjectCreation from '@components/ProjectCreation';

export class EditorScreen extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <MainScreen />
    );
  }
}

export default (EditorScreen as any as React.StatelessComponent<RouteComponentProps<any>>);
