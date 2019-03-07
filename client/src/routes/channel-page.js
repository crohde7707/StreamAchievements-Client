import React from 'react';
import axios from 'axios';

import Template from '../components/template';

import './channel-page.css';

class ChannelPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<Template>
				<div className="channel-info">
					<div className="channel-fav"><img src={require('../img/star-not-favorited.png')} /></div>
					<div className="channel-logo"></div>
					<div className="channel-info">
						<div className="channel-name"></div>
						<div className="channel-description"></div>
					</div>
					<div className="channel-achievement-progress"></div>
					<div className="channel-buttons"></div>
				</div>
				<div className="channel-achievements">
					<div className="achievement">
						<div className="achievement-logo"></div>
						<div className="achievement-info">
							<div className="achievement-title"></div>
							<div className="achievement-description"></div>
						</div>
					</div>
				</div>
			</Template>
		)
	}
}

export default ChannelPage;