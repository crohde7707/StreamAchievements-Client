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

	render() {
		if(this.props.profile && !this.props.profile.type === 'admin') {
			return (<Redirect to='/home' />);
		}

		let newCCContent, pendingCCContent;

		if(this.state.users) {
			let users = this.state.users.map((member, index) => (
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
								<img src={require('../img/check.png')} />
							</a>
							<a className="deny" href="">
								<img src={require('../img/x.png')} />
							</a>
						</div>
					</div>
				</div>
			));

			newCCContent = (
				<div>
					<h3>Pending Users</h3>
					<div className="pendingMembers-wrapper">
						{users}
					</div>
				</div>
			);

			pendingCCContent = (
				<div>
					<h3>Waiting For Verification</h3>
					<div className="pendingMembers-wrapper">

					</div>
				</div>
			);
		}

		let tabIndex = 0;

		return (
			<Template>
				<div className="manage-container">
					<h2>Admin Panel</h2>
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs defaultIndex={tabIndex}>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">New Content Creators</Tab>
							<Tab className="manage-tab">Pending Creation</Tab>
						</TabList>
						<TabPanel>
							{newCCContent}
						</TabPanel>
						<TabPanel>
							{pendingCCContent}
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