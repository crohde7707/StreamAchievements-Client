import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Modal from './modal';

import './channel-list.css';

class ChannelList extends React.Component {

	constructor() {
		super();

		this.state = {
			channels: false,
			isAddChannelActive: false
		};
	}

	componentDidMount() {
		this.getChannels();
	}

	getChannels = () => {
		axios.get('/api/channels/user').then((res) => {
			console.log('got data');
			console.log(res.data);
			this.setState({
				channels: res.data
			});
		});
	}

	showAddChannelModal = () => {
		this.props.history.push('/directory');
		// axios.get('/api/channel/create').then((res) => {
		// 	console.log(res.data);
		// });
	}

	hideAddChannelModal = () => {
		this.setState({
			isAddChannelActive: false
		});
	}

	goToChannel = (channel) => {
		this.props.history.push('/channel/' + channel);
	}

	render() {

		let content, headerJoinButton, joinFirstChannel;

		if(!this.state.channels) {
			content = (
				<div>Fetching channels</div>
			);
		} else {
			let channels = this.state.channels;

			if(Array.isArray(channels)) {
				if(channels.length > 0) {
					//we have some channels!
					content = channels.map((channel, index) => (
						<div key={"channel." + index} className="channel-item" onClick={() => { this.goToChannel(channel.name)}}>
							<div className="channel-item--logo"><img src={channel.logo} /></div>
							<div className="channel-item--name">{channel.name}</div>
							<div className="channel-item--percentage">{channel.percentage}</div>
						</div>
					));

					headerJoinButton = (
						<div onClick={this.showAddChannelModal} className="join-channel-button">
							<img src={require('../img/plus.png')} />
							<span>Join a channel</span>
						</div>
					);
				} else {
					joinFirstChannel = (
						<div onClick={this.showAddChannelModal} className="add-channel">
							<div>Join your first channel!</div>
							<div><img src={require('../img/plus.png')} /></div>
						</div>
					);
				}
			}
		}

		return (
			<div>
				<div className="channel-header">
					<h3>My Channels</h3>
					{headerJoinButton}
				</div>
				<div className="channel-list">
					{content}
					{joinFirstChannel}
					<Modal active={this.state.isAddChannelActive} onClose={this.hideAddChannelModal} />
				</div>
			</div>
		)
	}
}

export default withRouter(ChannelList);