import React from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axios-instance';
import throttle from 'lodash/throttle';
import connector from '../redux/connector';

import Template from '../components/template';
import Achievement from '../components/achievement';
import Notice from '../components/notice';
import LoadingSpinner from '../components/loading-spinner.js';

import './channel-page.css';

const TWITCH_ICON = "https://res.cloudinary.com/phirehero/image/upload/v1564853282/twitch-icon.png";
const MIXER_ICON = "https://res.cloudinary.com/phirehero/image/upload/v1589634307/mixer-icon.png";

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
			condensedHeader: false,
			favorite: false,
			joining: false,
			banned: false
		}
	}

	componentDidMount() {
		//Fetch channel data 

		axiosInstance.call('get', process.env.REACT_APP_API_DOMAIN + 'api/channel/retrieve?channel=' + this.props.match.params.channelid).then((res) => {
			if(!res.error) {
				this.setState({
					channel: res.data.channel,
					achievements: res.data.achievements,
					joined: res.data.joined,
					fullAccess: res.data.fullAccess,
					favorite: res.data.favorited,
					loading: false,
					banned: res.data.banned
				}, () => {
					this.updateChannelHeader();
					this.updateChannelSize();

					this._updateChannelHeader = throttle(this.updateChannelHeader, 200);
					this._updateChannelSize = throttle(this.updateChannelSize, 200);

					window.addEventListener('scroll', this._updateChannelHeader);
					window.addEventListener('resize', this._updateChannelSize);
				});
			}
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

	handleInject = () => {
		this.setState({
			joining: true
		});

		setTimeout(() => {
			this.setState({
				joined: true
			});

			setTimeout(() => {
				this._joinButton.classList.add('fade');
			}, 1000);

			setTimeout(() => {
				this.setState({
					joining: false
				});
			}, 1200);
		}, 2000);
	}

	joinChannel = () => {
		if(!this.state.joining && !this.state.joined) {
			this.setState({
				joining: true
			});

			let minimumReached = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/join', {
				channel: this.state.channel.owner
			}, {
				withCredentials: true
			})
			.then((res) => {

				minimumReached.then(() => {
					this.setState({
						joined: true
					});

					setTimeout(() => {
						this._joinButton.classList.add('fade');
					}, 1000);

					setTimeout(() => {
						this.setState({
							joining: false
						});
					}, 1200);
				});	
			});
		}
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

	favoriteChannel = (evt, task) => {
		evt.stopPropagation();
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/favorite', {
			channel: this.state.channel.owner,
			task
		}, {
			withCredentials: true
		}).then(res => {
			//update in redux?
			this.setState({
				favorite: res.data.favorited
			});
		});
	}

	render() {

		let content;

		if(this.state.channel) {

			let {logo, platforms} = this.state.channel;
			let achievements = this.state.achievements;

			let membershipContent, achievementProgress, achievementsContent, favorite, bannedOverlay;

			if(this.state.banned) {
				bannedOverlay = (
					<div className="channel-page--bannedOverlay">
						<div className="bannedContent">
							<h3>You are currently banned from earning achievements in this channel.</h3>
						</div>
					</div>
				)

				document.body.classList.add('scroll-lock');
			}

			if(this.state.joined) {
				// membershipContent = <a href="javascript:;" onClick={this.leaveChannel} className="leave">Leave Channel</a>
				membershipContent = null;
				document.body.classList.remove('no-scroll');

				if(this.state.favorited) {
					favorite = (
						<div className="channel-fav" onClick={(evt) => this.favoriteChannel(evt, "remove")}>
							<img alt="Favorite Channel" src={require('../img/star-favorited.png')} />
						</div>
					);	
				} else {
					favorite = (
						<div className="channel-fav" onClick={(evt) => this.favoriteChannel(evt, "add")}>
							<img alt="Non-favorite Channel" src={require('../img/star-not-favorited.png')} />
						</div>
					);
				}
			} else {
				favorite = (<div className="channel-fav-placeholder"></div>);
				document.body.classList.add('no-scroll');
			}

			if(!this.state.joined && !this.state.joining) {
				//joined already
				membershipContent = (
					<a className="join-channel" href="javascript:;" onClick={this.joinChannel} ref={(el) => this._joinButton = el}>
						<span>Join</span><span className="long-description"> Channel</span>
					</a>
				);
			} else if(!this.state.joined && this.state.joining) {
				membershipContent = (
					<div className="join-channel joining" ref={(el) => this._joinButton = el}>
						<LoadingSpinner isLoading={true} />
					</div>
				)
			} else if(this.state.joined && this.state.joining) {
				membershipContent = (
					<div className="join-channel joining joined" ref={(el) => this._joinButton = el}>
						<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1566873563/checked-white.png" />
					</div>
				);
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
						{bannedOverlay}
					</div>
				);

				if(this.state.joined) {
					let {achievements} = this.state;

					let percentage = Math.round((achievements.filter(achievement => achievement.earned).length / achievements.length) * 100);

					let progressClasses = 'channel-progress';

					if(this.state.progress) {
						progressClasses += ' channel-progress--visible';
					}

					if(this.state.condensedHeader) {
						progressClasses += ' channel-progress--condensed';
					}

					if(percentage === 100) {
						progressClasses += ' channel-progress--completed';
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
				}
			} else {
				achievementsContent = (
					<div className="no-achievements">
						<p>{/*owner*/} has yet to make any achievements available!</p>
						<p>Check back soon!</p>
					</div>
				)
			}

			let wrapperClasses = 'channel-page';

			if(this.state.small) {
				wrapperClasses += ' channel-page--sm';
			}

			if(this.state.banned) {
				wrapperClasses += ' channel-page--banned';

				bannedOverlay = (
					<div className="channel-page--bannedOverlay">
						<div className="bannedContent">
							<h3>You are currently banned from earning achievements in this channel.`}</h3>
						</div>
					</div>
				)
			}

			let channelHeaderStub;

			if(this.state.condensedHeader) {
				channelHeaderStub = (<div className="channel-header--stub"></div>)	
			}

			let badges;

			if(this.state.channel.broadcaster_type && this.state.channel.broadcaster_type.twitch === "partner") {
				badges = (<img title="Twitch Partner" alt="Twitch Partner" src="https://res.cloudinary.com/phirehero/image/upload/v1564851737/twitch-partner-icon.png" />);
			}

			let headerClasses = "channel-header";

			if(this.state.condensedHeader) {
				headerClasses += " condensed";
			}

			if(!this.state.joined || this.state.joining) {
				headerClasses += " not-joined";
			}

			let platformsIcons = [], name = [];

			let channelPlatforms = Object.keys(platforms);

			let currentPlatform = this.props.profile.currentPlatform;
			
			if(this.state.channel.platforms[currentPlatform]) {
				logo = this.state.channel.platforms[currentPlatform].logo;
			}

			channelPlatforms.forEach(channelPlatform => {
				let icon;

				switch(channelPlatform) {
					case 'twitch':
						icon=TWITCH_ICON;
						break;
					case 'mixer':
						icon=MIXER_ICON;
						break;
					default:
						break;
				}

				let channelName = this.state.channel.platforms[channelPlatform].name;

				name.push((
					<div className="channel-item--identifier">
						<a title={'Go to ' + channelName + '\'s channel on Twitch!'} href={"https://twitch.tv/" + channelName} target="_blank">
							<img src={icon} /> 
						</a> <span className="name">{channelName}</span>
					</div>
				));
			});

			content = (
				<Template onInject={this.handleInject} className="no-scroll" spinner={{isLoading: this.state.loading, fullscreen: true}}>
					<div className={wrapperClasses}>
						<Notice message={this.state.notice} onClear={this.clearNotice} />
						<div
							id="channel-header"
							ref={el => (this._channelHeader = el)}
							className={headerClasses}
							onClick={this.toggleProgress}
						>
							{favorite}
							<div className="channel-logo">
								<img src={logo} />
							</div>
							<div className="channel-info">
								<div className="channel-item--name">
									{name}
									{/*badges*/}
									{/*<Link to={"/channel/" + owner + "/rankings"} title={'View rankings for ' + owner + '\'s channel'}>
										<img className="ranking" src="https://res.cloudinary.com/phirehero/image/upload/v1559928373/ranking-icon.png" />
									</Link>*/}
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
			content = (<Template spinner={{isLoading: this.state.loading, fullscreen: true}}></Template>);
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