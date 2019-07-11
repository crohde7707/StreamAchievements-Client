import React from 'react';
import connector from '../redux/connector';
import Template from '../components/template';

import './gold-page.css'

class GoldPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Template>
				<div className="gold-page">
					<h2>StreamAchievements Gold</h2>
					<div className="section">
						<h3>What is StreamAchievements Gold?</h3>
						<p>StreamAchievements Gold is a premium tier system that is offered to members and content creators that choose to support StreamAchievements!</p>
					</div>
					<div className="section">
						<h3>Why Should I Upgrade?</h3>
						<p>When you upgrade to Gold, you gain access extra features that unlocks the full potential of creating achievements for your community! Along with this, you also get access to a bit of personalization to really let your brand flair through your channel!</p>
					</div>
					<div className="section">
						<h3>What Features Do I Recieve By Becoming a Gold Supporter?</h3>
						<p>Here is a breakdown of all of the features available:</p>
						<table>
							<tr>
								<th></th>
								<th>Basic</th>
								<th>Gold</th>
							</tr>
							<tr>
								<td>Channel Creation</td>
								<td><img src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></td>
								<td></td>
							</tr>
							<tr>
								<td>Member Rankings</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>On Stream Alerts</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
				</div>
			</Template>
		)

	}

}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(GoldPage);