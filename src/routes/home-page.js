import React from 'react';

import Template from '../components/template';
import ChannelList from '../components/channel-list';

import './home-page.css';

export default class HomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: true,
			inject: []
		}
	}

	handleInject = (channel) => {
		let inject = [...this.state.inject];

		inject.push(channel);
		
		this.setState({
			inject
		});
	}

	listLoaded = () => {
		this.setState({
			loading: false
		});
	}

	render() {

		return (
			<Template onInject={this.handleInject} spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="main-content">
					<ChannelList onLoad={this.listLoaded} inject={this.state.inject} />
				</div>
			</Template>
		);
	}
}