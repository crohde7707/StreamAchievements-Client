import React from 'react';

import './home.css';

export default class Home extends React.Component {

	render() {
		return (
			<div className="login-prompt">
				<h2>Welcome to Stream Achievements</h2>
				<p>Stream Achievements is a fun and interactive platform to add that extra flair to a streaming channel's community!</p>
				<p>Please log in below to get started!</p>
				<div className="button-container">
					<a href="http://localhost:5000/auth/twitch" className="login-button twitch-login-button">
						<span className="login-button-icon">
							<img alt="" src={require('../img/twitch-glitch.png')} />
						</span>
						<span className="login-button-text">Login using Twitch</span>
					</a>
				</div>
			</div>
		);
	}
}