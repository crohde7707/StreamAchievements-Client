import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './channel-directory-page.css';

import Template from '../components/template';
import {isAuthenticated} from '../utils/auth-utils';

class ChannelDirectoryPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			channels: []
		}
	}

	componentDidMount() {
		this.getChannels();
	}

	getChannels = () => {
		axios.get('/api/channels/get').then((res) => {
			console.log(res.data);
			this.setState({
				channels: res.data
			});
		});
	}

	filterList = (event) => {
	    var updatedList = this.state.channels;

	    if(event.target.value === '') {
	    	//nothing in text box
	    	this.setState({filteredChannels: false});
	    } else {
	    	updatedList = updatedList.filter(function(channel){
		      return (channel.owner).toLowerCase().search(
		        event.target.value.toLowerCase()) !== -1;
		    });
		    console.log(updatedList);
		    this.setState({filteredChannels: updatedList});
	    }	    
  	}

  	loadChannel = (channel) => {
  		console.log(channel.owner);
  		this.props.history.push('/channel/' + channel.owner);
  	}

	render() {

		let redirect, resultsTip, content;
		let channels = this.state.channels;


		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			redirect = <Redirect to='/' />;
		}

		if(Array.isArray(this.state.filteredChannels)) {

			resultsTip = this.state.filteredChannels.length;
			channels = this.state.filteredChannels;
		}

		if(Array.isArray(channels)) {
			content = channels.map((channel, index) => (
				<div key={"channel." + index} className="channel-item" onClick={() => {this.loadChannel(channel)}}>
					<div className="channel-item--logo"><img src={channel.logo} /></div>
					<div className="channel-item--name">{channel.owner}</div>
				</div>
			));
		}

		return (
			<div>
				<Template>
					<div className="main-content">
						<div className="directory-search">
							<input type="text" onChange={this.filterList} />
						</div>
						<div className="directory-results">
							<div className="results-tip">Found {resultsTip} channels</div>
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