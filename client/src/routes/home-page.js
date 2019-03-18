import React from 'react';

import './home-page.css';

import Template from '../components/template';
import ChannelList from '../components/channel-list';

export default class HomePage extends React.Component {

	render() {

		return (
			<Template>
				<div className="main-content">
					<ChannelList />
				</div>
			</Template>
		);
	}
}