import React from 'react';
import axios from 'axios';

import Template from '../components/template';
import ConfirmPanel from '../components/confirm-panel';

import './link-page.css';

export default class HomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/user/link', {
			withCredentials: true
		}).then((res) => {
			let {un, logo, platform} = res.data;

			this.setState({
				un,
				logo,
				platform
			});
		});
	}

	handleConfirm = () => {
		window.location.href = `${process.env.REACT_APP_API_DOMAIN}auth/${this.state.platform}/link`;
	}

	handleCancel = () => {
		axios.post(`${process.env.REACT_APP_API_DOMAIN}auth/${this.state.platform.toLowerCase()}/redirect`, {}, {
			withCredentials: true
		}).then(res => {
			this.props.history.replace('/home');
		});
	}

	render() {

		let logo;

		if(this.state.logo) {
			logo = (<img src={this.state.logo} />);
		}

		return (
			<Template link={true}>
				<div className="main-content link-content">
					<ConfirmPanel onConfirm={this.handleConfirm} onCancel={this.handleCancel} header={"Is this You?"}>
						<p class="center">We have found an existing {this.state.platform} profile that might be you!</p>
						<div className="link-profile-wrapper">
							{logo}
							<span>{this.state.un}</span>
						</div>
						<p className="strong">By confirming below, you will be prompted to authenticate with {this.state.platform} before we link your accounts. Be sure you are authenticating with the above account!</p>
					</ConfirmPanel>
				</div>
			</Template>
		);
	}
}