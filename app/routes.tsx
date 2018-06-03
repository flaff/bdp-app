import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Auth from './containers/Auth';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Auth} />
    </Switch>
  </App>
);
