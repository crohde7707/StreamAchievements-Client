import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';
import {Link} from 'react-router-dom';

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
			fullAccess: false,
			small: false,
			progress: false,
			condensedHeader: false
		}
	}

	componentDidMount() {
		//Fetch channel data 

		let authAxios = axios.create({
			withCredentials: true
		});

		authAxios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/retrieve?id=' + this.props.match.params.channelid, {
			withCredentials: true
		}).then((res) => {
			this.setState({
				channel: res.data.channel,
				achievements: res.data.achievements,
				joined: res.data.joined,
				fullAccess: res.data.fullAccess,
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
		window.removeEventListener('scroll', this._updateChannelHeader);
		window.removeEventListener('resize', this._updateChannelSize);
		document.body.classList.remove('no-scroll');
	}

	clearNotice = () => {
		this.setState({
			notice: ''
		});
	}

	updateChannelHeader = () => {

		let height = document.documentElement.scrollHeight;
		let top = document.documentElement.scrollTop;
		let bodyTop = document.body.scrollTop;
		
	  if (height > 1000 && (bodyTop > 230 || top > 230)) {
	  	if(!this.state.condensedHeader) {
	  		this.setState({
	  			condensedHeader: true
	  		});
	  	}
	  } else {
	  	this.setState({
  			condensedHeader: false
  		});
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
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/join', {
			channel: this.state.channel.owner
		}, {
			withCredentials: true
		})
		.then((res) => {
			this.setState({
				joined: true,
				notice: "Joined channel successfully!"
			});
		});
	}

	leaveChannel = () => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/leave', {
			channel: this.state.channel.owner
		}, {
			withCredentials: true
		})
		.then((res) => {
			if(res.data.leave) {
				this.props.history.push('/home');
			}
		});
	}

	toggleProgress = () => {
		if(this.state.small) {
			this.setState({
				progress: !this.state.progress
			});
		}
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
				membershipContent = (
					<a className="join-channel" href="javascript:;" onClick={this.joinChannel}>
						<span>Join</span><span className="long-description"> Channel</span>
					</a>
				);
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

							return (<Achievement key={'achievement-' + index} unlocked={this.state.fullAccess} earned={earned} achievement={achievement} className={classes} defaultIcons={this.state.channel.icons} />)
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

					if(this.state.condensedHeader) {
						progressClasses += ' channel-progress--condensed';
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

			let channelHeaderStub;

			if(this.state.condensedHeader) {
				channelHeaderStub = (<div className="channel-header--stub"></div>)	
			}

			let badges;

			if(this.state.channel.broadcaster_type && this.state.channel.broadcaster_type.twitch === "partner") {
				badges = (<img title="Twitch Partner" alt="Twitch Partner" src="https://res.cloudinary.com/phirehero/image/upload/v1564851737/twitch-partner-icon.png" />);
			}

			content = (
				<Template className="no-scroll" spinner={{isLoading: this.state.loading, fullscreen: true}}>
					<div className={wrapperClasses}>
						<Notice message={this.state.notice} onClear={this.clearNotice} />
						<div
							id="channel-header"
							ref={el => (this._channelHeader = el)}
							className={(this.state.condensedHeader) ? "condensed" : ""}
							onClick={this.toggleProgress}
						>
							{favorite}
							<div className="channel-logo">
								<img src={logo} />
							</div>
							<div className="channel-info">
								<div className="channel-name">
									<span>{owner}</span>
									{badges}
									{/*<Link to={"/channel/" + owner + "/rankings"} title={'View rankings for ' + owner + '\'s channel'}>
										<img className="ranking" src="https://res.cloudinary.com/phirehero/image/upload/v1559928373/ranking-icon.png" />
									</Link>*/}
								</div>
								<div className="channel-links">
									<a title={'Go to ' + owner + '\'s channel on Twitch!'} href={"https://twitch.tv/" + owner} target="_blank">
										<img src="https://res.cloudinary.com/phirehero/image/upload/v1564853282/twitch-icon.png" />
									</a>
								</div>
							</div>
							{((this.state.small) ? null : achievementProgress)}
							<div className="channel-buttons">
								{membershipContent}
							</div>
						</div>
						{channelHeaderStub}
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