import React from 'react';
import connector from '../redux/connector';
import {setProfile, updateNotifications} from '../redux/profile-reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import io from "socket.io-client";

import Notifications from './notification-panel';

import './header.css';

class Header extends React.Component {

	constructor() {
		super();

		this.state = {
			menuActive: false,
			count: 0
		}
	}

	componentDidMount() {
		if(!this.props.profile) {
			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/user', {
				withCredentials: true
			}).then((res) => {

				this.connectSocket(res.data.uid)

				let profileData = {
					...res.data,
					socket: this._socket
				}

				this.props.dispatch(setProfile(profileData));
			});
		} else {
			this._socket = this.props.profile.socket;
			console.log(this._socket);
		}
	}

	connectSocket = (nid) => {
		
		this._socket = io.connect(`${process.env.REACT_APP_SOCKET_DOMAIN}?nid=${nid}`, {
			reconnection: true
		});

		this._socket.on('notification-received', (count) => {
			this.props.dispatch(updateNotifications(count));
		});
	}

	toggleMenu = () => {
		this.positionModal();
		this.setState({
			menuActive: !this.state.menuActive,
			notificationActive: false
		});
	}

	positionModal = () => {
		let maskHeight = document.documentElement.scrollHeight - 130;

		document.documentElement.scrollTop = 0
		this._mask.style.top = '130px';
		this._mask.style.height = maskHeight + 'px';
	}

	render() {
		let username, logo, count, channelLink;
		
		if(this.props.profile) {
			username = this.props.profile.username
			logo = <img alt="User Profile Icon" src={this.props.profile.logo} />;
			count = this.props.profile.unreadNotifications;

			let status = this.props.profile.status;

			switch(status) {
				case 'verified':
					channelLink = (<li><Link to={"/dashboard/" + this.props.profile.username}>Dashboard</Link></li>);	
					break;
				case 'pending':
					channelLink = (<li className="reviewing">Go check your email!!</li>);
					break;
				case 'review':
					channelLink = (<li className="reviewing">We are currently reviewing your channel! We will let you know when you can start!</li>);
					break;
				case 'viewer':
					channelLink = (<li><Link to={"/channel/create"}>Start Channel</Link></li>);
					break;
				default:
					break;			
			}
		}

		let adminLink;

		if(this.props.profile && this.props.profile.type === 'admin') {
			adminLink = (<li className="admin"><Link to={"/admin"}>Admin Panel</Link></li>);
		}

		let menu = (
			<div className={"menu-dropdown--wrapper" + ((this.state.menuActive) ? " menu-dropdown--active" : "")}>
				<div className="menu-dropdown">
					<ul>
						<li><Link to='/home'>Home</Link></li>
						<li><Link to='/profile'>Profile</Link></li>
						{channelLink}
						{adminLink}
						<li><Link to='/gold'>Stream Achievements Gold</Link></li>
						<li className="logout"><a href={process.env.REACT_APP_API_DOMAIN + "auth/logout"}>Log Out</a></li>
					</ul>
				</div>
				<div className="menu-mask" ref={mask => (this._mask = mask)} onClick={this.toggleMenu}></div>
			</div>
		)

		return (
			<div id="page-header">
				<div className="logo">
					<Link to="/home"><img src={require('../img/logo.png')} alt="" /></Link>
				</div>
				<Notifications profile={this.props.profile} active={this.state.notificationActive} count={count}/>
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