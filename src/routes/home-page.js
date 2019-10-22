import React from 'react';

import {updateNewStatus} from '../redux/profile-reducer';
import connector from '../redux/connector';

import './home-page.css';

import Template from '../components/template';
import ChannelList from '../components/channel-list';
import SetupModal from '../components/setup-modal';

class HomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: true,
			inject: []
		}
	}

	listLoaded = () => {
		this.setState({
			loading: false
		});
	}

	handleClose = () => {
		console.log('close');
		this.props.dispatch(updateNewStatus({new: false}));
	}

	handleInject = (channel) => {
		let inject = [...this.state.inject];

		inject.push(channel);
		
		this.setState({
			inject
		});
	}

	render() {

		let setupModal;

		if(this.props.profile && this.props.profile.isNew) {
			setupModal = <SetupModal onClose={this.handleClose} onInject={this.handleInject} />
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="main-content">
					<ChannelList onLoad={this.listLoaded} inject={this.state.inject} />
				</div>
				{setupModal}
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(HomePage);