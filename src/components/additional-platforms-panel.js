import React from 'react';
import connector from '../redux/connector';
import axios from 'axios';
import ConfirmPanel from '../components/confirm-panel';

class AdditionalPlatformPanel extends React.Component {

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

		console.log(this.props.profile.platforms);
		
		return true;
	}

	render() {
		let content = null;
		let additionalPlatforms = [];

		if(this.state.loading && this.props.profile === undefined) {
			return null;
		}

		let platformData = this.props.profile.platforms;

		let platformLink, platformIcon, platformSettings;

		if(!platformData.twitch) {
			additionalPlatforms.push(
				<a key={`additional-platform--${additionalPlatforms.length + 1}`} className="platformLink twitch" href={process.env.REACT_APP_API_DOMAIN + "auth/twitch/link"}>
					<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589664671/twitch-glitch-white.png" />
			    </a>
			)
		}

		if(!platformData.mixer) {
			additionalPlatforms.push(
				<a key={`additional-platform--${additionalPlatforms.length + 1}`} className="platformLink mixer" href={process.env.REACT_APP_API_DOMAIN + "auth/mixer/link"}>
					<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589665074/mixer-icon-dark.png" />
				</a>
			)
		}

		if(additionalPlatforms.length > 0) {
			content = (
				<div className="integration--additional-platforms">
					<h4>Additional Platforms:</h4>
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

export default connector(headerMapStateToProps)(AdditionalPlatformPanel);