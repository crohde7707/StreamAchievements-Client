import React, { Component } from 'react';
import cookie from 'cookie';

import './app.css';

import AchievementsList from './achievement-list.js';

class App extends Component {

	constructor() {
		super();

		this.state = {
			user: ''
		};
	}

	componentDidMount() {
		if(document && document.cookie) {
			let cookies = cookie.parse(document.cookie);

			console.log(cookies.name);
			this.setState({
				name: cookies.name
			});
		} else {
			console.log('no document');
		}

		
	}

  render() {
    return (
      		<div>
            	<h1 id="header">Phirestarter Achievements</h1>
            	<AchievementsList name={this.state.user} />
        	</div>
    );
  }
}

export default App;
