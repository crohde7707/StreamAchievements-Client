import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import connector from '../redux/connector';

import Template from '../components/template';
import Achievement from '../components/achievement';
import AchievementEditModal from '../components/achievement-edit-modal';

import './manage-channel.css';

class ManageChannel extends React.Component {

	constructor() {
		super();

		this.state = {
			channel: '',
			achievements: ''
		};
	}

	componentDidMount() {

		axios.get('/api/channel/retrieve').then((res) => {
			console.log(res.data);

			if(res.data.error) {
				//redirect to home
			} else {
				this.setState({
					channel: res.data.channel,
					achievements: res.data.achievements
				});	
			}
		});
	}

	filterList = (event) => {
	    var updatedList = this.state.achievements;

	    if(event.target.value === '') {
	    	//nothing in text box
	    	this.setState({filteredAchievements: false});
	    } else {
	    	updatedList = updatedList.filter(function(achievement){
		      return (achievement.title).toLowerCase().search(
		        event.target.value.toLowerCase()) !== -1;
		    });
		    
		    this.setState({filteredAchievements: updatedList});
	    }	    
  	}

  	showAchievementEdit = (achievement) => {
  		console.log(achievement.title);
  	}

  	showEditAchievementModal = (achievement) => {
  		console.log(achievement);
		this.setState({
			isEditAchievementActive: true,
			editing: achievement
		});
	}

	hideEditAchievementModal = () => {
		this.setState({
			isEditAchievementActive: false
		});
	}

	render() {

		if(this.props.profile && !this.props.profile.owner) {
			return (<Redirect to='/home' />);
		}

		let integrationContent, achievementContent, memberContent;

		if(this.state.channel) {

			let {logo, owner} = this.state.channel;
			let achievements = this.state.achievements;

			if(Array.isArray(this.state.filteredAchievements)) {

				achievements = this.state.filteredAchievements;
			}

			integrationContent = (
					<div className="twitch-integration">
						<div className="twitch-integration--header">
							<img src={require('../img/twitch-glitch.png')} />
							<h3>Twitch Integration</h3>
							<div className="twitch-integration--sync">
								<a href="javascript:;"><img src={require('../img/sync-white.png')} /></a>
							</div>
						</div>
						<div className="twitch-integration--content">
							<div className="channelInfo--logo">
								<img src={logo} />
							</div>
							<div className="channelInfo--data">
								<div className="channelInfo--name">{owner}</div>
								<div className="channelInfo--link">{'twitch.tv/' + owner}</div>
							</div>
						</div>
					</div>
			);

			achievementContent = (
				<div>
					<div className="achievementsHeader">
						<h3>Showing {achievements.length} Achievements</h3>
						<div className="achievement-search">
							<input placeholder="Search for achievement..." type="text" onChange={this.filterList} />
						</div>
						<div className="achievementsHeader--add">
							<div className="achievementHeader--plus">
								<img src={require('../img/plus.png')} />
							</div>
							<a href="javascript:;">Add New...</a>
						</div>
					</div>
					{achievements.map((achievement, index) => (
						<Achievement key={'achievement-' + index} editable={true} achievement={achievement} onClick={this.showEditAchievementModal} />
					))}
					<AchievementEditModal active={this.state.isEditAchievementActive} onClose={this.hideEditAchievementModal} achievement={this.state.editing} title="Edit Achievement"/>
				</div>
			);

			memberContent = (
				this.state.channel.members.map((member, index) => (
					<div key={'member-' + index} className={"channelMember" + ((index % 2 === 1) ? " channelMember--stripe" : "")}>
						<div className="member-logo">
							<img src={member.logo} />
						</div>
						<div className="member-info">
							{member.name}
						</div>
					</div>
				))
			);
		} else {
			integrationContent = (<div>Fetching Channel Info</div>);
			achievementContent = (<div>Fetching Achievements</div>);
			memberContent = (<div> Fetching Members...</div>);
		}

		return (
			<Template>
				<div className="manage-container">
					<h2>Manage Channel</h2>
					<Tabs>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">Integration</Tab>
							<Tab className="manage-tab">Achievements</Tab>
							<Tab className="manage-tab">Members</Tab>
						</TabList>
						<TabPanel>
							{integrationContent}
						</TabPanel>
						<TabPanel>
							{achievementContent}
						</TabPanel>
						<TabPanel>
							<h3>Members</h3>
							{memberContent}
						</TabPanel>
					</Tabs>
				</div>
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(ManageChannel);

//export default ManageChannel;