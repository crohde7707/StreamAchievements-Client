import React from 'react';

import {updateNewStatus} from '../redux/profile-reducer';
import connector from '../redux/connector';

import Header from './header';
import Footer from './footer';
import {isAuthenticated} from '../utils/auth-utils';
import LoadingSpinner from './loading-spinner';
import SetupModal from '../components/setup-modal';

import './template.css';

class Template extends React.Component {

	handleClose = () => {
		this.props.dispatch(updateNewStatus({new: false}));
	}

	render() {

		let redirect, isLoading, fullscreen, setupModal;

		if(!isAuthenticated()) {
			let Redirect = require('react-router-dom').Redirect;

			return(<Redirect to='/' />);
		}

		if(this.props.profile && this.props.profile.isNew) {
			setupModal = <SetupModal onClose={this.handleClose} onInject={this.props.onInject} />
		}

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
					{setupModal}
		            <LoadingSpinner isLoading={isLoading} full={fullscreen} />
				</div>
				<Footer />
			</div>
		)
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(Template);