import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import LoadingSpinner from '../components/loading-spinner';
import SetupChannelList from '../components/setup-channel-list';
import TermsContent from '../components/terms-content';
import {updatePreferences} from '../redux/profile-reducer';
import connector from '../redux/connector';

import './modal.css';
import './setup-modal.css';

class SetupModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: 0,
			autojoin: true
		}
	}

	componentDidMount() {

		document.body.classList.add('no-scroll');
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/user/catch', {
			withCredentials: true
		}).then(response => {
			this.setState({
				catch: response.data.catch,
				channels: response.data.channels,
				terms: response.data.termsNeeded
			});
		});
	}

  	nextPage = () => {
  		switch(this.state.currentPage) {
  			case 0:
  				if(this.state.terms) {
	  				this.setState({
	  					currentPage: 1
	  				});
	  			} else if(this.state.catch && this.state.channels.length > 0) {
	  				this.setState({
	  					currentPage: 2
	  				});
	  			} else if(this.props.profile && this.props.profile.isNew) {
	  				this.setState({
	  					currentPage: 3
	  				});
	  			} else {
					this.completeCatch();
	  			}
	  			break;
  			case 1:
  				if(this.state.catch && this.state.channels.length > 0) {
	  				this.setState({
	  					currentPage: 2
	  				});
  				} else if(this.props.profile && this.props.profile.isNew) {
	  				this.setState({
	  					currentPage: 3
	  				});
	  			} else {
					this.completeCatch();
	  			}
  				break;
			case 2:
				if(this.props.profile && this.props.profile.isNew) {
	  				this.setState({
	  					currentPage: 3
	  				});
	  			} else {
					this.completeCatch();
	  			}
				break;
			case 3:
				this.completeCatch();
				break;
  		}
  	}

  	completeCatch = () => {
  		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/user/catch', {
			new: false,
			autojoin: this.state.autojoin,
			terms: false
		}, {
			withCredentials: true
		}).then(() => {
			this.props.dispatch(updatePreferences({
				preferences: {
					...this.props.preferences,
					autojoin: this.state.autojoin
				}
			}));
			document.body.classList.remove('no-scroll');
			this.props.onClose();
		});
  	}

  	handleJoin = (channel) => {
  		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/setup/join', {
  			channel: channel.name
  		}, {
  			withCredentials: true
  		}).then(response => {

  			let channels = [...this.state.channels];
  			let idx = channels.findIndex(sChannel => sChannel.name === channel.name);

  			channels[idx].joined = true;

  			this.setState({
  				channels
  			});

  			if(this.props.onInject) {
  				this.props.onInject(response.data);
  			}
  		});
  	}

  	handleDataChange = (event) => {
  		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			autojoin: !this.state.autojoin
		});
  	}

	render() {

		let modalContent;

		switch(this.state.currentPage) {
			case 0:
				modalContent = (
					<div className="modal">
						<div className="modal-header">
							<h1>Welcome to Stream Achievements!</h1>
						</div>
						<div className="modal-content chooseMember--wrapper">
							<p>We are excited to see you earn all the achievements from your favorite streamers!</p>
							<p>Click the button below to start using the system and keeping up with your achievement progress!</p>
						</div>
						<button className="setupModal--getStarted primary" type="button" onClick={() => this.nextPage()}>Get Started!</button>
					</div>
				)
				break;
			case 1:
				modalContent = (
					<div className="modal">
						<div className="modal-header">
							<h1>Terms and Conditions</h1>
						</div>
						<div className="modal-content terms">
							<p>By clicking 'I Accept the Terms', you agree to the Stream Achievements <a target="blank" href="/legal/terms-of-use">Terms of Service</a> and <a target="blank" href="/legal/privacy-policy">Privacy Policy</a>.</p>
						</div>
						<button className="primary" type="button" onClick={() => this.nextPage()}>I Accept the Terms</button>
					</div>
				);
				break;
			case 2:
				let buttonText = "Finished";

				if(this.props.profile && this.props.profile.isNew) {
					buttonText = "Next";
				}

				modalContent = (
					<div className="modal">
						<div className="modal-header">
							<h1>You've been busy!</h1>
						</div>
						<div className="modal-content chooseMember--wrapper">
							<p>We see you have already been earning achievements before getting here! How awesome is that?!</p>
							<p>Based on the achievements you have earned, we have pulled together the list of channels to make it easier for you to join them straight away!</p>
							<p>Don't worry, if you don't join the channel right now, you won't lose any achievements that you have earned!</p>
							<SetupChannelList channels={this.state.channels} onJoin={this.handleJoin}/>
						</div>
						<button className="setupModal--getStarted primary" type="button" onClick={() => this.nextPage()}>{buttonText}</button>
					</div>
				);
				break;
			case 3:
				modalContent = (
					<div className="modal">
						<div className="modal-header">
							<h1>Almost Done!</h1>
						</div>
						<div className="modal-content">
							<p>By default, you will automatically join a channel when you earn your first achievement for that channel, to make it easier for you to find that streamer!</p>
							<p className="center">Would you like to keep this option enabled?</p>
							<p className="center strong">You can always change this later in your preferences!</p>
							<div className="setup-modal--form">
								<div className="section-label">
							        <label htmlFor="name">Auto-Join Channel</label>
							    </div>
							    <div className="section-value">
									<label className="switch">
									  	<input 
									  		id="preferences-autojoin"
									  		name="autojoin"
											type="checkbox"
											checked={this.state.autojoin}
											onChange={this.handleDataChange}
										/>
									  <span className="slider round"></span>
									</label>
							    </div>
							</div>
						</div>
						<button className="primary" type="button" onClick={() => this.nextPage()}>Finished</button>
					</div>
				);
				break;
			default:
				break;
		}

		return (
				<div className="setup-modal">
					<div className="modal-mask"></div>
					<div className="modal-container">
						{modalContent}
					</div>
				</div>
			);

	}

}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(SetupModal);