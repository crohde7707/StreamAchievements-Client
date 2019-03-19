import React from 'react';

import './achievement.css';

class Achievement extends React.Component {

	render() {
		let keyProp, editIcon;
		let {title, description, earned} = this.props.achievement;

		let achievementClass = "achievement";
		let icon = 'https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png';

		if(earned || this.props.editable) {
			achievementClass += " achievement--earned";
			icon = this.props.achievement.icon;
		}

		if(this.props.editable) {
			editIcon = (
				<div className="achievement--edit" onClick={() => {this.props.onClick(this.props.achievement)}}>
					<img src="https://res.cloudinary.com/phirehero/image/upload/v1552697627/edit-icon-png-24.png" />
				</div>
			)
		}

		return (
			<div className={achievementClass}>
				<div className="achievement-logo"><img src={icon} /></div>
				<div className="achievement-info">
					<div className="achievement-title">{title}</div>
					<div className="achievement-description">{description}</div>
				</div>
				{editIcon}
			</div>
		)
	}
}

export default Achievement;