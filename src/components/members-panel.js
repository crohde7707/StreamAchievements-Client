import React from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';

// import './members-panel.css';

export default class MembersPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			members: props.members,
			offset: props.offset,
			fetching: false
		};

		if(props.offset !== -1) {
			this._checkToLoad = throttle(this.checkToLoad, 200);
			window.addEventListener('scroll', this._checkToLoad);
		}
	}



	checkToLoad = () => {
		let height = document.documentElement.scrollHeight;
		let top = document.documentElement.scrollTop;
		let bodyTop = document.body.scrollTop;

		this._loadMore = this._loadMore || document.getElementById('load-more-channels');

		let loadTop = this._loadMore.getBoundingClientRect().top + window.pageYOffset;
		let windowHeight = window.innerHeight + window.scrollY;
		console.log(loadTop);
		console.log(windowHeight);
		if(loadTop - windowHeight <= 50) {
			
			if(!this.state.fetching) {
				this.retrieveMoreMembers(this.state.offset);
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._checkToLoad);
	}

	retrieveMoreMembers = (offset) => {
		
		if(offset !== -1 & !this.state.fetching) {
			this.setState({
				fetching: true
			});
			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/member/retrieve', {
				params: {
					offset: this.state.offset
				},
				withCredentials: true
			}).then(res => {
				console.log(res.data);
				let updateMemberArray = this.state.members.concat(res.data.members);

				if(res.data.offset === -1) {
					//no more to retrieve, remove functionality
					window.removeEventListener('scroll', this._checkToLoad);
				}

				this.setState({
					members: updateMemberArray,
					offset: res.data.offset,
					fetching: false
				});
			})
		}
	}

	render() {

		let loadMore;

		if(this.state.offset !== -1) {
			loadMore = (<div id="load-more-channels"></div>);
		}

		return (
			<div className="members-panel">
				{!this.props.isMod && this.state.members.map((member, index) => (
					<div key={'member-' + index} className={"channelMember" + ((index % 2 === 1) ? " channelMember--stripe" : "")}>
						<div className="member-logo">
							<img alt="" src={member.logo} />
						</div>
						<div className="member-info">
							{member.name}
						</div>
					</div>
				))}
				{loadMore}
			</div>
		)
	}

}