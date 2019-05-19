import React from 'react';

import './achievement.css';

class Achievement extends React.Component {

	render() {
		let keyProp, editIcon, giftIcon;
		let {earned, className} = this.props;
		let {title, description} = this.props.achievement;

		let achievementClass = "achievement";
		let icon = 'https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png';

		if(earned || this.props.editable) {
			achievementClass += " achievement--earned";
			icon = this.props.achievement.icon || null;
		}

		if(this.props.editable) {
			giftIcon = (
				<div title="Manual Awarding coming soon!" className="achievement--gift" onClick={this.props.onGift}>
					<img src={require('../img/gift.png')} />
				</div>
			);
			editIcon = (
				<div className="achievement--edit" onClick={() => {this.props.onClick(this.props.achievement)}}>
					<img src="https://res.cloudinary.com/phirehero/image/upload/v1552697627/edit-icon-png-24.png" />
				</div>
			);
		}

		if(className) {
			achievementClass += " " + className;
		}

		let logo;

		if(icon) {
			logo = (
				<div className="achievement-logo"><img src={icon} /></div>
			);
		}

		return (
			<div className={achievementClass}>
				{logo}
				<div className="achievement-info">
					<div className="achievement-title">{title}</div>
					<div className="achievement-description">{description}</div>
				</div>
				{giftIcon}
				{editIcon}
			</div>
		)
	}
}

export default Achievement;