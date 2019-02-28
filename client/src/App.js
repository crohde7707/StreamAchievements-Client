import React, { Component } from 'react';
import cookie from 'cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './routes/home';

import './app.css';

class App extends Component {


  render() {

    return (
      		<div>
            	<h1 id="header">Stream Achievements</h1>
            	{this.props.children}
        	</div>
    );
  }
}

export default App;
