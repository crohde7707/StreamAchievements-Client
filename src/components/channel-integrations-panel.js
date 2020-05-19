import React from 'react';
import connector from '../redux/connector';
import axios from 'axios';
import ConfirmPanel from './confirm-panel';
import AdditionalIntegrationsPanel from './additional-integrations-panel';

//integration panels
import StreamLabsPanel from './streamlabs-panel';

import './channel-integrations-panel.css';

class ChannelIntegrationsPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<div>
				<p>Integrate your channel with popular bots and services to add capabilities for your members to earn achievements for!</p>
				<div>
					<StreamLabsPanel />
					<AdditionalIntegrationsPanel channel={this.props.channel}/>
				</div>
			</div>
		)
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(ChannelIntegrationsPanel);