import React from 'react';

import Header from './header';
import Footer from './footer';
import {isAuthenticated} from '../utils/auth-utils';

import LoadingSpinner from './loading-spinner';

import './template.css';

export default class Template extends React.Component {

	render() {

		let redirect;

		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			return(<Redirect to='/' />);
		}

		let isLoading, fullscreen;

		if(this.props.spinner) {
			isLoading = this.props.spinner.isLoading;
			fullscreen = this.props.spinner.fullscreen;
		}

		return (
			<div className="template">
				{redirect}
				<Header />
				<div id="mainContent" className="main">
					{this.props.children}
		            <LoadingSpinner isLoading={isLoading} full={fullscreen} />
				</div>
				<Footer />
			</div>
		)
	}

}