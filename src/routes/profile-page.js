import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {updatePreferences} from '../redux/profile-reducer';
import connector from '../redux/connector';

import Notice from '../components/notice';
import Template from '../components/template';
import PatreonPanel from '../components/patreon-panel';

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
			preferences: (this.props.profile) ? this.props.profile.preferences : {}
		};
	}

	componentDidMount() {

		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/profile', {
			withCredentials: true
		}).then((res) => {
			this.setState({
				channels: res.data.channels,
				fetching: false
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

	render() {

		let preferencesContent, integrationContent, channelContent, patreonContent;

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
							<label class="switch">
							  	<input 
							  		id="preferences-autojoin"
							  		name="autojoin"
									type="checkbox"
									checked={this.state.preferences.autojoin}
									onChange={this.handleDataChange}
								/>
							  <span class="slider round"></span>
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
							<div className="integration-sync">
								<a href="javascript:;"><img alt="" src={require('../img/sync-white.png')} /></a>
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

		} else {
			integrationContent = (<div>Fetching Integration...</div>);
			channelContent = (<div>Fetching Channels...</div>);
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="manage-container">
					<h2>Profile</h2>
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">Preferences</Tab>
							<Tab className="manage-tab">Integration</Tab>
							<Tab className="manage-tab">Joined Channels</Tab>
						</TabList>
						<TabPanel>
							{preferencesContent}
						</TabPanel>
						<TabPanel>
							{integrationContent}
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