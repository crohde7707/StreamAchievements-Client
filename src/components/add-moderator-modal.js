import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import './modal.css';
import './add-moderator-modal.css';
import LoadingSpinner from '../components/loading-spinner';

export default class AddModeratorModal extends React.Component {

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

				this._socket.emit('search-mod', {
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

		if(!isMemberSelected && !member.isMod) {
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
				this._socket.emit('search-mod', this._search.value);
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
						let memberLogo, isMemberSelected, isMod;

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

						if(member.isMod) {
							className += " channelMember--mod";

							isMod = (<img src="https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png" />);
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
								<div className="member-isMod">
									{isMod}
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

	grantMod = () => {
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/mod', {
			mods: this.state.selectedMembers.map(member => member.name)
		}, {
			withCredentials: true
		}).then(response => {
			this.props.onSubmit(response.data.moderators);
		});
	}

	render() {

		let {members, selectedMembers} = this.state;

		return (
			<div className="add-moderator">
				<div className="modal-mask" onClick={() => {this.props.onCancel()}}></div>
				<div className="modal-container">
					<div className="modal" ref={addModeratorModal => (this.addModeratorModal = addModeratorModal)}>
						<div className="modal-header">
							<h3>Grant Moderator</h3>
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
						<button className="chooseMember--grant" type="button" onClick={this.grantMod}>Grant</button>
						<button className="chooseMember--cancel" type="button" onClick={() => this.props.onClose()}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}