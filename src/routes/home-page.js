import React from 'react';

import './home-page.css';

import Template from '../components/template';
import ChannelList from '../components/channel-list';

export default class HomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: true
		}
	}

	listLoaded = () => {
		this.setState({
			loading: false
		});
	}

	render() {

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="main-content">
					<ChannelList onLoad={this.listLoaded} />
				</div>
			</Template>
		);
	}
}