import React from 'react';
import connector from '../redux/connector';
import {syncStreamElements, unlinkService} from '../redux/profile-reducer';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';
import TooltipWrapper from './tooltip-wrapper';

import './streamelements-panel.css';

const STREAMELEMENTS_URL = 'https://www.streamlabs.com/join/streamachievements';

class StreamElementsPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.streamelements === undefined) ? true : false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		if(prevProps.streamelements === undefined && this.props.streamelements !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	goToStreamElements = () => {
		var win = window.open(STREAMELEMENTS_URL, '_blank');
		win.focus();
	}

	handleFollow = () => {
		//API call to follow on streamlabs
	}

	handleSync = () => {
		this._sync.classList.add('active');
		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/streamelements/sync', {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			this.props.dispatch(syncStreamElements(res.data));
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

		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/streamelements/unlink', {}, {
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
		if(this.state.loading && this.props.streamelements === undefined) {
			return null;
		}

		let streamElementsContent = null;
		let confirmPanel;

		if(this.state.showConfirm) {

			confirmPanel = (
				<ConfirmPanel
					onConfirm={this.handleUnlink}
					onCancel={() => {this.setState({showConfirm: false})}}
				>
					<div>Are you sure you want to unlink your StreamElements account?</div>
					<div className="strong">Note: All achievements reliant on StreamElements will no longer be able to be rewarded!</div>
				</ConfirmPanel>
			);
		}

		if(this.props.profile && this.props.profile.status === 'verified') {
			if(this.props.streamelements === false) {
				//Data retrieved, not connected
				streamElementsContent = (
					<div className="integration integration--streamelements not-linked">
						<a className="streamElementsLink" href={process.env.REACT_APP_API_DOMAIN + "auth/streamelements"}>
							<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589839030/streamelements-logo.png" />
						    <span>Link Your StreamElements Account</span>
					    </a>
				    </div>
				);
			} else {

				let logo = (this.props.profile && this.props.profile.logo) || '';
				let name = (this.props.profile && this.props.profile.username) || '';

				streamElementsContent = (
					<div className="integration integration--streamelements">
							<div className="integration-header">
								<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589839030/streamelements-logo.png" />
								<h3>StreamElements</h3>
									<div className="integration-unlink">
										<TooltipWrapper
											hoverText="Unlink StreamElements"
										>
											<a href="javascript:;" onClick={this.showUnlink}>
												<img alt="Unlink" src="https://res.cloudinary.com/phirehero/image/upload/v1572732837/unlink.png" />
											</a>
										</TooltipWrapper>
									</div>
									<div className="integration-settings">
										<TooltipWrapper
											hoverText="Opens StreamElements settings in new tab"
										>
											<a href='https://streamelements.com/dashboard/account/integrations' target="blank">
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
		}

		return streamElementsContent;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		streamelements: state.integration.streamelements
	};
}

export default connector(headerMapStateToProps)(StreamElementsPanel);