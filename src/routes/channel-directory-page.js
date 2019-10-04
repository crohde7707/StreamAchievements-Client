import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { TwitterShareButton } from 'react-twitter-embed';
import io from "socket.io-client";

import './channel-directory-page.css';

import Template from '../components/template';
import {isAuthenticated} from '../utils/auth-utils';
import LoadingSpinner from '../components/loading-spinner';

class ChannelDirectoryPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			channels: "",
			searching: false
		}

		this._search = {};
	}

	componentDidMount() {
		this._socket = io.connect(process.env.REACT_APP_SOCKET_DOMAIN, {
    		reconnection: true
    	});

    	this._socket.on('channel-results', (channels) => {
    		this.setState({
    			channels
    		});
    	});
	}

	filterList = (event) => {
		this.setState({
			searching: true
		});

		if(this._searchTimeout !== null) {
			clearTimeout(this._searchTimeout);
		}

		this._searchTimeout = setTimeout(() => {
			if(this._search.value.length > 0) {
				this._socket.emit('search-directory', this._search.value);
				this._searchTimeout = null;
				this.setState({
					searching: false
				});
			} else {
				this.setState({
					channels: "",
					searching: false
				});
			}
		}, 400);
		
	}

	componentWillUnmount() {
		this._socket.close();
	}


  	loadChannel = (channel) => {
  		this._socket.close();
  		this.props.history.push('/channel/' + channel.owner);
  	}

	render() {

		let content;
		let channels = this.state.channels;


		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			return (<Redirect to='/' />);
		}

		let notFound = (
			<div className="directory--no-results">
				<h3>Don't see who you are looking for? Looks like they haven't found their way here yet!</h3>
				<div>Want to get your favorite streamer to make some achievements for their stream? Spread the word!</div>
				<div className="share">
					<TwitterShareButton
					    url={'https://streamachievements.com/'}
					    options={{
					    	text: 'Come and check out Stream Achievements, a service that adds customizable achievements to your stream! Through achievements, you can reward your community for the support they show!',
					    	size: 'large'
					    }}
					  />
				</div>
			</div>
		);

		if(Array.isArray(channels)) {
			if(channels.length > 0) {
				content = (
					<div>
						{channels.map((channel, index) => (
							<div key={"channel." + index} className="channel-item" onClick={() => {this.loadChannel(channel)}}>
								<div className="channel-item--logo"><img src={channel.logo} /></div>
								<div className="channel-item--name">{channel.owner}</div>
							</div>
						))}
						{notFound}
					</div>
				);
			} else {
				content = notFound
			}	
		} else {
			content = (
				<div className="directory--no-results">
					<h3>Start typing above to search for a streamer!</h3>
				</div>
			)
		}

		return (
			<div>
				<Template>
					<div className="channel-directory main-content">
						<div className="directory-search">
							<input type="text" onChange={this.filterList} placeholder="Search channels..." ref={(el) => {this._search = el}} />
							<LoadingSpinner isLoading={this.state.searching} />
						</div>
						<div className="directory-results">
							<div className="channels">
								{content}
							</div>
						</div>
					</div>
				</Template>
			</div>
		);
	}
}

export default withRouter(ChannelDirectoryPage);