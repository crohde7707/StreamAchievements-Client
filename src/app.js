import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

import './app.css';

class App extends Component {

  render() {

    return (
      		<div>
      			<Helmet>
      				<title>StreamAchievement</title>
      				<link rel="canonical" href="https://streamachievements.com" />
      			</Helmet>
            	{this.props.children}
        	</div>
    );
  }
}

export default App;
