import React from 'react';
import cookie from 'cookie';

import Footer from '../components/footer';

import './landing.css';

export default class LandingPage extends React.Component {

	constructor() {
		super();

		this.state = {
			redirect: false
		};

		let cookies = cookie.parse(document.cookie);

		if(cookies.etid) {
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
				<div className="section-wrapper main">
					<div className="section-content">
						<img className="logo" src={require('../img/logo.png')} />
						<a href="http://api.streamachievements.com/auth/twitch" className="login-button twitch-login-button">
							<span className="login-button-icon">
								<img alt="" src={require('../img/twitch-glitch.png')} />
							</span>
							<span className="login-button-text">Login using Twitch</span>
						</a>					
					</div>
				</div>
				<div className="section-wrapper section-wrapper--full">
					<div className="section-content">
						<h2>What is StreamAchievements?</h2>
						<p>Stream Achievements is a fun and interactive platform to add that extra flair to a streaming channel's community through the power of achievements!</p>
						<p>With this system, a streamer will be able to create various achievements for their community to earn while interacting with stream!</p>
						<p>This isn't just for streamers though! For someone who just watches streams, you will be able to keep track of all the achievements you have earned from your favorite streamers!</p>
						<iframe width="560" height="315" src="https://www.youtube.com/watch?v=PS5k6bIW8q4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--alt">
					<div className="section-content">
						<h2>Easy To Use</h2>
						<p>Getting your channel stood up is quick and easy, thanks to integration with the support streaming platform!</p>
						<p>You'll be ready to get your fans engaged in no time!</p>
					</div>
				</div>
				<div className="section-wrapper">
					<div className="section-content">
						<div className="section-gfx">
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1559919160/achievements.png" />
						</div>
						<div className="section-info">
							<h2>Seamless Achievement Creation</h2>
							<p>Creating your first achievements is quick and painless, with helpful tips to guide you along the way!</p>
							<p>You are also able to see your achievement come to life as you are creating it!</p>
						</div>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--alt">
					<div className="section-content">
						<h2>Custom Achievements</h2>
						<div>
							<p>The sky is the limits!</p>
							<p>Award achievements for numerous activities, such as following, subbing, hosting, raiding, etc.!</p>
							<p>Create custom achievements for those quirks that make your stream awesome!</p>
						</div>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--full">
					<div className="section-content">
						<h2>We are still growing!</h2>
						<p>At launch, we wanted to provide a ton of exciting features for both the streamer and community alike, but know that this isn't all there is!</p>
						<p>As we press forward, more and more features will be released into StreamAchievements to add even more fun & engagement!</p>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--login">
					<div className="section-content">
						<p>What are you waiting for? Get started with your channel today, or use our tools to help spread the word to your favorite streamers to create achievements today!</p>
						<a href="http://api.streamachievements.com/auth/twitch" className="login-button twitch-login-button">
							<span className="login-button-icon">
								<img alt="" src={require('../img/twitch-glitch.png')} />
							</span>
							<span className="login-button-text">Login using Twitch</span>
						</a>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}