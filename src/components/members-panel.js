import React from 'react';
import axios from 'axios';
import io from "socket.io-client";

import LoadingSpinner from './loading-spinner';
import AchievementTrakerPanel from './achievement-tracker-panel';

import './members-panel.css';

export default class MembersPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			members: "",
			searching: false,
			selectedMember: undefined,
			loading: false
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
			this.setState({
				loading: false,
				members: "",
				selectedMember: member
			});
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
							<div key={"member." + index} className="channel-item" onClick={() => {this.showPanel(member)}}>
								<div className="channel-item--logo"><img src={member.logo} /></div>
								<div className="channel-item--name">{member.name}</div>
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
			panelContent = (
				<div className={("member-details") + fadeClass}>
					<button className="back-button" type="button" onClick={this.hidePanel}>Back to Search</button>
					<div className="channel-item">
						<div className="channel-item--logo"><img src={this.state.selectedMember.logo} /></div>
						<div className="channel-item--name">{this.state.selectedMember.name}</div>
					</div>
					<AchievementTrakerPanel
									member={this.state.selectedMember}
									achievements={this.props.achievements}
									defaultIcon={this.props.channel.icons.default}
								/>
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