import React from 'react';
import {Link} from 'react-router-dom';

import './notification-panel.css';

export default class NotificationPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: null
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
				
		return true;
	}

	goToChannel = (channel) => {
		this.props.history.push('/channel/' + channel);
	}

	render() {

		let badge;

		let count = this.props.count;

		if(count > 0) {
			if(count > 9) {
				badge = (<div className="notificationPanel-badge offset">9+</div>);
			} else {
				badge = (<div className="notificationPanel-badge">{count}</div>);
			}
			
		}

		let notificationContent = (
			<div className='notificationContent'>
				<div className="notification notification--unread">
					<div className="notification--icon"><img alt="" src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
				<div className="notification">
					<div className="notification--icon"><img alt="" src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
				<div className="notification">
					<div className="notification--icon"><img alt="" src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" /></div>
					<div className="notification--info">You earned the 'Fresh and Crispy' Achievement!</div>
					<div className="notification--delete">X</div>
				</div>
			</div>
		);

		return (
			<Link to="/profile?tab=notifications">
				<div className={"notificationPanel-wrapper" + ((this.props.active) ? " notificationPanel--active" : "")}>
					<div className="notificationPanel" /*onClick={this.props.onClick}*/>
						<img alt="" src={require('../img/notification.png')} />
						{badge}
					</div>
					{notificationContent}
				</div>
			</Link>
		)

	}
}