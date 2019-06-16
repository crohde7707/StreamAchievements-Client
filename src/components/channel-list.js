import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
		axios.get('http://api.streamachievements.com/api/channel/user', {
			withCredentials: true
		}).then((res) => {
			this.setState({
				channels: res.data
			});

			if(this.props.onLoad) {
				this.props.onLoad();
			}
		});
	}

	showDirectory = () => {
		this.props.history.push('/directory');
	}

	goToChannel = (channel) => {
		this.props.history.push('/channel/' + channel);
	}

	render() {

		let content, headerJoinButton, joinFirstChannel;

		if(!this.state.channels) {
			content = null;
		} else {
			let channels = this.state.channels;

			if(Array.isArray(channels)) {
				if(channels.length > 0) {
					//we have some channels!
					content = channels.map((channel, index) => (
						<div key={"channel." + index} className="channel-item" onClick={() => { this.goToChannel(channel.owner)}}>
							<div className="channel-item--logo"><img alt="Channel Logo" src={channel.logo} /></div>
							<div className="channel-item--name">{channel.owner}</div>
							<div className="channel-item--percentage">{channel.percentage + '%'}</div>
						</div>
					));

					headerJoinButton = (
						<div onClick={this.showDirectory} className="join-channel-button">
							<img alt="plus icon" src={require('../img/plus.png')} />
							<span>Join a channel</span>
						</div>
					);
				} else {
					joinFirstChannel = (
						<div onClick={this.showDirectory} className="add-channel">
							<div>Join your first channel!</div>
							<div><img alt="plus icon" src={require('../img/plus.png')} /></div>
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
				</div>
			</div>
		)
	}
}

export default withRouter(ChannelList);