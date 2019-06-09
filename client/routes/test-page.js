import React from 'react';
import axios from 'axios';

import Template from '../components/template';

import './channel-page.css';

class TestPage extends React.Component {

	componentDidMount() {
		//Fetch channel data 

		// let url = '/api/channel/retrieve?id=' + this.props.match.params.channelid;

		// axios.get(url).then((res) => {
		// 	console.log(res.data);
		// 	this.setState({
		// 		channel: res.data.channel,
		// 		achievements: res.data.achievements
		// 	});
		// });

		// window.addEventListener('scroll', this.updateChannelHeader);
	}

	createChannel = () => {
		axios.get('/api/channel/create').then((res) => {
			console.log(res.data);
		});
	}

	destroyAndCreateChannel = () => {
		console.log('foo');
	}

	
	render() {

		return (
			<Template>
				<button onClick={this.createChannel}>Create Channel</button>
				<button onClick={this.destroyAndCreateChannel}>Destroy and Create Channel</button>
			</Template>
			);
	}
}

export default TestPage;