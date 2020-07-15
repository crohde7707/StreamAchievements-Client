import React from 'react';
import connector from '../redux/connector';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Notice from '../components/notice';
import Template from '../components/template';

import './admin-panel.css';

class AdminPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			notice: '',
			users: null
		}
	}

	componentDidMount() {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/users', {
			withCredentials: true
		}).then(res => {
			this.setState({
				users: res.data.users || []
			});
		});
	}

	approveMember = (evt, name) => {
		evt.preventDefault();
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/confirm', {name}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
		});
	}

	linkStreamElements = () => {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'auth/set', {
			withCredentials: true
		}).then(res => {
			console.log(res);
		})
	}

	sendAchievement = (type) => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/admin/test/achievement', {
			type
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res)
		});
	}

	sendCustom = () => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/admin/test/custom', {
			bot: document.getElementById('custom--bot').value,
			message: document.getElementById('custom--message').value
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res)
		});
	}

	sendToken = (uid) => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/admin/sendToken', {
			uid
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
		})
	}

	removeToken = (uid) => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/admin/deleteToken', {
			uid
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
		})
	}

	render() {
		if(this.props.profile && !this.props.profile.type === 'admin') {
			return (<Redirect to='/home' />);
		}

		let newCCContent, pendingCCContent, ircTestContent;

		if(this.state.users) {
			let newUsers = this.state.users.filter(user => user.status === 'new').map((member, index) => (
				<div key={'pendingMember-' + index} className="pendingMember">
					<div className="member-logo">
						<img alt="" src={member.logo} />
					</div>
					<div className="member-mobileWrapper">
						<div className="member-info">
							{member.name}
							<a title={'Go to ' + member.name + '\'s channel on Twitch!'} href={"https://twitch.tv/" + member.name} target="_blank">
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png" />
							</a>
						</div>
						<div className="member-action">
							<a className="approve" href="" onClick={(e) => {this.approveMember(e, member.name)}}>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1567266850/check.png" />
							</a>
							<a className="deny" href="">
								<img src={require('../img/x.png')} />
							</a>
						</div>
					</div>
				</div>
			));

			let pendingUsers = this.state.users.filter(user => user.status === 'pending').map((member, index) => (
				<div key={'pendingMember-' + index} className="pendingMember">
					<div className="member-logo">
						<img alt="" src={member.logo} />
					</div>
					<div className="member-mobileWrapper">
						<div className="member-info">
							{member.name}
							<a title={'Go to ' + member.name + '\'s channel on Twitch!'} href={"https://twitch.tv/" + member.name} target="_blank">
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png" />
							</a>
						</div>
						<div className="member-action">
							<button type="button" onClick={(e) => {this.sendToken(member.uid)}}>Issue</button>
							<button type="button" onClick={(e) => {this.removeToken(member.uid)}}>Remove</button>
						</div>
					</div>
				</div>
			));

			newCCContent = (
				<div>
					<div className="pendingMembers-wrapper">
						{newUsers}
					</div>
				</div>
			);

			pendingCCContent = (
				<div>
					<div className="pendingMembers-wrapper">
						{pendingUsers}
					</div>
				</div>
			);
		}

		ircTestContent = (
			<div className="ircTest--wrapper">
				<button type="button" onClick={() => this.sendAchievement("follow")}>Test Follow</button>
				<button type="button" onClick={() => this.sendAchievement("donation")}>Test Donation</button>
				<button type="button" onClick={() => this.sendAchievement("bits")}>Test Bits</button>
				<button type="button" onClick={() => this.sendAchievement("subprime")}>Test Prime Sub</button>
				<button type="button" onClick={() => this.sendAchievement("subtier1")}>Test Sub</button>
				<button type="button" onClick={() => this.sendAchievement("subtier2")}>Test Sub (Tier 2)</button>
				<button type="button" onClick={() => this.sendAchievement("subtier3")}>Test Sub (Tier 3)</button>
				<button type="button" onClick={() => this.sendAchievement("resub")}>Test Resub (6 months)</button>
				<button type="button" onClick={() => this.sendAchievement("giftsub")}>Test Gift Sub</button>
				<div className="ircTest--custom">
					<h3>Custom</h3>
					<label for="bot">Bot</label>
					<input type="text" name="bot" id="custom--bot" />
					<label for="message">Message</label>
					<input type="text" name="message" id="custom--message" />
					<button type="button" onClick={this.sendCustom}>Send Custom</button>
				</div>
			</div>
		)

		let tabIndex = 0;

		return (
			<Template>
				<div className="manage-container">
					<h2>Admin Panel</h2>
					<button type="button" onClick={this.linkStreamElements}>Link</button>
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs defaultIndex={tabIndex}>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">New Content Creators</Tab>
							<Tab className="manage-tab">Pending Creation</Tab>
							<Tab className="manage-tab">IRC Bot Tests</Tab>
						</TabList>
						<TabPanel>
							{newCCContent}
						</TabPanel>
						<TabPanel>
							{pendingCCContent}
						</TabPanel>
						<TabPanel>
							{ircTestContent}
						</TabPanel>
					</Tabs>
				</div>
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(AdminPanel);