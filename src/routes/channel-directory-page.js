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

		this._search = {};
	}

	componentDidMount() {
		this.getChannels();
	}

	getChannels = () => {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/list', {
				withCredentials: true
			}).then((res) => {
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
		    this.setState({filteredChannels: updatedList});
	    }	    
  	}

  	loadChannel = (channel) => {
  		this.props.history.push('/channel/' + channel.owner);
  	}

	render() {

		let content;
		let channels = this.state.channels;


		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			return (<Redirect to='/' />);
		}

		if(Array.isArray(this.state.filteredChannels)) {

			//resultsTip = this.state.filteredChannels.length;
			channels = this.state.filteredChannels;
		}

		if(Array.isArray(channels)) {
			if(channels.length > 0) {
				content = channels.map((channel, index) => (
					<div key={"channel." + index} className="channel-item" onClick={() => {this.loadChannel(channel)}}>
						<div className="channel-item--logo"><img src={channel.logo} /></div>
						<div className="channel-item--name">{channel.owner}</div>
					</div>
				));	
			} else {
				content = (
					<div className="directory--no-results">
						<h3>Looks like they haven't made it here yet!</h3>
						<div>If you want someone to offer achievements, make sure to let them know and show that interest!!</div>
					</div>
				);
			}
			
		}

		return (
			<div>
				<Template>
					<div className="main-content">
						<div className="directory-search">
							<input type="text" onChange={this.filterList} placeholder="Search channels..." ref={(el) => {this._search = el}} />
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