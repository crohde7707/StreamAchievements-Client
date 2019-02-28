import React from 'react';

import './header.css';

export default class Header extends React.Component {

	render() {

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
			</div>
		)

	}
}