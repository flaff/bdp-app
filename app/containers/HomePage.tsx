import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MainScreen from '../components/MainScreen';

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <MainScreen />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
