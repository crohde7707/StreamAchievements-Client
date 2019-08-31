import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

import connector from '../redux/connector';
import {withRouter} from 'react-router-dom';

import Template from '../components/template';
import LoadingSpinner from '../components/loading-spinner';

class ModPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/mod', {
			withCredentials: true
		}).then(res => {
			this.setState({
				loading:false,
				channels: res.data.channels
			})
		});
	}

	goToChannel = (channel) => {
		this.props.history.push('/mod/' + channel);
	}

	render() {
		let channelContent;

		if(this.state.channels) {
			channelContent = this.state.channels.map((channel, idx) => {
				let classes = "channel-item";

				if(idx % 2 === 0) {
					classes += " stripe";
				}

				return (
					<div key={'channel.' + idx} className={classes} onClick={() => {this.goToChannel(channel.owner)}}>
						<div className="channel-item--logo">
							<img src={channel.logo} />
						</div>
						<div className="channel-item--name">
							{channel.owner}
						</div>
					</div>
				);
			})
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="main-content">
					<h3>Channels I Moderate</h3>
					{channelContent}
				</div>
			</Template>
		);
	}
}

export default withRouter(ModPage);