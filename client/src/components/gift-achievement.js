import React from 'react';
import axios from 'axios';

import './modal.css';
import './gift-achievement.css';

export default class GiftAchievementModal extends React.Component {

	constructor(props) {
		super(props);

		let unearnedMembers = props.members.filter(member => {
			let notEarned = (member.achievements.filter(achievement => achievement.aid === props.aid).length === 0);
			return notEarned;
		});

		this.state = {
			members: unearnedMembers,
			aid: props.aid
		}
	}

	componentDidMount() {
		this.filterMembers();
		this.positionModal();
	}

	filterMembers() {
		console.log(this.props.members);

	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		this.giftModal.style.top = (winHeight/2) - (this.giftModal.offsetHeight) + scrollTop + 'px';
		this.giftModal.style.left = (winWidth / 2) - (this.giftModal.offsetWidth / 2) + 'px';
	}

	filterList = (event) => {
	    var updatedList = this.state.members;

	    if(event.target.value === '') {
	    	//nothing in text box
	    	this.setState({filteredMembers: false});
	    } else {
	    	updatedList = updatedList.filter(member => {
		      return (member.name).toLowerCase().search(
		        event.target.value.toLowerCase()) !== -1;
		    });
		    
		    this.setState({filteredMembers: updatedList});
	    }	    
  	}

	onChange = (event) => {
		this.props.onChange(event).then(res => {
			if(res.error) {
				console.log(res.error);
			}
		});
	}

	toggleMember = (member, event, fromChild) => {
		let members = this.state.members;

		let memberIdx = members.map((member) => { return member.name }).indexOf(member.name);

		if(members[memberIdx].selected) {
			delete members[memberIdx].selected;
		} else {
			members[memberIdx].selected = true
		}

		this.setState({
			members
		});
	}

	buildMemberList = (members, className) => {
		if(Array.isArray(members) && members.length > 0) {

			return (
				<div className={className}>
					{members.map((member, index) => (
						<button
							type="button"
							key={'member-' + index}
							className={"channelMember" + ((index % 2 === 1) ? " channelMember--stripe" : "") + ((member.selected) ? " channelMember--selected" : "")}
							onClick={(event) => { this.toggleMember(member, event) }}
						>
							<div className="member-logo">
								<img src={member.logo} />
							</div>
							<div className="member-info">
								{member.name}
							</div>
						</button>
					))}
				</div>
			)	
		} else {
			if(this.props.members.length > 0) {
				return (<h5>Your whole community currently has this achievement!</h5>);
			} else {
				return (<h5>Currently no members for your channel!</h5>);	
			}
			
		}
		
	}

	awardAchievement = () => {
		let chosenMembers = this.state.members.filter(member => member.selected);

		console.log(chosenMembers);

		axios.post('/api/achievement/award', {
			members: chosenMembers.map(member => member.name),
			aid: this.state.aid
		}).then(response => {
			this.props.onSubmit(response.data.members);
		});
	}

	render() {

		let {members, membersToGift} = this.state;

		if(Array.isArray(this.state.filteredMembers)) {
			members = this.state.filteredMembers;
		}

		return (
			<div className="gift-modal">
				<div className="modal-mask" onClick={() => {this.props.onCancel()}}></div>
				<div className="modal-container">
					<div className="modal" ref={giftModal => (this.giftModal = giftModal)}>
						<div className="modal-header">
							<h3>Award Achievement</h3>
						</div>
						<div className="modal-content chooseMember--wrapper">
							<div className="member-search">
								<input placeholder="Search for member..." type="text" onChange={this.filterList} />
							</div>
							<h4>Members</h4>
							{this.buildMemberList(members, 'member-list')}
						</div>
						<button className="chooseMember--award" type="button" onClick={this.awardAchievement}>Award</button>
						<button className="chooseMember--cancel" type="button" onClick={() => this.props.onClose()}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}