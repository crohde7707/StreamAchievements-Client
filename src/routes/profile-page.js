import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import io from "socket.io-client";

import {updatePreferences, syncTwitch, updateNotifications} from '../redux/profile-reducer';
import connector from '../redux/connector';

import Notice from '../components/notice';
import Template from '../components/template';
import PlatformIntegrationPanel from '../components/platform-integration-panel';
import AdditionalPlatformsPanel from '../components/additional-platforms-panel';
import PatreonPanel from '../components/patreon-panel';
import LoadingSpinner from '../components/loading-spinner';

import './profile-page.css';

class ProfilePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			achievements: '',
			notice: '',
			fetching: true,
			loading: true,
			retrieving: false,
			preferences: (this.props.profile) ? this.props.profile.preferences : {autojoin: true},
			showMore: false
		};
	}

	componentDidMount() {

		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/profile', {
			withCredentials: true
		}).then((res) => {
			this.setState({
				notifications: res.data.notifications,
				next: res.data.next,
				fetching: false,
				platform: this.camelize(res.data.platform)
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

		if(prevProps.profile && prevProps.profile.unreadNotifications < this.props.profile.unreadNotifications) {
			//show "show new notificaitons" button
			this.setState({
				showMore: true
			});
		}
	}

	camelize = (text) => {
	    let upperText = text.toUpperCase();
	    return upperText.substr(0, 1) + text.substr(1);
	}

	retrieveMoreNotifications = (force) => {
		if(!this.state.retrieving) {
			this.setState({
				retrieving: true
			}, () => {
				axios.get(process.env.REACT_APP_API_DOMAIN + 'api/notifications', {
					params: {
						next: force ? 0 : this.state.next
					},
					withCredentials: true
				}).then(res => {
					
					setTimeout(() => {
						if(res.data.notifications) {
							this.setState({
								notifications: force ? res.data.notifications : this.state.notifications.concat(res.data.notifications),
								next: res.data.next,
								retrieving: false,
								showMore: false
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
			case 'dashboard':
				this.props.history.push('/dashboard');
				break;
			case 'token':
				this.setState({
					loading: true
				}, () => {
					axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/token/generate', {}, {
						withCredentials: true
					}).then(res => {
						let stateUpdate = {
							loading: false
						};

						if(res.data.token) {
							//successful generation, delete this notice
							this._socket.emit('delete-notification', notification);
							this.props.dispatch(updateNotifications({count: this.props.profile.unreadNotifications - 1}));
						} else {
							stateUpdate.notice = "An error occured while generating your token! Let us know on Discord! (link in the footer)";
						}

						this.setState(stateUpdate);
					});
				});
				break;
			default:
				break;
		}
	}

	deleteNotification = (evt, notification) => {
		evt.stopPropagation();
		this._socket.emit('delete-notification', notification);
		this.props.dispatch(updateNotifications({count: this.props.profile.unreadNotifications - 1}));
	}

	clearNotice = () => {
		this.setState({
			notice: ''
		});
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
		if(this.props.profile.unreadNotifications > 0) {

			this._socket.emit('mark-notification-read', {nid: this.props.profile.nid});

			let newNotifications = this.state.notifications;
			newNotifications.forEach(notification => {
				notification.status = "read";
			});

			this.setState({
				notifications: newNotifications
			});
			this.props.dispatch(updateNotifications({count: 0}));
		}
	}

	render() {

		let preferencesContent, integrationContent, notificationContent, showMoreButton;

		if(!this.state.fetching && this.props.profile) {

			let {logo, username} = this.props.profile;
			
			let saveButton;

			if(this.state.touched && Object.keys(this.state.touched).length > 0) {
				saveButton = <input className='save-button--active' type="submit" value="Save" onClick={this.savePreferences} />
			} else {
				saveButton = <input className='save-button--inactive' disabled type="submit" value="Save" />
			}

			preferencesContent = (
				<div>
					<h4>Basic Info</h4>
					<span className="subtext">{`This information is managed by ${this.state.platform}`}</span>
					<div className="section-wrapper basic-info">
						<div className="section-label">
					        <label htmlFor="logo">Profile</label>
					    </div>
					    <div className="section-value">
					        <span name="logo"><img alt="" src={logo} /></span> <span name="name">{username}</span>
					    </div>
					</div>
					<div className="section-wrapper">
						<div className="section-label">
					        <label htmlFor="preferences-autojoin">Auto-Join Channel</label>
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

			let integrationPanels = [];

			if(this.props.profile.currentPlatform === 'mixer') {
				integrationPanels = [
					(<PlatformIntegrationPanel key="integration-panels--1" platform="Mixer" />),
					(<PlatformIntegrationPanel key="integration-panels--2" platform="Twitch" />)
				];
			} else if(this.props.profile.currentPlatform === 'twitch') {
				integrationPanels = [
					(<PlatformIntegrationPanel key="integration-panels--1" platform="Twitch" />),
					(<PlatformIntegrationPanel key="integration-panels--2" platform="Mixer" />)					
				];
			}

			integrationContent = (
				<div>
					{integrationPanels}
					<AdditionalPlatformsPanel />
					<PatreonPanel />
				</div>
			);

			let loadMoreButton, noNotifications, markReadButton;

			if(this.state.next) {
				loadMoreButton = (
					<div className={("load-more-button") + (this.state.retrieving ? " loading" : "")}>
						<button type="button" onClick={() => {this.retrieveMoreNotifications()}}>Load More</button>
						<LoadingSpinner isLoading={this.state.retrieving} />
					</div>
				);
			}

			if(this.state.showMore) {
				showMoreButton = (
					<div class="show-new-notifications" onClick={() => {this.retrieveMoreNotifications(true)}}>
						<div class="notification-message">Show new notifications</div>
					</div>
				);
			}

			if(this.state.notifications.length === 0) {
				noNotifications = (
					<div className="no-notifications">
						Looks like you are all caught up!
					</div>
				)
			} else if(this.props.profile && this.props.profile.unreadNotifications > 0) {
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
					{showMoreButton}
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
										alt="Delete Notification Icon"
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