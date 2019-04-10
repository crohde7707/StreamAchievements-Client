import React from 'react';

export default class NotificationPanel extends React.Component {

	constructor() {
		super();

		this.state = {};
	}

	componentDidMount() {
		
	}

	render() {

		return (
			<div className="notifications">
				<img src={icon} />
				<div className="notification-badge">{count}</div>
			</div>
		)

	}
}