import React from 'react';
import connector from '../redux/connector';
import {syncStreamlabs, unlinkService} from '../redux/profile-reducer';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';

import './streamlabs-panel.css';

const STREAMLABS_URL = 'https://www.streamlabs.com/join/streamachievements';

class StreamlabsPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.streamlabs === undefined) ? true : false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		if(prevProps.streamlabs === undefined && this.props.streamlabs !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	goTostreamlabs = () => {
		var win = window.open(STREAMLABS_URL, '_blank');
		win.focus();
	}

	handleFollow = () => {
		//API call to follow on streamlabs
	}

	handleSync = () => {
		this._sync.classList.add('active');
		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/streamlabs/sync', {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			this.props.dispatch(syncStreamlabs(res.data));
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

		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/streamlabs/unlink', {}, {
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
		if(this.state.loading && this.props.streamlabs === undefined) {
			return null;
		}

		let streamlabsContent = null;
		let confirmPanel;

		if(this.state.showConfirm) {

			confirmPanel = (
				<ConfirmPanel
					onConfirm={this.handleUnlink}
					onCancel={() => {this.setState({showConfirm: false})}}
				>
					<div>Are you sure you want to unlink your Streamlabs account?</div>
					<div className="strong">Note: All achievements reliant on Streamlabs will no longer be able to be rewarded!</div>
				</ConfirmPanel>
			);
		}

		if(this.props.profile && this.props.profile.status === 'verified') {
			if(this.props.streamlabs === false) {
				//Data retrieved, not connected
				streamlabsContent = (
					<div className="integration integration--streamlabs not-linked">
						<a className="streamlabsLink" href={process.env.REACT_APP_API_DOMAIN + "auth/streamlabs"}>
							<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1572725216/streamlabs-badge.png" />
						    <span>Link Your Streamlabs Account</span>
					    </a>
				    </div>
				);
			} else {

				let logo = (this.props.profile && this.props.profile.logo) || '';

				streamlabsContent = (
					<div className="integration integration--streamlabs">
							<div className="integration-header">
								<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1572725216/streamlabs-badge.png" />
								<h3>Streamlabs</h3>
									<div className="integration-unlink">
										<a title="Unlink Streamlabs" href="javascript:;" onClick={this.showUnlink}>
											<img alt="Unlink" src="https://res.cloudinary.com/phirehero/image/upload/v1572732837/unlink.png" />
										</a>
									</div>
									<div className="integration-settings">
										<a title="Opens Twitch settings in new tab" href='https://streamlabs.com/dashboard#/settings/api-settings' target="_blank"><img alt="Settings" src="https://res.cloudinary.com/phirehero/image/upload/v1561746754/settings.png" /></a>
									</div>
									{/*<div className="integration-sync" ref={(el) => {this._sync = el}}>
										<a href="javascript:;" onClick={this.handleSync}><img alt="" src='https://res.cloudinary.com/phirehero/image/upload/v1572808522/sync-white.png' /></a>
									</div>*/}
							</div>
							<div className="integration-content">
								<div className="channelInfo--logo">
									<img alt="" src={logo} />
								</div>
								<div className="channelInfo--data">
									<div className="channelInfo--name">phirehero</div>
								</div>
							</div>
							{confirmPanel}
						</div>
				);
			}
		}

		return streamlabsContent;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		streamlabs: state.streamlabs
	};
}

export default connector(headerMapStateToProps)(StreamlabsPanel);