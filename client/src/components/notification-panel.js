import React from 'react';
import io from 'socket.io-client';

import './notification-panel.css';

const socketURL = 'http://localhost:5000';

export default class NotificationPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			username: null
		};
	}

	componentDidMount() {
		this.initSocket();
	}

	shouldComponentUpdate(nextProps, nextState) {
		
		if(nextProps.profile) {
			console.log(nextProps.profile.username);
			if(!this.state.username || this.props.profile.username !== nextProps.profile.username) {
				//Emit to the server that this socket username has updated
				let { socket } = this.state;
				console.log('emitting USERNAME_UPDATED');
				socket.emit('USERNAME_UPDATED', nextProps.profile.username);
				this.setState({
					username: nextProps.profile.username
				});
			}	
		}
		
		return true;
	}

	componentWillUnmount() {
		this.state.socket.disconnect();
	}

	initSocket = () => {
		if(!this.state.socket) {
			const socket = io(socketURL);

			socket.on('connect', () => {
				console.log("connected to server via websockets");
			});

			socket.on('NOTIFICATION_RECEIVED', (notification) => {
				console.log(notification);
			});

			this.setState({socket});
		}
	}

	render() {

		let count;

		let notificationContent = (
			<div className='notificationContent'>
				<div className="notification">
					<div className="notification--icon"></div>
					<div className="notification--info"></div>
					<div className="notification--delete">X</div>
				</div>
			</div>
		);

		return (
			<div className={"notificationPanel" + ((this.props.active) ? " notificationPanel--active" : "")} onClick={this.props.onClick}>
				<img src={require('../img/notification.png')} />
				<div className="notificationPanel-badge">{count}</div>
				{notificationContent}
			</div>
		)

	}
}