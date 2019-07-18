import React from 'react';
import cookie from 'cookie';

import Footer from '../components/footer';

import './landing.css';

export default class LandingPage extends React.Component {

	constructor() {
		super();

		this.state = {
			redirect: false,
			cookieConsent: true
		};

		let cookies = cookie.parse(document.cookie);

		if(cookies.etid) {
			this.state.redirect = true;
		}

		if(!cookies._sacc) {
			this.state.cookieConsent = false;
		}
	}

	handleConsent = () => {
		let expires = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
		document.cookie= `_sacc=true;domain=${process.env.REACT_APP_COOKIE_DOMAIN};expires=${expires}`;
		this.setState({
			cookieConsent: true
		});
	}

	render() {
		let redirect, cookieConsentBanner;

		if(this.state.redirect) {
			let Redirect = require('react-router-dom').Redirect;

			redirect = <Redirect to='/home' />;
		}

		if(!this.state.cookieConsent) {
			cookieConsentBanner = (
				<div className="cookie-consent">
					<div className="verbage">This site uses cookies in order to function properly and to provide the best experience! By using StreamAchievements, you agree to our <a href="https://app.termly.io/document/cookie-policy/2ac2531d-6f49-4c78-8f41-ac8edd8b3c39" target="_blank">use</a> of cookies.</div>
					<div><a href="javascript:;" onClick={this.handleConsent} className="accept">Accept</a></div>
				</div>
			);
		}

		return (
			<div className="landing-page">
				{redirect}
				<div className="section-wrapper main">
					<div className="section-content">
						<img className="logo" src={require('../img/logo.png')} />
						<a href={process.env.REACT_APP_API_DOMAIN + "auth/twitch"} className="login-button twitch-login-button">
							<span className="login-button-icon">
								<img alt="" src={require('../img/twitch-glitch.png')} />
							</span>
							<span className="login-button-text">Login using Twitch</span>
						</a>					
					</div>
				</div>
				<div className="section-wrapper section-wrapper--full">
					<div className="section-content">
						<h2>What is Stream Achievements?</h2>
						<p>Stream Achievements is a fun and interactive platform that adds in extra flair to a streaming channel's community through the power of achievements!</p>
						<p>With this system, a content creator is able to provide various achievements for their community to earn while they interact with the stream!</p>
						<p>This isn't just for streamers though! As a community member, you will be able to keep track of all the achievements you have earned from your favorite streamers!</p>
						<div className="yt-wrapper">
							<div className="yt-container">
								<iframe className="yt-vid" src="https://www.youtube.com/embed/PS5k6bIW8q4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--alt">
					<div className="section-content">
						<h2>Easy To Use</h2>
						<div>
							<p>Getting started with your channel is quick and easy thanks to our integration with the supported streaming platforms!</p>
							<p>You'll be ready to further engage your community in no time!</p>
						</div>
					</div>
				</div>
				<div className="section-wrapper">
					<div className="section-content">
						<div className="section-gfx">
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561146121/achgfx.png" />
						</div>
						<div className="section-info">
							<h2>Seamless Achievement Creation</h2>
							<p>Creating your first achievements will be quick and painless, with helpful tips guiding you along the way!</p>
							<p>You will also able to see your achievements come to life as you are creating them!</p>
						</div>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--alt">
					<div className="section-content">
						<h2>Custom Achievements</h2>
						<div>
							<p>The possibilities are limitless when it comes to custom achievements!</p>
							<p>Award achievements for numerous activities, including follows, subs, hosts, donations, etc.!</p>
							<p>Create custom achievements for those unique moments that make your stream stand out!</p>
						</div>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--full">
					<div className="section-content">
						<h2>We are still growing!</h2>
						<p>At launch, we wanted to provide many exciting features for both the content creators and their communities, however, this isn't where it ends!</p>
						<p>As we continue to work towards providing the best experience, you can look forward to more features being released that will add even more fun & engagement to your channel!</p>
					</div>
				</div>
				<div className="section-wrapper section-wrapper--login">
					<div className="section-content">
						<p>What are you waiting for? Get started today with Stream Achievements and help spread the word to get your favorite streamers creating their own achievements!</p>
						<a href={process.env.REACT_APP_API_DOMAIN + "auth/twitch"} className="login-button twitch-login-button">
							<span className="login-button-icon">
								<img alt="" src={require('../img/twitch-glitch.png')} />
							</span>
							<span className="login-button-text">Login using Twitch</span>
						</a>
					</div>
				</div>
				<Footer />
				{cookieConsentBanner}
			</div>
		);
	}
}