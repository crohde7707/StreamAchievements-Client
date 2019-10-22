import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { withRouter } from 'react-router-dom';

import './setup-channel-list.css';

export default class SetupChannelList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			channels: props.channels
		};
	}

	render() {

		let content;
		let wrapperClasses = "setup-channel-list";

		if(!this.state.channels) {
			content = null;
		} else {
			let {channels} = this.state;

			if(Array.isArray(channels)) {
				if(channels.length > 0) {
					//we have some channels!
					
					if(channels.length > 0) {
						if(channels.length > 4) {
							wrapperClasses += " setup-channel-list--scroll";
						}
						
						content = channels.map((channel, index) => {

							let joinButton;
							let classes = "setup-channel-item";

							if(channel.joined) {
								classes += " setup-channel-item--joined"
								joinButton = (<div className="setup-channel-item--join"><img src="https://res.cloudinary.com/phirehero/image/upload/v1566873563/checked-white.png" /></div>);
							} else {
								joinButton = (<button type="button" className="setup-channel-item--join" onClick={() => {this.props.onJoin(channel)}}>Join</button>);
							}

							return (
								<div key={"channel." + index} className={classes}>
									<div className="setup-channel-item--logo"><img alt="Channel Logo" src={channel.logo} /></div>
									<div className="setup-channel-item--name">{channel.name}</div>
									{joinButton}
								</div>
							)
						});
					}
				}
			}
		}



		return (
			<div className={wrapperClasses}>
				{content}
			</div>
		);
	}
}