import React from 'react';
import connector from '../redux/connector';
import {unlinkPlatform, syncPlatform} from '../redux/profile-reducer';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';
import LogoffPanel from '../components/logoff-panel';

import './platform-integration-panel.css';

class PlatformIntegrationPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.profile === undefined) ? true : false,
			showLogoff: false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		if(prevProps.profile === undefined && this.props.profile !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	handleSync = (platform) => {
		this._sync.classList.add('active');
		axios.post(`${process.env.REACT_APP_API_DOMAIN}auth/${platform}/sync`, {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			this.props.dispatch(syncPlatform(res.data, platform));
		});
	}

	showUnlink = () => {
		this.setState({
			showConfirm: true
		})
	}

	handleUnlink = () => {
		let stateUpdate = {
			showConfirm: false
		}

		let platform = this.props.platform.toLowerCase();

		axios.post(`${process.env.REACT_APP_API_DOMAIN}auth/${platform}/unlink`, {}, {
			withCredentials: true
		}).then(res => {
			if(res.data.success) {
				if(res.data.logoff) {
					stateUpdate.showLogoff = true;
				}

				this.setState(stateUpdate);
				
				this.props.dispatch(unlinkPlatform(res.data.platform));
			} else {
				//handle error
			}
			
		});
	}

	render() {
		let content = null;
		let confirmPanel;

		if(this.state.loading && this.props.profile === undefined) {
			return null;
		}

		if(this.state.showConfirm) {
			confirmPanel = (
				<ConfirmPanel
					onConfirm={() => this.handleUnlink(this.props.platform)}
					onCancel={() => {this.setState({showConfirm: false})}}
				>
					<div>{`Are you sure you want to unlink your ${this.props.platform} account?`}</div>
				</ConfirmPanel>
			);
		}

		let platform = this.props.platform.toLowerCase();
		let platformData = this.props.profile.platforms[platform];

		let showUnlink = Object.keys(this.props.profile.platforms).length > 1;

		let platformLink, platformIcon, platformSettings, unlink, logoffPanel;

		if(platformData) {
			if(platform === 'twitch') {
				platformLink = `twitch.tv/${platformData.name}`
				platformIcon = 'https://res.cloudinary.com/phirehero/image/upload/v1564853282/twitch-icon.png';
				platformSettings = `https://twitch.tv/${platformData.name}/settings`;
			} else if(platform === 'mixer') {
				platformLink = `mixer.com/${platformData.name}`
				platformIcon = 'https://res.cloudinary.com/phirehero/image/upload/v1589634307/mixer-icon.png'
				platformSettings = `https://mixer.com/${platformData.name}/settings(hub:me/account/security)`;
			}

			if(showUnlink) {
				unlink = (
					<div className="integration-unlink">
						<a title={`Unlink ${this.props.platform}`} href="javascript:;" onClick={this.showUnlink}>
							<img alt="Unlink" src="https://res.cloudinary.com/phirehero/image/upload/v1572732837/unlink.png" />
						</a>
					</div>
				)
			}

			if(this.state.showLogoff) {
				logoffPanel = (
					<LogoffPanel>
						<p>Feel free to log back in with the platform of your choosing!</p>
					</LogoffPanel>
				)
			}

			content = (
				<div className={`integration integration--${this.props.platform.toLowerCase()}`}>
					<div className="integration-header">
						<img alt="" src={platformIcon} />
						<h3>{this.props.platform}</h3>
						{unlink}
						<div className="integration-settings">
							<a title={`Opens ${this.props.platform} settings in new tab`} href={platformSettings} target="_blank">
								<img alt="Settings" src="https://res.cloudinary.com/phirehero/image/upload/v1561746754/settings.png" />
							</a>
						</div>
						<div className="integration-sync" ref={(el) => {this._sync = el}}>
							<a href="javascript:;" onClick={() => this.handleSync(platform)}><img alt="" src='https://res.cloudinary.com/phirehero/image/upload/v1572808522/sync-white.png' /></a>
						</div>
					</div>
					<div className="integration-content">
						<div className="channelInfo--logo">
							<img alt="" src={platformData.logo} />
						</div>
						<div className="channelInfo--data">
							<div className="channelInfo--name">{platformData.name}</div>
							<div className="channelInfo--link">{platformLink}</div>
						</div>
					</div>
					{confirmPanel}
					{logoffPanel}
				</div>
			);
		}

		return content;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(PlatformIntegrationPanel);