import React from 'react';
import {syncStreamlabs, unlinkService} from '../redux/profile-reducer';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';
import TooltipWrapper from './tooltip-wrapper';

import './streamlabs-panel.css';

export default class StreamlabsPanel extends React.Component {

	constructor() {
		super();

		this.state = {
			showConfirm: false
		}
	}

	handleSync = () => {
		this._sync.classList.add('active');
		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/streamlabs/sync', {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			
			let newChannel = {...this.props.channel};

			newChannel.integrations.streamlabs = res.data;

			this.props.update(newChannel);
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
			let newChannel = {...this.props.channel};
			
			if(newChannel.integrations.streamlabs) {
				delete newChannel.integrations.streamlabs;
			}

			this.props.update(newChannel);
		});
	}

	render() {
		let streamlabsContent = null;
		let confirmPanel;
		let streamlabs = this.props.channel.integrations.streamlabs;

		if(streamlabs) {
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
									<TooltipWrapper
										hoverText="Opens Streamlabs settings in new tab"
									>
										<a href='https://streamlabs.com/dashboard#/settings/api-settings' target="blank">
											<img alt="Settings" src="https://res.cloudinary.com/phirehero/image/upload/v1561746754/settings.png" />
										</a>
									</TooltipWrapper>
								</div>
								{/*<div className="integration-sync" ref={(el) => {this._sync = el}}>
									<a href="javascript:;" onClick={this.handleSync}><img alt="" src='https://res.cloudinary.com/phirehero/image/upload/v1572808522/sync-white.png' /></a>
								</div>*/}
						</div>
						{confirmPanel}
					</div>
			);
		}

		return streamlabsContent;
	}
}