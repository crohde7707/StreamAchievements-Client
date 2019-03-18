import React from 'react';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './header.css';

class Header extends React.Component {

	constructor() {
		super();

		this.state = {
			menuActive: false
		}
	}

	componentDidMount() {
		console.log(this.props.profile);
		if(!this.props.profile) {
			axios.get('/api/user').then((res) => {
				console.log(res.data);
				this.props.dispatch(setProfile(res.data));
			});
		}
	}

	toggleMenu = () => {
		this.setState({
			menuActive: !this.state.menuActive
		});
	}

	render() {
		let username, logo;
		
		if(this.props.profile) {
			username = this.props.profile.username
			logo = <img alt="User Profile Icon" src={this.props.profile.logo} />;
		}

		let manageLink = (this.props.owner) ? <a href={"/channel/" + this.props.user.name + "/manage"}>Manage Channel</a> : null;

		let menu = (
			<div className={"menu-dropdown--wrapper" + ((this.state.menuActive) ? " menu-dropdown--active" : "")}>
				<div className="menu-dropdown">
					<ul>
						<li>Link 1</li>
						<li>Link 2</li>
					</ul>
				</div>
				<div className="menu-mask"></div>
			</div>
		)

		return (
			<div id="page-header">
				<div className="logo">
					<img src={require('../img/raid.png')} alt="" />
				</div>
				<div className="header-nav">
					<Link to="/home">Home</Link>
					{manageLink}
				</div>
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