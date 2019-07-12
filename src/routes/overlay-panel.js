import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import './overlay-panel.css';

class OverlayPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: props.match.params.uid
		}

		this._queue = [];
	}

	componentDidMount() {
		if(this.state.uid) {
			this._socket = io.connect(`${process.env.REACT_APP_API_DOMAIN}?uid=${this.state.uid}`, {
				reconnection: true
			});

			this._socket.on('alert-recieved', (alert) => {
				this.queueAlert(alert);
			});
		} else {
			this.props.history.push('/home');
		}
	}

	queueAlert = (alert) => {
		console.log(alert);
	}

	render() {

		return (
			<div id={this.state.uid} className="overlay-wrapper">
				
			</div>
		);
	}
}

export default OverlayPanel;