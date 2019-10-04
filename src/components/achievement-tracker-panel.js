import React from 'react';
import axios from 'axios';

import LoadingSpinner from '../components/loading-spinner';

import './achievement-tracker-panel.css';

export default class AchievementTrackerPanel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="achievement-tracker--wrapper">
				{this.props.achievements.map((achievement, index) => {

					let earned = this.props.member.achievements.indexOf(achievement.uid) >= 0;

					return (
						<div key={'achievement-' + index} className={"achievementTracker" + ((earned) ? " achievementTracker--earned" : "")}>
							<div className="achievement-icon">
								<img alt="" src={achievement.icon || this.props.defaultIcon} />
							</div>
							<div className="achievement-title">
								{achievement.title}
							</div>
						</div>
					);
				})}
			</div>
		)
	}

}