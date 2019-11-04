import React from 'react';
import connector from '../redux/connector';
import {syncPatreon, unlinkService} from '../redux/profile-reducer';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';

import './patreon-panel.css';

const PATREON_URL = 'https://www.patreon.com/join/streamachievements';
const PATREON_MEMBERSHIPS = 'https://www.patreon.com/pledges';

class PatreonPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.patreon === undefined) ? true : false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		if(prevProps.patreon === undefined && this.props.patreon !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	goToPatreon = () => {
		var win = window.open(PATREON_URL, '_blank');
		win.focus();
	}

	goToPatreonM = () => {
		var win = window.open(PATREON_MEMBERSHIPS, '_blank');
		win.focus();
	}

	handleFollow = () => {
		//API call to follow on Patreon
	}

	handleSync = () => {
		this._sync.classList.add('active');
		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/patreon/sync', {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			this.props.dispatch(syncPatreon(res.data));
		});
	}

	showUnlink = () => {
		this.setState({
			showConfirm: true
		})
	}

	handleUnlink = () => {
		this.setState({
			showConfirm: false
		});

		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/patreon/unlink', {}, {
			withCredentials: true
		}).then(res => {
			if(res.data.success) {
				this.props.dispatch(unlinkService(res.data.service));
			} else {
				//handle error
			}
			
		});
	}

	render() {
		if(this.state.loading && this.props.patreon === undefined) {
			return null;
		}

		let patreonContent, confirmPanel;

		if(this.state.showConfirm) {
			let goldInfo;

			if(this.props.patreon.gold) {
				goldInfo = (<div>Being a gold status, your benefits will be disabled until you add back a patreon that is an active patron to Stream Achievements! You will still be able to use the free tier benefits!</div>);
			}
			confirmPanel = (
				<ConfirmPanel
					onConfirm={this.handleUnlink}
					onCancel={() => {this.setState({showConfirm: false})}}
				>
					<div>Are you sure you want to unlink your Patreon?</div>
					{goldInfo}
					<div className="strong">Note: This will NOT cancel your patreon pledge!! You will need to manage your pledge through Patreon!</div>
				</ConfirmPanel>
			);
		}

		if(this.props.patreon === false) {
			//Data retrieved, not connected
			patreonContent = (
				<div className="integration integration--patreon not-linked">
					<a className="patreonLink" href={process.env.REACT_APP_API_DOMAIN + "auth/patreon"}>
						<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1567266620/patreon-badge.png" />
					    <span>Link Your Patreon</span>
				    </a>
			    </div>
			);
		} else {

			let {thumb_url, vanity, follower, status, gold} = this.props.patreon;
			let vanityContent, headerContent, bodyContent, banner;

			let goldFeatures = (
				<div className="patreon--features">
					<div>Chat-Triggered Achievements</div>
					<div>Custom Achievement Icons</div>
					<div>Icon Gallery (coming soon!)</div>
					<div>Channel Themes (coming soon!)</div>
					<div>Gold-Level Discord Role</div>
					<div>Sneak Peaks</div>
				</div>
			);

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

			if(status === null || status === 'former_patron') {

				let feedback;

				if(status === 'former_patron') {
					feedback = (
						<div className="feedback">
							Thank you so much for the support you showed in the past! If there is anything we could do to improve the system, feel free to <a href="mailto:streamachievements.official@gmail.com">let us know</a>!
						</div>
					);
				}

				bodyContent = (
					<div>
						{feedback}
						<div className="patreon--content">
							<div className="support">
								<div>Love having achievements from your favorite streamers and want to help support keeping this service running? Consider becoming a Patron!</div>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1558834120/default-icon-silver.png" />
								<button onClick={this.goToPatreon} type="button">Become a Supporter</button>
							</div>
							<div className="upgrade">
								<div>Are you enjoying offering achievements to your community, and want to extend the capibilities even further? Enable all of the features by becoming a <span className="gold">Gold Achievement</span>!</div>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png" />
								<button onClick={this.goToPatreon} type="button">Upgrade to Gold</button>
							</div>
						</div>
					</div>
				);
			} else if (status === 'active_patron') {
				if(gold) {
					bodyContent = (
						<div className="patreon--content column-layout">
							<h3>Stream Achievements Gold</h3>
							<p>Thank you so much for support Stream Achievements! With your generous support, we are able to keep this site running, and continue providing a way to truly engage with the communities you love!</p>
							<p>With this level of support, you have enabled the full potential that Stream Achievements has to offer! Take a look below at the features you have, and adjust your achievements to take advantage of the full suite!</p>
							<h4>List of Features</h4>
							{goldFeatures}
						</div>
					);
				} else {
					let owner;
					if(this.props.profile && this.props.profile.status === 'verified') {
						owner = (
							<div className="upgrade">
								<div>Are you enjoying the features you are providing, but wanting to hook up more for your community? Consider trying out the Gold Achievement tier!</div>
								<h4>List of Gold Achievement Features</h4>
								{goldFeatures}
								<button onClick={this.goToPatreon} type="button">Upgrade to Gold</button>
							</div>
						);
					}

					bodyContent = (
						<div className="patreon--content patreon--active column-layout">
							<h3>You are currently a <span>Silver Achievement</span>!</h3>
							<p>Thank you so much for support Stream Achievements! With your generous support, we are able to keep this site running, and continue providing a way to truly engage with the communities you love!</p>
							{owner}
						</div>	
					);
				}
			} else if(status === 'declined_patron') {
				bodyContent = (
					<div className="patreon--content column-layout">
						<h3>Whoops!</h3>
						<p>Looks like something went wrong with your pledge!</p>
						<p>You may want to go check your status on Patreon to see if your pledge is still active!</p>
						<button onClick={this.goToPatreonM} type="button">Go to Patreon</button>
					</div>
				)
			}

			patreonContent = (
				<div className="integration integration--patreon">
					<div className="integration-header">
						<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1567266756/patreon-icon.png" />
						<h3>Patreon</h3>
						<div className="integration-unlink">
							<a title="Unlink Patreon" href="javascript:;" onClick={this.showUnlink}>
								<img alt="Unlink" src="https://res.cloudinary.com/phirehero/image/upload/v1572732837/unlink.png" />
							</a>
						</div>
						<div className="integration-settings">
							<a title="Opens Patreon profile in new tab" href="https://www.patreon.com/user/creators" target="_blank"><img alt="Settings" src="https://res.cloudinary.com/phirehero/image/upload/v1561746754/settings.png" /></a>
						</div>
						<div className="integration-sync" ref={(el) => {this._sync = el}}>
							<a title="Sync with Patreon" href="javascript:;" onClick={this.handleSync}><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1572808522/sync-white.png" /></a>
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
					{confirmPanel}
				</div>
			);
		}

		return patreonContent;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(PatreonPanel);