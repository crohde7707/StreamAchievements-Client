import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import LoadingSpinner from './loading-spinner';
import AchievementTrakerPanel from './achievement-tracker-panel';
import ConfirmPanel from './confirm-panel';

import './members-panel.css';

export default class MembersPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			members: "",
			searching: false,
			selectedMember: undefined,
			loading: false,
			promptActive: false,
			promptText: '',
			selectedAchievements: [],
			resetAchievements: false
		};
	}

	componentDidMount() {
		this._socket = io.connect(process.env.REACT_APP_SOCKET_DOMAIN, {
    		reconnection: true
    	});

    	this._socket.on('member-results', (members) => {
    		this.setState({
    			members
    		});
    	});
	}

	componentWillUnmount() {
		this._socket.close();
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
				this._socket.emit('search-members', {
					value: this._search.value,
					owner: this.props.channel.owner
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

	showPanel = (member) => {
		this.setState({
			loading: true
		});

		setTimeout(() => {
			axios.get(`${process.env.REACT_APP_API_DOMAIN}api/channel/member/select?uid=${member.name}&owner=${this.props.channel.owner}`, {
				withCredentials: true
			}).then(res => {
				this.setState({
					loading: false,
					members: "",
					selectedMember: res.data
				});
			})
		}, 500);
	}

	hidePanel = () => {
		this.setState({
			loading: true
		});

		setTimeout(() => {
			this.setState({
				loading: false,
				selectedMember: false
			});
		}, 500);
	}

	handleSave = () => {
		if(this.state.selectedAchievements.length > 0) {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/member/save', {
				id: this.state.selectedMember.name,
				achievements: this.state.selectedAchievements
			},{
				withCredentials: true
			}).then(res => {
				this.setState({
					selectedMember: res.data.member,
					selectedAchievements: [],
					manage: false
				});	
			});
		}
	}

	handleEditCancel = () => {
		this.setState({
			manage: false,
			selectedAchievements: []
		});
	}

	handleSelect = (uid) => {
		if(this.state.manage) {
			let selectedAchievements = this.state.selectedAchievements;

			let idx = selectedAchievements.indexOf(uid);

			if(idx >= 0) {
				selectedAchievements.splice(idx, 1);
			} else {
				selectedAchievements.push(uid);
			}

			this.setState({
				selectedAchievements
			});
		}
	}

	handleConfirmChange = (event) => {
		let checked = event.target.checked;

		this.setState({
			resetAchievements: checked
		});
	}

	getUserActionContent = () => {
		if(this.state.action === 'ban') {
			return (<p className="user-action"><input type="checkbox" onChange={this.handleConfirmChange} checked={this.state.resetAchievements} /> Reset achievements earned?</p>)
		}
	}

	promptAction = (action) => {
		if(action === 'reset') {
			this.setState({
				action,
				promptActive:true,
				promptText: (
					<div>
						<p>{`Are you sure you want to reset ${this.state.selectedMember.name}'s achievements?`}</p>
						<p><strong>{`This action cant be undone!`}</strong></p>
					</div>
				)
			});
		} else if(action === 'ban') {
			this.setState({
				action,
				promptActive: true,
				promptText: (<p>{`Are you sure you want to ban ${this.state.selectedMember.name}?`}</p>)
			});
		} else if(action === 'unban') {
			this.setState({
				action,
				promptActive: true,
				promptText: 'Are you sure you want to unban ' + this.state.selectedMember.name + '?'
			});
		}
	}

	handleConfirm = () => {
		if(this.state.action === 'reset') {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/member/reset', {
				id: this.state.selectedMember.name
			},{
				withCredentials: true
			}).then(res => {
				this.setState({
					action: '',
					promptActive: false,
					promptText: '',
					selectedMember: res.data.member,
					manage: false
				});	
			});
		} else if(this.state.action === 'ban') {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/member/ban', {
				id: this.state.selectedMember.name,
				resetAchievements: this.state.resetAchievements
			},{
				withCredentials: true
			}).then(res => {
				this.setState({
					action: '',
					promptActive:false,
					promptText: '',
					selectedMember: res.data.member,
					manage: false
				});
			})
		} else if(this.state.action === 'unban') {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/member/unban', {
				id: this.state.selectedMember.name
			}, {
				withCredentials: true
			}).then(res => {
				this.setState({
					action: '',
					promptActive:false,
					promptText: '',
					selectedMember: res.data.member,
					manage: false
				});
			})
		}
	}

	handleCancel = () => {
		this.setState({
			action: '',
			promptActive:false,
			promptText: ''
		});
	}

	render() {
		let searchContent, content, loadingContent, panelContent;
		let members = this.state.members;

		let notFound = (
			<div className="directory--no-results">
				<h3>Looks like who you are looking for hasn't joined your channel yet!</h3>
			</div>
		);

		if(Array.isArray(members)) {
			if(members.length > 0) {
				content = (
					<div>
						{members.map((member, index) => (
							<div key={"member." + index} className="member-item" onClick={() => {this.showPanel(member)}}>
								<div className="member-item--logo"><img src={member.logo} /></div>
								<div className="member-item--name">{member.name}</div>
							</div>
						))}
					</div>
				);
			} else {
				content = notFound
			}	
		} else {
			content = (
				<div className="directory--no-results">
					<h3>Start typing above to search for a member!</h3>
				</div>
			)
		}

		if(this.state.loading) {
			loadingContent = (
				<div className="noMask">
					<LoadingSpinner isLoading={this.state.loading} />
				</div>
			);
		}

		let fadeClass = ((this.state.loading) ? ' fading' : '');

		if(!this.state.selectedMember) {
			searchContent = (
				<div className={"channel-directory main-content" + fadeClass}>
					<div className="directory-search">
						<input type="text" onChange={this.filterList} placeholder="Search members..." ref={(el) => {this._search = el}} />
						<LoadingSpinner isLoading={this.state.searching} />
					</div>
					<div className="directory-results">
						<div className="members">
							{content}
						</div>
					</div>
				</div>
			);
		} else {
			let buttonPanel, bottomButtonPanel, confirmPanel, classNames = '';

			if(!this.state.selectedMember.banned) {
				if(this.state.manage) {
					classNames = " member-item--managing";
					buttonPanel = (
						<div className="member-item--buttons">
							<button type="button" onClick={this.handleEditCancel}>Cancel</button>
						</div>
					);

					bottomButtonPanel = (
						<div className="member-item--dangerButtons">
							<button type="button" onClick={() => {this.promptAction("reset")}}>Reset Achievements</button>
							<button type="button" className="ban" onClick={() => {this.promptAction("ban")}}>Ban Member</button>
						</div>
					)
				} else {
					buttonPanel = (
						<div className="member-item--buttons">
							<div className="member-item--button member-item--manage" onClick={() => this.setState({manage: true})}>
								<img alt="Manage Member" src="https://res.cloudinary.com/phirehero/image/upload/v1570582636/settings-black.png" />
							</div>
						</div>
					);
				}
			}

			if(this.state.promptActive) {
				confirmPanel = (
					<ConfirmPanel 
						onConfirm={this.handleConfirm}
						onCancel={this.handleCancel}
					>
						<div>
							{this.state.promptText}
							{this.getUserActionContent()}
						</div>
					</ConfirmPanel>);
			}

			panelContent = (
				<div className={("member-details") + fadeClass + classNames}>
					<button className="back-button" type="button" onClick={this.hidePanel}>Back to Search</button>
					<div className="member-item">
						<div className="member-item--logo"><img src={this.state.selectedMember.logo} /></div>
						<div className="member-item--name">{this.state.selectedMember.name}</div>
						{buttonPanel}
					</div>
					<AchievementTrakerPanel
						member={this.state.selectedMember}
						achievements={this.props.achievements}
						defaultIcon={this.props.channel.icons.default}
						isManage={this.state.manage}
						selectedAchievements={this.state.selectedAchievements}
						handleSelect={this.handleSelect}
						handleUnban={() => {this.promptAction('unban')}}
					/>
					{bottomButtonPanel}
					{confirmPanel}
					<div className="saveReorder--wrapper">
							<button className="saveReorder--button" type="button" onClick={this.handleSave}>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1564251099/save-icon-shadow.png" />
							</button>
						</div>
				</div>
			);
		}

		return (
			<div className="members-panel">
				{searchContent}
				{loadingContent}
				{panelContent}
			</div>
		)
	}

}

/*
	
*/