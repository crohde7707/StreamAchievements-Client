import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';

import Template from '../components/template';
import Achievement from '../components/achievement';
import Notice from '../components/notice';

import './channel-page.css';

class ChannelPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			channel: '',
			notice: '',
			loading: true,
			small: false,
			progress: true
		}
	}

	componentDidMount() {
		//Fetch channel data 

		let authAxios = axios.create({
			withCredentials: true
		});

		authAxios.get('/api/channel/retrieve?id=' + this.props.match.params.channelid).then((res) => {
			console.log(res.data.achievements);
			this.setState({
				channel: res.data.channel,
				achievements: res.data.achievements,
				joined: res.data.joined,
				loading: false
			}, () => {
				this.updateChannelHeader();
				this.updateChannelSize();

				this._updateChannelHeader = throttle(this.updateChannelHeader, 200);
				this._updateChannelSize = throttle(this.updateChannelSize, 200);

				window.addEventListener('scroll', this._updateChannelHeader);
				window.addEventListener('resize', this._updateChannelSize);
			});
		});	
	}

	componentWillUnmount() {
		console.log('unmounting...');
		window.removeEventListener('scroll', this._updateChannelHeader);
		window.removeEventListener('resize', this._updateChannelSize);
	}

	clearNotice = () => {
		this.setState({
			notice: ''
		});
	}

	updateChannelHeader = () => {
	  if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
	    document.getElementById("channel-header").classList.add('condensed');
	  } else {
	    document.getElementById("channel-header").classList.remove('condensed');
	  }
	}

	updateChannelSize = () => {
		if(window.innerWidth <= 480 && !this.state.small) {
			this.setState({
				small: true
			});
		} else if(window.innerWidth > 480 && this.state.small) {
			this.setState({
				small: false
			});
		}
	}

	joinChannel = () => {
		axios.post('/api/channel/join', {
			channel: this.state.channel.owner
		})
		.then((res) => {
			this.setState({
				joined: true,
				notice: "Joined channel successfully!"
			});
		});
	}

	leaveChannel = () => {
		axios.post('/api/channel/leave', {
			channel: this.state.channel.owner
		})
		.then((res) => {
			console.log(res.data);
			if(res.data.leave) {
				this.props.history.push('/home');
			}
		});
	}

	render() {

		let content;

		if(this.state.channel) {

			let {owner, logo} = this.state.channel;
			let achievements = this.state.achievements;

			let membershipContent, achievementProgress, achievementsContent, favorite;

			if(this.state.joined) {
				// membershipContent = <a href="javascript:;" onClick={this.leaveChannel} className="leave">Leave Channel</a>
				membershipContent = null;
				document.body.classList.remove('no-scroll');
			} else {
				membershipContent = <a href="javascript:;" onClick={this.joinChannel} className="join">Join Channel</a>

				document.body.classList.add('no-scroll');
			}


			if(achievements.length > 0) {
				let userAchievements = this.state.achievements.earned;

				achievementsContent = (
					<div className="achievements-container">
						{achievements.map((achievement, index) => {

							let classes;
							let earned = achievement.earned;

							if(index >= 3 && !this.state.joined) {
								classes = "achievement-blurred";
							}

							return (<Achievement key={'achievement-' + index} earned={earned} achievement={achievement} className={classes} />)
						})}
						
					</div>
				);

				if(this.state.joined) {
					let {achievements} = this.state;

					let percentage = Math.floor((achievements.filter(achievement => achievement.earned).length / achievements.length) * 100);

					let progressClasses = 'channel-progress';

					if(this.state.progress) {
						progressClasses += ' channel-progress--visible';
					}

					achievementProgress = (
						<div className={progressClasses}>
							<div className="channel-achievement-progress">
								<div className="progress-bar--label">Achievement Progress</div>
								<div className="progress-bar--visual">
									<div className="progress-bar-wrapper">
		  								<div className="progress-bar" style={{width: percentage + "%"}}></div>
									</div>
									<div className="progress-percentage">{percentage}%</div>
								</div>
							</div>
						</div>
					)

					//TODO: Future Perk
					//favorite = (<div className="channel-fav"><img src={require('../img/star-not-favorited.png')} /></div>);
					//favorite = (<div className="channel-fav"></div>);
				}
			} else {
				achievementsContent = (
					<div className="no-achievements">
						<p>{owner} has yet to make any achievements available!</p>
						<p>Check back soon!</p>
					</div>
				)
			}

			let wrapperClasses = 'channel-page';

			if(this.state.small) {
				wrapperClasses += ' channel-page--sm';
			}

			content = (
				<Template className="no-scroll" spinner={{isLoading: this.state.loading, fullscreen: true}}>
					<div className={wrapperClasses}>
						<Notice message={this.state.notice} onClear={this.clearNotice} />
						<div id="channel-header">
							{favorite}
							<div className="channel-logo">
								<img src={logo} />
							</div>
							<div className="channel-info">
								<div className="channel-name">
									<span>{owner}</span>
									<a title={'Go to ' + owner + '\'s channel on Twitch!'} href={"https://twitch.tv/" + owner} target="_blank">
										<img src="https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png" />
									</a>
								</div>
								<div className="channel-description"></div>
							</div>
							{((this.state.small) ? null : achievementProgress)}
							<div className="channel-buttons">
								{membershipContent}
							</div>
						</div>
						{((this.state.small) ? achievementProgress : null)}
						{achievementsContent}
					</div>
				</Template>
			);
		} else {
			content = (<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>Loading channel information...</Template>);
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