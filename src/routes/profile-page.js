import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import io from "socket.io-client";

import {updatePreferences, syncTwitch, updateNotifications} from '../redux/profile-reducer';
import connector from '../redux/connector';

import Notice from '../components/notice';
import Template from '../components/template';
import PatreonPanel from '../components/patreon-panel';
import LoadingSpinner from '../components/loading-spinner';

import './profile-page.css';

class ProfilePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			channel: '',
			achievements: '',
			notice: '',
			fetching: true,
			loading: true,
			retrieving: false,
			preferences: (this.props.profile) ? this.props.profile.preferences : {}
		};
	}

	componentDidMount() {

		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/profile', {
			withCredentials: true
		}).then((res) => {
			this.setState({
				channels: res.data.channels,
				notifications: res.data.notifications,
				next: res.data.next,
				fetching: false
			});

			this._socket = io.connect(process.env.REACT_APP_SOCKET_DOMAIN, {
				reconnection: true
			});

			this._socket.on('notification-removed', (removed) => {
				let idx = this.state.notifications.findIndex(notification => {
					return notification.id === removed
				});

				let newNotifications = this.state.notifications;
				newNotifications.splice(idx, 1);

				this.setState({
					notifications: newNotifications
				});
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.loading) {
			if(!this.state.fetching && this.props.profile) {
				this.setState({
					loading: false,
					preferences: this.props.profile.preferences
				});
			}

			if(this.props.profile && !prevProps.profile && !this.state.fetching) {
				this.setState({
					loading: false,
					preferences: this.props.profile.preferences
				});
			}
		}
	}

	retrieveMoreNotifications = () => {
		if(!this.state.retrieving) {
			this.setState({
				retrieving: true
			}, () => {
				axios.get(process.env.REACT_APP_API_DOMAIN + 'api/notifications', {
					params: {
						next: this.state.next
					},
					withCredentials: true
				}).then(res => {
					
					setTimeout(() => {
						if(res.data.notifications) {
							this.setState({
								notifications: this.state.notifications.concat(res.data.notifications),
								next: res.data.next,
								retrieving: false
							});
						}
					}, 700);
				})
			})
		}
	}

	navigate = (notification) => {
		//mark notification as read
		if(notification.status === 'new') {
			this._socket.emit('mark-notification-read', {notification});
			this.props.dispatch(updateNotifications({count: this.props.profile.unreadNotifications - 1}));
		}

		let newNotifications = this.state.notifications;
		let nindex = newNotifications.findIndex(not => {
			return not.id === notification.id
		});

		newNotifications[nindex].status = 'read';
		this.setState({
			notifications: newNotifications
		});
		
		switch (notification.type) {
			case 'achievement':
				this.props.history.push(`/channel/${notification.channel}`);
				break;
			case 'confirmation':
				break;
			case 'profile':
				this.props.history.push('/profile?tab=integration');
				break;
			default:
				break;
		}
	}

	deleteNotification = (evt, notification) => {
		console.log(evt.target);
		evt.stopPropagation();
		this._socket.emit('delete-notification', notification);
	}

	clearNotice = () => {
		this.setState({
			notice: ''
		});
	}

	filterList = (event) => {
	    var updatedList = this.state.channels;

	    if(event.target.value === '') {
	    	//nothing in text box
	    	this.setState({filteredChannels: false});
	    } else {
	    	updatedList = updatedList.filter(function(channel){
		      return (channel.owner).toLowerCase().search(
		        event.target.value.toLowerCase()) !== -1;
		    });
		    
		    this.setState({filteredChannels: updatedList});
	    }	    
  	}

  	handleDataChange = (event) => {
  		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let touched = this.state.touched || {};
		let preferences = {...this.state.preferences}
		touched[name] = true;
		preferences[name] = value;

		this.setState({
			preferences,
			touched
		});
  	}

  	savePreferences = () => {
  		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/profile/preferences', {
  			preferences: this.state.preferences
  		}, {
  			withCredentials: true
  		}).then((res) => {
  			this.props.dispatch(updatePreferences({preferences: res.data}));

  			this.setState({
  				preferences: res.data,
  				touched: undefined,
				notice: "Preferences updated successfully!"
  			});
  		});
  	}

  	handleTwitchSync = () => {
		this._sync.classList.add('active');
		axios.post(process.env.REACT_APP_API_DOMAIN + 'auth/twitch/sync', {}, {
			withCredentials: true
		}).then(res => {
			this._sync.classList.remove('active');
			this.props.dispatch(syncTwitch(res.data));
		});
	}

	markAllRead = () => {
		//this._socket.emit('mark-notification-read', {nid: this.props.profile.nid});

		let newNotifications = this.state.notifications;
		newNotifications.forEach(notification => {
			notification.status = "read";
		});

		console.log(newNotifications);

		this.setState({
			notifications: newNotifications
		});
		this.props.dispatch(updateNotifications({count: 0}));
	}

	render() {

		let preferencesContent, integrationContent, notificationContent, channelContent, patreonContent;

		if(this.state.channels && this.props.profile) {

			let {logo, username} = this.props.profile;
			let channels = this.state.channels;

			if(Array.isArray(this.state.filteredChannels)) {

				channels = this.state.filteredChannels;
			}

			let saveButton;

			if(this.state.touched && Object.keys(this.state.touched).length > 0) {
				saveButton = <input className='save-button--active' type="submit" value="Save" onClick={this.savePreferences} />
			} else {
				saveButton = <input className='save-button--inactive' disabled type="submit" value="Save" />
			}

			preferencesContent = (
				<div>
					<div className="section-wrapper">
						<div className="section-label">
					        <label htmlFor="name">Auto-Join Channel</label>
					        <p>When turned on, you will automatically join a channel that you receive an achievement in!</p>
					    </div>
					    <div className="section-value">
							<label className="switch">
							  	<input 
							  		id="preferences-autojoin"
							  		name="autojoin"
									type="checkbox"
									checked={this.state.preferences.autojoin}
									onChange={this.handleDataChange}
								/>
							  <span className="slider round"></span>
							</label>
					    </div>
					</div>
					<div className="section-wrapper--end">
						 {saveButton}
					</div>
				</div>
			)

			integrationContent = (
				<div>
					<div className="integration integration--twitch">
						<div className="integration-header">
							<img alt="" src={require('../img/twitch-glitch.png')} />
							<h3>Twitch</h3>
							<div className="integration-settings">
								<a title="Opens Twitch settings in new tab" href={'https://twitch.tv/' + username + '/settings'} target="_blank"><img alt="Settings" src="https://res.cloudinary.com/phirehero/image/upload/v1561746754/settings.png" /></a>
							</div>
							<div className="integration-sync" ref={(el) => {this._sync = el}}>
								<a href="javascript:;" onClick={this.handleTwitchSync}><img alt="" src={require('../img/sync-white.png')} /></a>
							</div>
						</div>
						<div className="integration-content">
							<div className="channelInfo--logo">
								<img alt="" src={logo} />
							</div>
							<div className="channelInfo--data">
								<div className="channelInfo--name">{username}</div>
								<div className="channelInfo--link">{'twitch.tv/' + username}</div>
							</div>
						</div>
					</div>
					<PatreonPanel />
				</div>
			);

			let loadMoreButton, noNotifications, markReadButton;

			if(this.state.next) {
				loadMoreButton = (
					<div className={("load-more-button") + (this.state.retrieving ? " loading" : "")}>
						<button type="button" onClick={this.retrieveMoreNotifications}>Load More</button>
						<LoadingSpinner isLoading={this.state.retrieving} />
					</div>
				);
			}

			if(this.state.notifications.length === 0) {
				noNotifications = (
					<div className="no-notifications">
						Looks like you are all caught up!
					</div>
				)
			} else {
				markReadButton = (<button type="button" onClick={this.markAllRead} className="mark-read-button">Mark All Read</button>);
			}

			let notificationText = 'Notification';

			if(this.state.notifications.length !== 1) {
				notificationText += 's';
			}

			notificationContent = (
				<div>
					<div className="notifications-header">
						<h3>Showing {this.state.notifications.length} {notificationText}</h3>
						{markReadButton}
					</div>
					{this.state.notifications.map((notification, index) => {

						let classes = "notification";

						if(notification.status === 'new') {
							classes += " new";
						}

						return (
							<div onClick={() => {this.navigate(notification)}} key={"notification." + index} className={classes}>
								<div className="notification-logo"><img alt="" src={notification.logo} /></div>
								<div className="notification-message">{notification.message}</div>
								<div className="notification-date">{new Date(notification.date).toLocaleDateString()}</div>
								<div className="notification-delete" onClick={(evt) => {this.deleteNotification(evt, notification)}}>
									<img
										className="delete-notification-button"
										src="https://res.cloudinary.com/phirehero/image/upload/v1556641782/trash-white.png"
									/>
								</div>
							</div>
						);
					})}
					{noNotifications}
					{loadMoreButton}
				</div>
			)

			channelContent = (
				<div className="profile--channels">
					<div className="achievementsHeader">
						<h3>Showing {channels.length} Channels</h3>
						<div className="achievement-search">
							<input placeholder="Search for channel..." type="text" onChange={this.filterList} />
						</div>
					</div>
					{channels.map((channel, index) => (
						<div key={"channel." + index} className="channel-item">
							<div className="channel-item--logo"><img alt="" src={channel.logo} /></div>
							<div className="channel-item--name">{channel.owner}</div>
						</div>
					))}
				</div>
			);

		}

		const params = new URLSearchParams(this.props.location.search);
		const tab = params.get('tab');
		let tabIndex = 0;

		switch(tab) {
			case 'integration':
				tabIndex = 1;
				break;
			case 'notifications':
				tabIndex = 2;
				break;
			case 'joined':
				tabIndex = 3;
				break;
			default:
				break;
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div id="profile-page" className="manage-container">
					<h2>Profile</h2>
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs defaultIndex={tabIndex}>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">Preferences</Tab>
							<Tab className="manage-tab">Integration</Tab>
							<Tab className="manage-tab">Notifications</Tab>
							<Tab className="manage-tab">Channels</Tab>
						</TabList>
						<TabPanel>
							{preferencesContent}
						</TabPanel>
						<TabPanel>
							{integrationContent}
						</TabPanel>
						<TabPanel>
							{notificationContent}
						</TabPanel>
						<TabPanel>
							{channelContent}
						</TabPanel>
					</Tabs>
				</div>
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(ProfilePage);