import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import './overlay-panel.css';

class OverlayPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: props.match.params.uid,
			alert: undefined
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
				console.log(alert);
			});
		} else {
			this.props.history.push('/home');
		}

		this._showAlert = setInterval(() => {
			console.log('showAlert');
			if(this._queue.length > 0) {
				console.log('alert found');
				let alert = this._queue.shift();
				console.log(alert);
				this.setState({
					alert
				});

				setTimeout(() => {
					this.setState({
						alert: undefined
					});
				}, 6000);
			}
		}, 10000)
	}

	queueAlert = (alert) => {
		this._queue.push(alert);
	}

	render() {

		let alertContent;

		if(this.state.alert) {
			alertContent = (
				<div className="overlay-container">
					<h2>{this.state.alert.member} just earned the {this.state.alert.achievement} achievement!</h2>
				</div>
			)
		}

		return (
			<div id={this.state.uid} className="overlay-wrapper">
				{alertContent}
			</div>
		);
	}
}

export default OverlayPanel;