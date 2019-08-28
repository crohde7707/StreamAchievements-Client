import React from 'react';

import './moderator-panel.css';

export default class Moderators extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			moderators: [
				{
					name: 'druhillion',
					logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/e568a7eefa41aad2-profile_image-300x300.jpeg',
					chat: false,
					channel: false
				},
				{
					name: 'aasendent',
					logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b3c81237-620e-47e4-8815-6c568f77ee80-profile_image-300x300.png',
					chat: false,
					channel: false
				},
				{
					name: 'ladyjac',
					logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3de7872d-2e13-4c2b-b9eb-14099a0e0962-profile_image-300x300.png',
					chat: false,
					channel: false
				}
			]
			//moderators: this.props.moderators || []
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

	render() {

		let moderatorContent, addModeratorButton;

		if(this.state.moderators.length > 0) {

			addModeratorButton = (
				<div onClick={this.addModerator} className="add-moderator-button">
					<img alt="plus icon" src={require('../img/plus.png')} />
					<span>Add Moderator</span>
				</div>
			);

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
										checked={moderator.channel}
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
										checked={moderator.chat}
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
			moderatorContent = "No moderators";
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
			</div>
		)
	}

}