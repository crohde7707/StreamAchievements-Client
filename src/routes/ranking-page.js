import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';
import connector from '../redux/connector';
import {setProfile} from '../redux/profile-reducer';
import {Link} from 'react-router-dom';

import Template from '../components/template';
import Achievement from '../components/achievement';
import Notice from '../components/notice';

import './ranking-page.css';

class RankingPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			channel: '',
			notice: '',
			loading: true,
			fullAccess: false,
			small: false,
			progress: true,
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

	render() {

		let content;

		if(this.state.channel) {

			let {owner, logo} = this.state.channel;
			let achievements = this.state.achievements;

			let membershipContent, achievementProgress, rankingContent;


			if(achievements.length > 0) {
				let userAchievements = this.state.achievements.earned;

				rankingContent = (
					<div className="rankingWrapper">
						<div class="rankingProfile">
							<div class="ranking--info">
    							<div class="ranking--logo">
    								<img src={this.props.profile.logo} />
								</div>
    							<div class="ranking--rank">Rank: #21</div>
    							<div class="ranking--total">38 / 50 Achievements</div>
    						</div>
							<div class="ranking--earnings">
    							<div class="ranking--type">
									<div class="ranking--icon">
										<img src="https://res.cloudinary.com/phirehero/image/upload/v1559961119/default-icon-bronze.png" />
									</div>
    								<div class="ranking--value">: 12/30</div>
								</div>
									<div class="ranking--type">
										<div class="ranking--icon">
											<img src="https://res.cloudinary.com/phirehero/image/upload/v1558834120/default-icon-silver.png" />
										</div>
								    	<div class="ranking--value">: 9/15</div>
								</div>
									<div class="ranking--type">
										<div class="ranking--icon">
											<img src="https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png" />
										</div>
								    	<div class="ranking--value">: 2/5</div>
									</div>
									<div class="ranking--type">
										<div class="ranking--icon">
											<img src="https://res.cloudinary.com/phirehero/image/upload/v1564621881/default-icon-platinum.png" />
										</div>
								    	<div class="ranking--value">: 5</div>
									</div>
    						</div>
						</div>
						<div className="ranking-top">
							<h2>Top 20 Achievement Hunters</h2>
							<div className="ranking-memberList">
								<div className="ranking--member">
									<div className="ranking-member--rank">1</div>
									<div className="ranking-member--info">
										<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" />
										<span>Thorlar</span>
									</div>
									<div className="ranking-member--total">48</div>
								</div>
								<div className="ranking--member">
									<div className="ranking-member--rank">2</div>
									<div className="ranking-member--info">
										<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" />
										<span>Thorlar</span>
									</div>
									<div className="ranking-member--total">48</div>
								</div>
								<div className="ranking--member">
									<div className="ranking-member--rank">3</div>
									<div className="ranking-member--info">
										<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" />
										<span>Thorlar</span>
									</div>
									<div className="ranking-member--total">46</div>
								</div>
								<div className="ranking--member">
									<div className="ranking-member--rank">4</div>
									<div className="ranking-member--info">
										<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" />
										<span>Thorlar</span>
									</div>
									<div className="ranking-member--total">40</div>
								</div>
								<div className="ranking--member">
									<div className="ranking-member--rank">5</div>
									<div className="ranking-member--info">
										<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg" />
										<span>Thorlar</span>
									</div>
									<div className="ranking-member--total">39</div>
								</div>
							</div>
						</div>
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
				}
			}

			let wrapperClasses = 'channel-page';

			if(this.state.small) {
				wrapperClasses += ' channel-page--sm';
			}

			let channelHeaderStub;

			if(this.state.condensedHeader) {
				channelHeaderStub = (<div className="channel-header--stub"></div>)	
			}

			content = (
				<Template className="no-scroll" spinner={{isLoading: this.state.loading, fullscreen: true}}>
					<div className={wrapperClasses}>
						<Notice message={this.state.notice} onClear={this.clearNotice} />
						<div id="channel-header" ref={el => (this._channelHeader = el)} className={(this.state.condensedHeader) ? "condensed" : ""}>
							<div className="channel-logo">
								<img src={logo} />
							</div>
							<div className="channel-info">
								<div className="channel-name">
									<span>{owner}</span>
									<a title={'Go to ' + owner + '\'s channel on Twitch!'} href={"https://twitch.tv/" + owner} target="_blank">
										<img src="https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png" />
									</a>
									<Link to={"/channel/" + owner + "/rankings"} title={'View rankings for ' + owner + '\'s channel'}>
										<img className="ranking" src="https://res.cloudinary.com/phirehero/image/upload/v1559928373/ranking-icon.png" />
									</Link>
								</div>
								<div className="channel-description"></div>
							</div>
							{((this.state.small) ? null : achievementProgress)}
							<div className="channel-buttons">
								{membershipContent}
							</div>
						</div>
						{channelHeaderStub}
						{((this.state.small) ? achievementProgress : null)}
						{rankingContent}
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

export default connector(headerMapStateToProps)(RankingPage);