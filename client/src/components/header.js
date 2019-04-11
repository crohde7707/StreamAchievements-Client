import React from 'react';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Notifications from './notification-panel';

import './header.css';

class Header extends React.Component {

	constructor() {
		super();

		this.state = {
			menuActive: false
		}
	}

	componentDidMount() {
		if(!this.props.profile) {
			axios.get('/api/user').then((res) => {
				console.log(res.data);
				this.props.dispatch(setProfile(res.data));
			});
		}
	}

	toggleMenu = () => {
		this.positionModal();
		this.setState({
			menuActive: !this.state.menuActive,
			notificationActive: false
		});
	}

	toggleNotifications = () => {
		this.positionNotificationPanel();
		this.setState({
			notificationActive: !this.state.notificationActive,
			menuActive: false
		});
	}

	positionModal = () => {
		let maskHeight = window.innerHeight - 130;

		document.documentElement.scrollTop = 0
		this._mask.style.top = '130px';
		this._mask.style.height = maskHeight + 'px';
	}

	positionNotificationPanel = () => {
		
	}

	render() {
		let username, logo;
		
		if(this.props.profile) {
			username = this.props.profile.username
			logo = <img alt="User Profile Icon" src={this.props.profile.logo} />;
		}

		let manageLink = null;

		if(this.props.profile && this.props.profile.owner) {
			manageLink = (<li><Link to={"/channel/" + this.props.profile.username + "/manage"}>Manage Channel</Link></li>);
		}

		if(this.props.profile && this.props.profile.notifications) {
			let notifications = this.props.profile.notifications;
		}

		let menu = (
			<div className={"menu-dropdown--wrapper" + ((this.state.menuActive) ? " menu-dropdown--active" : "")}>
				<div className="menu-dropdown">
					<ul>
						<li><Link to='/home'>Home</Link></li>
						<li><Link to='/profile'>Profile</Link></li>
						{manageLink}
						<li className="logout"><a href="http://localhost:5000/auth/logout">Log Out</a></li>
					</ul>
				</div>
				<div className="menu-mask" ref={mask => (this._mask = mask)}></div>
			</div>
		)

		return (
			<div id="page-header">
				<div className="logo">
					<Link to="/home"><img src="https://cdn.discordapp.com/attachments/441653223955103764/565227698947883010/SPOILER_unknown.png" alt="" /></Link>
				</div>
				<Notifications onClick={this.toggleNotifications} profile={this.props.profile} active={this.state.notificationActive} />
				<div className={"menu" + ((this.state.menuActive) ? " menu--active" : "")} onClick={this.toggleMenu}>
					<div className="menu--logo">{logo}</div>
					<div className="menu--label">{username}</div>
					<div className="menu--icon"></div>
				</div>
				{menu}
			</div>
		)

	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(Header);