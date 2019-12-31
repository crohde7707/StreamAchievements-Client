import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

import './achievement.css';

const LIMITED = "https://res.cloudinary.com/phirehero/image/upload/v1562639754/limited.png";
const LIMITED_EARNED = "https://res.cloudinary.com/phirehero/image/upload/v1562639754/limited-earned.png";

class Achievement extends React.Component {

	constructor() {
		super();

		this.state = {
			menuVisible: false
		}
	}

	toggleMenu = () => {
		this.setState({
			menuVisible: !this.state.menuVisible
		});
	}

	render() {
		let keyProp, editIcon, giftIcon, title, description, shortDescription, date, menu;
		let {earned, className, defaultIcons, unlocked} = this.props;
		let {secret, limited, earnedDate} = this.props.achievement;

		title = this.props.achievement.title;
		description = this.props.achievement.description;
		shortDescription = this.props.achievement.shortDescription || description;

		let achievementClass = "achievement";
		let icon = this.props.achievement.icon || defaultIcons.default || '';

		let limitedContent;

		if(!unlocked) {
			icon = defaultIcons.default;
		}

		if(earned || this.props.editable) {
			achievementClass += " achievement--earned";

		} else if(secret) {
			title = "????";
			description = "????????????";
			shortDescription = "????????????";
			icon = defaultIcons.hidden || ''
		}

		if(limited && (!earned && !this.props.editable)) {
			limitedContent = (
				<div className="achievement--limited">
					<img src={LIMITED} />
				</div>
			)
		}

		if(this.props.editable) {

			menu = (
				<div className={("achievement-menu") + ((this.state.menuVisible) ? " visible" : "")}>
					<button className="achievement-menu--button" onClick={this.toggleMenu}>
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1565714661/856781-200.png" />
					</button>
					<div className="achievement-menu--drawer">
						<div title="Awarding achievement manually!" className="achievement--gift" onClick={() => {this.props.onGift(this.props.achievement.uid)}}>
							<img src={require('../img/gift.png')} />
						</div>
						<div className="achievement--edit" onClick={() => {this.props.onClick(this.props.achievement)}}>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1552697627/edit-icon-png-24.png" />
						</div>
					</div>
				</div>
			)

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

		if(earned && earnedDate) {
			date = (<div className="achievement--earnDate">{new Date(earnedDate).toLocaleDateString()}</div>);
		}

		let content;

		if(!this.props.draggable) {
			content = (
				<div className={achievementClass}>
					{logo}
					<div className="achievement-info">
						<div className="achievement-title">{title}</div>
						<div className="achievement-description">{description}</div>
						<div className="achievement-shortDescription">{shortDescription}</div>
					</div>
					<div className="achievement--icons">
						{limitedContent}
						{menu}
					</div>
					{date}
				</div>
			)
		} else {
			content = (
				<Draggable draggableId={this.props.achievement.uid} index={this.props.index} isDragDisabled={!this.props.draggable}>
					{(provided) => (
							<div 
								className={achievementClass}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
							>
								{logo}
								<div className="achievement-info">
									<div className="achievement-title">{title}</div>
									<div className="achievement-description">{description}</div>
									<div className="achievement-shortDescription">{shortDescription}</div>
								</div>
								<div className="achievement--icons">
									{limitedContent}
									{menu}
								</div>
								{date}
							</div>
					)}
				</Draggable>
			)
		}

		return content;
	}
}

export default Achievement;