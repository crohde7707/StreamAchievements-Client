import React from 'react';
import axios from 'axios';
import io from "socket.io-client";
import Achievement from '../components/achievement';

import './overlay-panel.css';

class OverlayPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: props.match.params.uid,
			settings: {},
			alert: undefined
		}

		this._queue = [];
	}

	componentDidMount() {
		if(this.state.uid) {

			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/overlay', {
				params: {
					id: this.props.match.params.uid
				}
			}).then((res) => {
				console.log(res);
				this.setState({
					settings: res.data.overlay,
					icons: res.data.icons
				});
			});

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

				let achievement = {
					title: alert.title,
					description: alert.user,
					icon: alert.icon
				}

				this.setState({
					alert: achievement
				});

				setTimeout(() => {
					this.setState({
						alert: undefined
					});
				}, 5000);
			}
		}, 6000)
	}

	queueAlert = (alert) => {
		this._queue.push(alert);
	}

	render() {

		let alertContent;

		if(this.state.alert) {
			alertContent = (
				<div className="overlay-container bottom">
					<Achievement achievement={this.state.alert} defaultIcons={this.state.icons} earned={true}/>
					<div className="hidden">
						<audio 
							preload="auto"
							src={this.state.settings.sfx}
							ref={(audio) => this.audioRef = audio}
							volume={this.state.settings.volume}
							autoPlay={true}
						/>
					</div>
					{/*<h2>{this.state.alert.member} just earned the {this.state.alert.achievement} achievement!</h2>*/}
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