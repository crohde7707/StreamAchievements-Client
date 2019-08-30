import React from 'react';
import AddModeratorModal from './add-moderator-modal';

import './moderator-panel.css';

export default class Moderators extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			isModalActive: false,
			moderators: this.props.moderators || []
		}
	}

	handleDataChange = (evt) => {
		const target = evt.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let stateUpdate = {
			[name]: value
		};

		this.setState(stateUpdate);
	}

	showModModal = () => {

  		this.setState({
			isModalActive: true
		});	
		
	}

	hideModMoal = (moderators) => {
		
		let stateUpdate = {
			isModalActive: false
		};

		if(moderators) {
			stateUpdate.moderators = this.state.moderators.concat(moderators);
			stateUpdate.notice = 'Moderator granted access!';
		}
		this.setState(stateUpdate);
	}

	render() {

		let moderatorContent, addModeratorButton, modal;

		if(this.state.isModalActive) {
			modal = (
				<AddModeratorModal 
					channel={this.props.channel}
					onClose={this.hideModMoal}
					onSubmit={this.hideModMoal}
				/>
			);
		} else {
			modal = undefined;
		}

			addModeratorButton = (
				<div onClick={this.showModModal} className="add-moderator-button">
					<img alt="plus icon" src={require('../img/plus.png')} />
					<span>Add Moderator</span>
				</div>
			);

		if(this.state.moderators.length > 0) {
			moderatorContent = this.state.moderators.map((moderator, idx) => {
				let classes = "moderator";

				if(idx % 2 === 0) {
					classes += " stripe";
				}

				return (
					<div key={'moderator.' + idx} className={classes}>
						<div className="moderator-logo">
							<img src={moderator.logo} />
						</div>
						<div className="moderator-name">
							{moderator.name}
						</div>
						<div className="moderator-permissions">
							<div className="permission">
								<div className="permissions--label">
									<label htmlFor="channel-perm">Channel</label>
								</div>
								<div className="permissions--value">
									<input
										id="channel-perm"
										name="channel"
										className="textInput"
										type="checkbox"
										checked={moderator.permissions.channel}
										value="channel"
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
							<div className="permission">
								<div className="permissions--label">
									<label htmlFor="chat-perm">Chat</label>
								</div>
								<div className="permissions--value">
									<input
										id="chat-perm"
										name="channel"
										className="textInput"
										type="checkbox"
										checked={moderator.permissions.chat}
										value="chat"
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			})
		} else {
			moderatorContent = (
				<h3>You haven't granted anyone Moderator access</h3>
			);
		}

		return (
			<div className="moderator-panel">
				<div className="moderator-header">
					<h3>Moderators</h3>
					{addModeratorButton}
				</div>
				<div className="moderators-wrapper">
					{moderatorContent}
				</div>
				{modal}
			</div>
		)
	}

}