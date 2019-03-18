import React from 'react';
import axios from 'axios';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';

import Template from '../components/template';
import Achievement from '../components/achievement';

import './channel-page.css';

class ChannelPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			channel: ''
		}
	}

	componentDidMount() {
		//Fetch channel data 

		axios.get('/api/channel/retrieve?id=' + this.props.match.params.channelid).then((res) => {
			console.log(res.data);
			
			let joined = (Array.isArray(res.data.achievements.earned));


			this.setState({
				channel: res.data.channel,
				achievements: res.data.achievements,
				joined: joined
			}, () => {
				window.addEventListener('scroll', this.updateChannelHeader);		
			});
		});	
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.updateChannelHeader);
	}

	updateChannelHeader = () => {
	  if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
	    document.getElementById("channel-header").classList.add('condensed');
	  } else {
	    document.getElementById("channel-header").classList.remove('condensed');
	  }
	}

	// function move() {
	// 	let {achievements, earned} = this.state.achievements;

	//     var elem = document.getElementById("progress-bar"); 
	    
	//     elem.style.width = earned.length / achievements.length;
	// }

	joinChannel = () => {
		axios.post('/channel/join', {
			channel: this.state.channel.owner
		})
		.then((res) => {
			console.log(res.data);
		});
	}

	leaveChannel = () => {
		axios.post('/channel/leave', {
			channel: this.state.channel.owner
		})
		.then((res) => {
			console.log(res.data);
		});
	}

	render() {

		let content;

		if(this.state.channel) {

			let {owner, logo} = this.state.channel;
			let achievements = this.state.achievements.all;

			let membershipContent, achievementsContent;

			if(this.state.joined) {
				membershipContent = <a href="javascript:;" onClick={this.leaveChannel} className="leave">Leave Channel</a>
			} else {
				membershipContent = <a href="javascript:;" onClick={this.joinChannel} className="join">Join Channel</a>
			}

			if(achievements.length > 0) {
				achievementsContent = (
					<div className="achievements-container">
						{achievements.map((achievement, index) => {

							let earned = false;
							let userAchievements = this.state.achievements.earned;

							if(Array.isArray(userAchievements) && userAchievements.includes(achievement.id)) {
								earned = true;
							}

							return (<Achievement key={'achievement-' + index} earned={earned} achievement={achievement} />)
						})}
						
					</div>
				);
			} else {
				achievementsContent = (
					<div className="no-achievements">
						<p>{owner} has yet to make any achievements available!</p>
						<p>Check back soon!</p>
					</div>
				)
			}

			content = (
				<Template>
					<div id="channel-header">
						<div className="channel-fav"><img src={require('../img/star-not-favorited.png')} /></div>
						<div className="channel-logo">
							<img src={logo} />
						</div>
						<div className="channel-info">
							<div className="channel-name">{owner}</div>
							<div className="channel-description"></div>
						</div>
						<div className="channel-achievement-progress">
							<div id="progress-bar-wrapper">
  								<div id="progress-bar"></div>
							</div>
						</div>
						<div className="channel-buttons">
							{membershipContent}
						</div>
					</div>
					{achievementsContent}
				</Template>
			);
		} else {
			content = (<Template>Loading channel information...</Template>);
		}

		return content;
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(ChannelPage);