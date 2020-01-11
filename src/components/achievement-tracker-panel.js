import React from 'react';

import LoadingSpinner from '../components/loading-spinner';

import './achievement-tracker-panel.css';

export default class AchievementTrackerPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: []
		}
	}

	handleSelect = (uid) => {
		this.props.handleSelect(uid);
	}

	render() {
		let bannedOverlay, achievements;
		let classNames = 'achievement-tracker--wrapper';

		if(this.props.isManage) {
			classNames += " achievement-tracker--managing";
		}

		if(this.props.member.banned) {
			classNames += " achievement-tracker--banned";
			bannedOverlay = (
				<div className="achievement-tracker--bannedOverlay">
					<div className="bannedContent">
						<h3>{`${this.props.member.name} is currently banned!`}</h3>
						<button type="button" onClick={this.props.handleUnban}>Revoke Ban</button>
					</div>
				</div>
			)
		}

		achievements = [...this.props.achievements];

		while(achievements.length % 3 != 0) {
			achievements.push({
				placeholder: true
			})
		}

		return (
			<div className={classNames}>
				{achievements.map((achievement, index) => {

					if(achievement.placeholder) {
						return (
							<div className="achievementTracker achievementTracker--placeholder"></div>
						)
					} else {

						let earned = this.props.member.achievements.indexOf(achievement.uid) >= 0;
						let pendingUpdate = this.props.selectedAchievements.indexOf(achievement.uid) >= 0;

						let className = "achievementTracker";

						if(earned) {
							className += " achievementTracker--earned";
						}

						if(pendingUpdate) {
							if(!earned) {
								className += " achievementTracker--pendingEarned";
							} else {
								className += " achievementTracker--pendingUnearned";
							}

							className += " achievementTracker--pending";
						}

						return (
							<div 
								key={'achievement-' + index} 
								className={className}
								onClick={() => {this.handleSelect(achievement.uid)}}
							>
								<div className="achievement-icon">
									<img alt="" src={achievement.icon || this.props.defaultIcon} />
								</div>
								<div className="achievement-title">
									{achievement.title}
								</div>
							</div>
						);
					}
				})}
				{bannedOverlay}
			</div>
		)
	}

}