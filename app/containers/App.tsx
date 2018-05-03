import * as React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div style={{height: '100vh'}}>
        {this.props.children}
      </div>
    );
  }
}
