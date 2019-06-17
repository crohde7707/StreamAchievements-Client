import React from 'react';

import './achievement.css';

class Achievement extends React.Component {

	render() {
		let keyProp, editIcon, giftIcon, title, description, earnDate;
		let {earned, className, defaultIcons} = this.props;
		let {secret, limited} = this.props.achievement;

		title = this.props.achievement.title;
		description = this.props.achievement.description;

		let achievementClass = "achievement";
		let icon = this.props.achievement.icon || defaultIcons.default || '';

		if(earned || this.props.editable) {
			achievementClass += " achievement--earned";

		} else if(secret) {
			title = "????";
			description = "????????????";
			icon = defaultIcons.hidden || ''
		}

		if(this.props.editable) {
			giftIcon = (
				<div title="Awarding achievement manually!" className="achievement--gift" onClick={() => {this.props.onGift(this.props.achievement.uid)}}>
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

		if(earned && earned !== true) {
			earnDate = (<div className="achievement--earnDate">{new Date(earned).toLocaleDateString()}</div>);
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
				{earnDate}
			</div>
		)
	}
}

export default Achievement;