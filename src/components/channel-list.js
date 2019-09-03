import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { withRouter } from 'react-router-dom';

import './channel-list.css';

class ChannelList extends React.Component {

	constructor() {
		super();

		this.state = {
			channels: false,
			fetching: false
		};
	}

	componentDidMount() {
		this.getChannels();
	}

	getChannels = () => {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/user', {
			withCredentials: true
		}).then((res) => {
			let favChannels = [];
			let otherChannels = [];

			res.data.channels.forEach(channel => {
				if(channel.favorite) {
					favChannels.push(channel);
				} else {
					otherChannels.push(channel);
				}
			});

			this.setState({
				channels: otherChannels,
				favorites: favChannels,
				offset: res.data.offset
			});

			if(this.props.onLoad) {
				this.props.onLoad();
			}

			if(res.data.offset !== -1) {
				this._checkToLoad = throttle(this.checkToLoad, 200);
				window.addEventListener('scroll', this._checkToLoad);
			}
		});
	}

	checkToLoad = () => {
		let height = document.documentElement.scrollHeight;
		let top = document.documentElement.scrollTop;
		let bodyTop = document.body.scrollTop;

		this._loadMore = this._loadMore || document.getElementById('load-more-channels');

		let loadTop = this._loadMore.getBoundingClientRect().top;

		if(loadTop - top <= 150 || loadTop - bodyTop <= 150) {
			
			if(!this.state.fetching) {
				this.retrieveMoreChannels(this.state.offset);
			}
		}
	}

	retrieveMoreChannels = (offset) => {
		
		if(offset !== -1) {
			this.setState({
				fetching: true
			});
			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/user/retrieve', {
				params: {
					offset: this.state.offset
				},
				withCredentials: true
			}).then(res => {

				let updateChannelArray = this.state.channels.concat(res.data.channels);

				if(res.data.offset === -1) {
					//no more to retrieve, remove functionality
					window.removeEventListener('scroll', this._checkToLoad);
				}

				this.setState({
					channels: updateChannelArray,
					offset: res.data.offset,
					fetching: false
				});
			})
		}
	}

	showDirectory = () => {
		this.props.history.push('/directory');
	}

	goToChannel = (channel) => {
		this.props.history.push('/channel/' + channel);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._checkToLoad);
	}

	render() {

		let content, favContent, headerJoinButton, joinFirstChannel, loadMore;

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

					if(this.state.favorites.length > 0) {
						favContent = this.state.favorites.map((channel, index) => (
							<div key={"channel." + index} className="channel-item" onClick={() => { this.goToChannel(channel.owner)}}>
								<div className="channel-item--logo"><img alt="Channel Logo" src={channel.logo} /></div>
								<div className="channel-item--name">{channel.owner}</div>
								<div className="channel-item--percentage">{channel.percentage + '%'}</div>
							</div>
						));
					} else {
						favContent = (
							<h4>No channels have been favorited</h4>
						)
					}

					headerJoinButton = (
						<div onClick={this.showDirectory} className="join-channel-button">
							<img alt="plus icon" src={require('../img/plus.png')} />
							<span>Join a channel</span>
						</div>
					);

					if(this.state.offset !== -1) {
						loadMore = (<div id="load-more-channels"></div>);
					}
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
					<h3>Favorites</h3>
					{headerJoinButton}
				</div>
				<div className="channel-list">
					{favContent}
				</div>
				<div className="channel-header">
					<h3>Joined Channels</h3>
				</div>
				<div className="channel-list">
					{content}
					{joinFirstChannel}
				</div>
				{loadMore}
			</div>
		)
	}
}

export default withRouter(ChannelList);