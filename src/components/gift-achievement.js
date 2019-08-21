import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import './modal.css';
import './gift-achievement.css';
import LoadingSpinner from '../components/loading-spinner';

export default class GiftAchievementModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			members: "",
			searching: false,
			selectedMembers: []
		}

		this._search = {};
	}

	componentDidMount() {
		this.positionModal();

		this._socket = io.connect(process.env.REACT_APP_SOCKET_DOMAIN, {
			reconnection: true
		});

		this._socket.on('members-retrieved', members => {
			this.setState({
				members
			});
		});
	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		this.giftModal.style.top = (winHeight/2) - (this.giftModal.offsetHeight) + scrollTop + 'px';
		this.giftModal.style.left = (winWidth / 2) - (this.giftModal.offsetWidth / 2) + 'px';
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

	deselectMember = (index) => {
		let selectedMembers = this.state.selectedMembers;

		selectedMembers.splice(index, 1);

		this.setState({
			selectedMembers: selectedMembers
		}, () => {
			if(this._search.value.length > 0) {
				this._socket.emit('search-gift-member', this._search.value);
			}
		});
	}

	isSelected = (member) => {
		let selectedIdx = this.state.selectedMembers.findIndex(sMember => { return sMember.name === member.name });

		return selectedIdx >= 0;
	}

	buildMemberList = (members, className, selected) => {

		if(Array.isArray(members)) {

			return (
				<div className={className}>
					{members.map((member, index) => {
						let memberLogo, isMemberSelected, earned;

						isMemberSelected = this.isSelected(member);

						if(selected) {
							memberLogo = (
								<div className="clear-member">
									<img src="https://res.cloudinary.com/phirehero/image/upload/v1566235862/x.png" />
								</div>
							);
						} else {
							memberLogo = (
								<div className="member-logo">
									<img src={member.logo} />
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

						return (
							<button
								type="button"
								key={'member-' + index}
								className={className}
								onClick={(event) => { 
									if(selected) {
										this.deselectMember(index);
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
		} else {
			return (<h5>Start typing above to search!</h5>);	
		}
		
	}

	awardAchievement = () => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/achievement/award', {
			members: this.state.selectedMembers.map(member => member.name),
			aid: this.props.aid
		}, {
			withCredentials: true
		}).then(response => {
			this.props.onSubmit(response.data.members);
		});
	}

	render() {

		let {members, selectedMembers} = this.state;

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
						<button className="chooseMember--award" type="button" onClick={this.awardAchievement}>Award</button>
						<button className="chooseMember--cancel" type="button" onClick={() => this.props.onClose()}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}