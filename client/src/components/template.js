import React from 'react';

import Header from './header';
import Footer from './footer';
import {isAuthenticated} from '../utils/auth-utils';

import './template.css';

export default class Template extends React.Component {

	render() {

		let redirect;

		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			redirect = <Redirect to='/' />;
		}

		return (
			<div className="template">
				{redirect}
				<Header />
				<div className="main">
					{this.props.children}
				</div>
				<Footer />
			</div>
		)
	}

}