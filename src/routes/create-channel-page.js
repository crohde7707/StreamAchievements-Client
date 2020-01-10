import React from 'react';
import connector from '../redux/connector';
import Template from '../components/template';
import {updateStatus} from '../redux/profile-reducer';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import axios from 'axios';

import './create-channel-page.css';

class CreateChannelPage extends React.Component {

	constructor(props) {
		super(props);

		let defaultState = {
			validated: false,
			received: false,
			referralCode: ""
		};

		const params = new URLSearchParams(this.props.location.search);
		const referral = params.get('referral');

		if(referral) {
			let referralCode = referral.replace(/[^\w\s]/gi, '').toUpperCase();

			defaultState.referral = true;
			defaultState.referralCode = referralCode;
		}

		this.state = defaultState;
	}

	handleUpdate = (evt) => {
		let field = evt.target;

		if(field.name === "referral") {
			this.setState({
				referralCode: field.value
			});
		} else if(field.name="confirm") {
			this.setState({
				validated: (field.value === 'ACHIEVEMENT')
			});
		}
	}

	onSubmit = (event) => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/signup', {
			referral: this.state.referralCode
		}, {
			withCredentials: true
		}).then(res => {
			if(res.data.error) {

			} else {
				this.props.dispatch(updateStatus({status: 'review'}));
				this.setState({
					received: true
				});	
			}
		});
	}

	render() {

		let content, referral;

		if(this.props.profile) {

			// if(this.props.profile.status === 'verified') {
			// 	return (<Redirect to='/dashboard/' />);
			// }

			let user = this.props.profile.username;

			let form;

			if(this.state.referral) {
				referral = (
					<div className="referralContent">
						<label htmlFor="referral">Referral Code</label>
						<input name="referral" type="text" onChange={this.handleUpdate} value={this.state.referralCode} />
					</div>
				)
			} else {
				referral = (
					<div className="referralContent">
						<button type="button" onClick={() => {this.setState({referral: true})}}>Have a referral code?</button>
					</div>
				);
			}

			if(this.state.received) {
				form = (
					<div>
						<h4>We got you jotted down! Keep an eye out for your confirmation email!!</h4>
						<Link className="home" to={"/home"}>Back to Home</Link>
					</div>
				);
			} else {
				form = (
					<form className="confirmForm" onSubmit={this.onSubmit}>
						<input type="text" name="confirm" onChange={this.handleUpdate} />
						{referral}
						<button type="button" onClick={this.onSubmit} disabled={(!this.state.validated) ? 'disabled' : ''}>Send</button>
					</form>
				);
			}

			content = (
				<div className="main-content createChannel--wrapper">
					<h3>{`Thank you for your interest in joining Stream Achievements, ${user}!`}</h3>
					<p>We are certain that your community is going to love having achievements they can earn while supporting you!</p>
					<p>To send your confirmation, just type the word '<span className="gold">ACHIEVEMENT</span>' in the box below!</p>
					<p>You will receive an email with a validation code to start creating achievements! <strong>Don't forget to check your spam folder!</strong></p>
					{form}
				</div>
			);
		}
		
		return (
			<Template>
				{content}
			</Template>
		);
		
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(CreateChannelPage);