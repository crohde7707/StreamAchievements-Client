import React from 'react';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';
import axios from 'axios';

import './header.css';

class Header extends React.Component {

	componentDidMount() {
		if(!this.props.profile) {
			axios.get('/api/user').then((res) => {
				console.log(res.data);
				this.props.dispatch(setProfile(res.data));
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props);
	}

	render() {
		let username, logo;
		
		if(this.props.profile) {
			username = this.props.profile.username
			logo = <img src={this.props.profile.logo} />;
		}

		let manageLink = (this.props.owner) ? <a href={"/channel/" + this.props.user.name + "/manage"}>Manage Channel</a> : null;

		return (
			<div id="page-header">
				<div className="logo">
					<img src={require('../img/raid.png')} alt="" />
				</div>
				<div className="header-nav">
					<a href="/home">Home</a>
					<a href="/profile">Profile</a>
					{manageLink}
				</div>
				<div className="menu">
					<div className="menu--logo">{logo}</div>
					<div className="menu--label">{username}</div>
					<div className="menu--icon"></div>
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

export default connector(headerMapStateToProps)(Header);