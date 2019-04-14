import React from 'react';

import './notification-panel.css';

export default class NotificationPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: null
		};
	}

	componentDidMount() {

	}

	shouldComponentUpdate(nextProps, nextState) {
				
		return true;
	}

	goToChannel = (channel) => {
		this.props.history.push('/channel/' + channel);
	}

	render() {

		let count = 3;

		let notificationContent = (
			<div className='notificationContent'>
				<div className="notification notification--unread">
					<div className="notification--icon"><img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
				<div className="notification">
					<div className="notification--icon"><img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
				<div className="notification">
					<div className="notification--icon"><img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
			</div>
		);

		return (
			<div className={"notificationPanel-wrapper" + ((this.props.active) ? " notificationPanel--active" : "")}>
				<div className="notificationPanel" onClick={this.props.onClick}>
					<img src={require('../img/notification.png')} />
					<div className="notificationPanel-badge">{count}</div>
				</div>
				{notificationContent}
			</div>
		)

	}
}