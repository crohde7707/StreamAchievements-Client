import React from 'react';
import PropTypes from 'prop-types';
import Achievement from './achievement.js';


class Achievements extends React.Component {
	
	static propTypes = {
		user: PropTypes.string
	};

	constructor(props) {
		super();
		
		this.state = {
			user: {
				name: '',
				achievements: []
			}
		};
	}

	componentDidMount() {
		//Fetch achievements

		fetch('/api/authenticate', {
				crossDomain: true,
				method: 'GET'
			}).then((res) => {
				res.json();
			}).then((info) => {
				console.log(info);
			}).catch((err) => {
				console.log("Error when calling '/api/authenticate'");
				console.log(err);
			});

		this.setState({
			user: {
				name: 'phirehero',
				achievements: [
					{
						"title": "To Arms!",
						"description": "Joined in a raid",
						"icon": "raid.png"
					},
					{
						"title": "Don’t Touch My Plumbob",
						"description": "Updated Phirehero's Plumbob during stream",
						"icon": "plumbob.png"
					}
				]
			}
		});
	}

	render() {

		return (
			<div id="achievements-container">
				<div id="achievements-header">
					Achievements for {this.state.user.name}
				</div> 
				{this.state.user.achievements.map((achievement, i) => <Achievement key={i} info={achievement} />)}
			</div>
		)
	}
}

export default Achievements;