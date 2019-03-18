import React from 'react';
import cookie from 'cookie';

import './landing.css';

export default class LandingPage extends React.Component {

	constructor() {
		super();

		this.state = {
			redirect: false
		};

		let cookies = cookie.parse(document.cookie);

		if(cookies.id_token) {
			this.state.redirect = true;
		}
	}

	render() {

		let redirect;

		console.log(this.state);

		if(this.state.redirect) {
			let Redirect = require('react-router-dom').Redirect;

			redirect = <Redirect to='/home' />;
		}

		return (
			<div className="landing-page">
				{redirect}
				<div className="landing-header">
					<div className="site-logo">

					</div>
					<a href="http://localhost:5000/auth/twitch" className="login-button twitch-login-button">
						<span className="login-button-icon">
							<img alt="" src={require('../img/twitch-glitch.png')} />
						</span>
						<span className="login-button-text">Login using Twitch</span>
					</a>
					
				</div>
				<div className="section-wrapper">
					<div className="section-content">
						<h1>Welcome to Stream Achievements</h1>
						<p>Stream Achievements is a fun and interactive platform to add that extra flair to a streaming channel's community!</p>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--alt">
					<div className="section-content">
						<p>Add your own personal flair to your channel, providing customized icons for each achievement, and even costomize the theme of your channel page!</p>
						<h2>Channel Personalization</h2>
					</div>
				</div>
			</div>
		);
	}
}