import React from 'react';
import connector from '../redux/connector';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';

import './additional-integrations-panel.css';

class AdditionalIntegrationsPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: (this.props.profile === undefined) ? true : false
		}
	}

	shouldDidUpdate(prevProps, prevState) {
		if(prevProps.profile === undefined && this.props.profile !== undefined) {
			this.setState({
				loading: false
			});
		}
		
		return true;
	}

	render() {
		let content = null;
		let additionalPlatforms = [];

		if(this.state.loading && this.props.profile === undefined) {
			return null;
		}

		let integrations = this.props.channel.integrations;

		if(integrations.streamlabs) {
			additionalPlatforms.push(
				<a key={`additional-platform--${additionalPlatforms.length + 1}`} className="platformLink streamlabs" href={process.env.REACT_APP_API_DOMAIN + "auth/streamlabs"}>
					<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589835373/streamlabs-icon.png" />
			    </a>
			)
		}

		if(!integrations.streamelements) {
			additionalPlatforms.push(
				<a key={`additional-platform--${additionalPlatforms.length + 1}`} className="platformLink streamelements platform--disabled" href={process.env.REACT_APP_API_DOMAIN + "auth/streamelements"}>
					<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589839030/streamelements-logo.png" />
			    </a>
			)
		}

		if(!integrations.firebot && this.props.channel.platforms.mixer) {
			additionalPlatforms.push(
				<a key={`additional-integrations--${additionalPlatforms.length + 1}`} className="platformLink firebot" href={process.env.REACT_APP_API_DOMAIN + "auth/firebot"}>
					<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589905439/firebot-logo.png" />
				</a>
			)
		}

		if(additionalPlatforms.length > 0) {
			content = (
				<div className="integration--available-integrations">
					<h4>Available Integrations:</h4>
					<div className="platform-list--wrapper">
						{additionalPlatforms}
					</div>
				</div>
			);
		}

		return content;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(AdditionalIntegrationsPanel);