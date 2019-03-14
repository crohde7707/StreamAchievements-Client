import React from 'react';
import axios from 'axios';

import Template from '../components/template';

import './manage-channel.css';

class ManageChannel extends React.Component {

	constructor() {
		super();

		this.state = {
			channel: '',
			achievements: ''
		};
	}

	componentDidMount() {
		axios.get('/api/channel/retrieve').then((res) => {
			console.log(res.data);

			if(res.data.error) {
				//redirect to home
			} else {
				this.setState({
					channel: res.data.channel,
					achievements: res.data.achievements
				});	
			}
		});
	}

	render() {

		let content;

		if(this.state.channel) {

			let {logo, owner} = this.state.channel;

			content = (
				<div>
					<h3>Integration</h3>
					<div className="twitch-integration">
						<div className="twitch-integration--header">
							<img src={require('../img/twitch-glitch.png')} />
							<div className="twitch-integration--sync">
								<a href="javascript:;"><img src={require('../img/sync-white.png')} /></a>
							</div>
						</div>
						<div className="twitch-integration--content">
							<div className="channelInfo--logo">
								<img src={logo} />
							</div>
							<div className="channelInfo--data">
								<div className="channelInfo--name">{owner}</div>
								<div className="channelInfo--link">{'twitch.tv/' + owner}</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			content = (<div>Fetching Channel Info</div>);
		}

		return (
			<Template>
				<div className="manage-container">
					<h2>Manage Channel</h2>
					{content}
				</div>
			</Template>
		);
	}
}

export default ManageChannel;