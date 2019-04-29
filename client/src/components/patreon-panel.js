import React from 'react';
import connector from '../redux/connector';
import {syncPatreon} from '../redux/profile-reducer';
import axios from 'axios';

import './patreon-panel.css';

class PatreonPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.patreon === undefined) ? true : false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		console.log('shouldComponentUpdate');
		console.log(prevProps.patreon);
		console.log(this.props.patreon)
		if(prevProps.patreon === undefined && this.props.patreon !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	handleFollow = () => {
		//API call to follow on Patreon
	}

	handleSync = () => {
		// axios.post('/api/patreon/sync').then(res => {
		// 	this.props.dispatch(syncPatreon(res.data));
		// });
	}

	render() {
		console.log(this.state.loading);
		console.log(this.props.patreon);
		if(this.state.loading && this.props.patreon === undefined) {
			return null;
		}

		let patreonContent;

		if(this.props.patreon === false) {
			//Data retrieved, not connected
			patreonContent = (
				<div className="integration integration--patreon not-linked">
					<a className="patreonLink" href="http://localhost:5000/auth/patreon">
						<img alt="" src={require('../img/patreon-badge.png')} />
					    <span>Link Your Patreon</span>
				    </a>
			    </div>
			);
		} else {

			let {thumb_url, vanity, follower, status, gold} = this.props.patreon;
			let vanityContent, headerContent, bodyContent, banner;

			if(vanity) {
				vanityContent = (
					<div className="patreon--vanity">{vanityContent}</div>
				);
			}

			if(!follower) {
				banner = (
					<div className="patreon--banner">
						<div>Following the Patreon to get the latest updates!</div>
						<button className="follow-button" onClick={this.handleFollow}>Follow</button>
					</div>
				)
			}

			if(status === null) {
				bodyContent = (
					<div className="patreon--content">
						<div className="support">
							<div>Love having achievements from your favorite streamers and want to help support keeping this service running? Consider becoming a Patron!</div>
							<img src={require('../img/silver-ach.png')} />
							<button onClick={this.becomeSilver} type="button">Become a Supporter</button>
						</div>
						<div className="upgrade">
							<div>Are you enjoying offering achievements to your community, and want to extend what you can offer? Enable all of the features by becoming a <span className="gold">Gold Achievement</span>!</div>
							<img src={require('../img/gold-ach.png')} />
							<button onClick={this.becomeGold} type="button">Upgrade to Gold</button>
						</div>
					</div>
				);
			} else if (status === 'active_patron') {
				if(gold) {
					bodyContent = (
						<div className="patreon--content column-layout">
							<h3>You are currently a <span>Gold Achievement</span>!</h3>
							<p>Thank you so much for support Stream Achievements! With your generous support, we are able to keep this site running, and providing you a way to truly engage your communty members!</p>
							<p>With this level of support, you have enabled the full potential that Stream Achievements has to offer! Take a look below at the features you have, and adjust your achievements to take advantage of the full suite!</p>
							<h4>List of Features</h4>
							<div className="patreon--features">
								<div>Chat-Triggered Achievements</div>
								<div>Custom Achievement Icons</div>
								<div>Icon Gallery</div>
								<div>Secret Achievements</div>
								<div>Channel Themes</div>
								<div>Gold-Level Discord Role</div>
								<div>Sneak Peaks</div>
							</div>
						</div>
					)
				}
			}

			patreonContent = (
				<div className="integration integration--patreon">
					<div className="integration-header">
						<img alt="" src={require('../img/patreon-icon.png')} />
						<h3>Patreon</h3>
						<div className="integration-sync">
							<a href="javascript:;" onClick={this.handleSync}><img alt="" src={require('../img/sync-white.png')} /></a>
						</div>
					</div>
					<div className="integration-content">
						<div className="patreon--left">
							<div className="patreon--thumb">
								<img alt="Patreon User Thumbnail" src={thumb_url} />
							</div>
							{vanityContent}
						</div>
						<div className="patreon--right">
							{/*banner*/}
							{headerContent}
							{bodyContent}
						</div>
					</div>
				</div>
			);
		}

		return patreonContent;
	}
}

function headerMapStateToProps(state) {
	console.log(state);
	return {
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(PatreonPanel);