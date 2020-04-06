import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import './modal.css';
import './gift-achievement.css';

export default class GiftAchievementModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			members: "",
			searching: false,
			selectedMembers: [],
			awardNonMember: false
		}

		this._search = {};
	}

	componentDidMount() {

		this._socket = io.connect(process.env.REACT_APP_SOCKET_DOMAIN, {
			reconnection: true
		});

		this._socket.on('members-retrieved', members => {
			this.setState({
				members
			});
		});
	}

	filterList = (event) => {
	    this.setState({
			searching: true
		});

		if(this._searchTimeout !== null) {
			clearTimeout(this._searchTimeout);
		}

		this._searchTimeout = setTimeout(() => {
			if(this._search.value.length > 0) {

				this._socket.emit('search-gift-member', {
					aid: this.props.aid,
					value: this._search.value,
					owner: this.props.channel
				});
				this._searchTimeout = null;
				this.setState({
					searching: false
				});
			} else {
				this.setState({
					members: "",
					searching: false
				});
			}
		}, 400);
  	}

  	componentWillUnmount() {
  		this._socket.close();
  	}

	selectMember = (member, isMemberSelected) => {

		if(!isMemberSelected && !member.earned) {
			let { selectedMembers, members } = this.state;

			selectedMembers.push(member);

			let memberIdx = members.map((member) => { return member.name }).indexOf(member.name);

			members[memberIdx].selected = true;

			this.setState({
				members,
				selectedMembers
			});
		}
	}

	deselectMember = (index, nonMember) => {

		let stateUpdate;

		if(nonMember) {
			stateUpdate = {
				awardNonMember: false
			}
		} else {
			let selectedMembers = this.state.selectedMembers;

			selectedMembers.splice(index, 1);

			stateUpdate = {
				selectedMembers: selectedMembers
			};
		}

		this.setState(stateUpdate, () => {
			if(this._search.value.length > 0) {
				this._socket.emit('search-gift-member', this._search.value);
			}
		});
	}

	isSelected = (member) => {
		let selectedIdx = this.state.selectedMembers.findIndex(sMember => { return sMember.name === member.name });

		return selectedIdx >= 0;
	}

	addNonMember = () => {
		let member = this._search.value.toLowerCase();

		this.setState({
			awardNonMember: member
		});
	}

	buildMemberList = (members, className, selected) => {

		if(Array.isArray(members)) {

			if(members.length > 0) {

				return (
					<div className={className}>
						{members.map((member, index) => {
							let memberLogo, isMemberSelected, earned;

							isMemberSelected = this.isSelected(member);

							if(selected) {
								memberLogo = (
									<div className="clear-member">
										<img alt="Clear Member Icon" src="https://res.cloudinary.com/phirehero/image/upload/v1566235862/x.png" />
									</div>
								);
							} else {
								memberLogo = (
									<div className="member-logo">
										<img alt="Member Logo" src={member.logo} />
									</div>
								);
							}

							let className = "channelMember";

							if(index % 2 === 1) {
								className += " channelMember--stripe";
							}

							if(isMemberSelected) {
								className += " channelMember--selected";
							}

							if(member.earned) {
								className += " channelMember--earned";

								earned = (<img src="https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png" />);
							}

							if(member.nonMember) {
								className += " channelMember--nonMember";
							}

							return (
								<button
									type="button"
									key={'member-' + index}
									className={className}
									onClick={(event) => { 
										if(selected) {
											this.deselectMember(index, member.nonMember);
										} else {
											this.selectMember(member, isMemberSelected);
										}
									}}
								>
									{memberLogo}
									<div className="member-info">
										{member.name}
									</div>
									<div className="member-earned">
										{earned}
									</div>
								</button>
							)
						})}
					</div>
				)
			} else if(className === 'member-list') {
				if(this.state.awardNonMember) {
					return (
						<div className="member-list--info">
							<h5>Looks like they haven't joined your channel yet!</h5>
							<p>You can only award one non-member at a time! Either award your current selection, or remove '<span>{this.state.awardNonMember}</span>' from the selection above!</p>
						</div>
					)
				} else {
					return (
						<div className="member-list--info">
							<h5>Looks like they haven't joined your channel yet!</h5>
							<div className="award-non-member">
								<button type="button" onClick={this.addNonMember}>Add as Non Member</button>
							</div>
							<div className="helpText">Make sure to spell their name correctly! If we find them, they will receive it!</div>
						</div>
					)	
				}
				
			}	
		} else {

			return (
				<div>
					<h5>Start typing above to search!</h5>
				</div>
			);
		}
		
	}

	awardAchievement = () => {

		let selectedMembers = [];

		if(Array.isArray(this.state.selectedMembers)) {
			selectedMembers = [...this.state.selectedMembers];
		}

		if(this.state.awardNonMember) {
			selectedMembers.push({
				name: this.state.awardNonMember,
				nonMember: true
			});
		}

		if(this.props.isMod) {

			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/achievement/mod/award?channel=' + this.props.channel, {
				members: selectedMembers.map(member => {
					return {name: member.name, nonMember: member.nonMember}
				}),
				aid: this.props.aid
			}, {
				withCredentials: true
			}).then(response => {
				this.props.onSubmit(response.data.award);
			});

			
		} else {

			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/achievement/award', {
				members: selectedMembers.map(member => {
					return {name: member.name, nonMember: member.nonMember}
				}),
				aid: this.props.aid
			}, {
				withCredentials: true
			}).then(response => {
				this.props.onSubmit(response.data.award);
			});
			
		}
	}

	render() {
		let selectedMembers, disabled = true;
		let {members} = this.state;

		selectedMembers = [...this.state.selectedMembers];

		if(this.state.selectedMembers.length !== 0 || this.state.awardNonMember) {
			disabled = false;
		}

		if(this.state.awardNonMember) {
			selectedMembers.push({
				name: this.state.awardNonMember,
				logo: '',
				nonMember: true
			});
		}
		//TODO: only add once

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
								<input 
									placeholder="Search for member..."
									type="text"
									onChange={this.filterList}
									ref={(el) => {this._search = el}}
								/>
							</div>
							<h4>Members</h4>
							{this.buildMemberList(selectedMembers, 'selected-members', true)}
							{this.buildMemberList(members, 'member-list', false)}
						</div>
						<button disabled={disabled} className="chooseMember--award" type="button" onClick={this.awardAchievement}>Award</button>
						<button className="chooseMember--cancel" type="button" onClick={() => this.props.onClose()}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}