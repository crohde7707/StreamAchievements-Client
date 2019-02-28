import React, { Component } from 'react';
import cookie from 'cookie';
import { Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

class App extends Component {

  render() {

    return (
      		<div>
            	{this.props.children}
        	</div>
    );
  }
}

export default App;
