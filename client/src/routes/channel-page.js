import React from 'react';
import axios from 'axios';

import Template from '../components/template';

import './channel-page.css';

class ChannelPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			channel: ''
		}
	}

	componentDidMount() {
		//Fetch channel data 

		axios.get('/api/channel/retrieve?id=' + this.props.match.params.channelid).then((res) => {
			console.log(res.data);
			this.setState({
				channel: res.data.channel,
				achievements: res.data.achievements
			});
		});

		window.addEventListener('scroll', this.updateChannelHeader);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.updateChannelHeader);
	}

	updateChannelHeader = () => {
	  if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
	    document.getElementById("channel-header").classList.add('condensed');
	  } else {
	    document.getElementById("channel-header").classList.remove('condensed');
	  }
	}

	render() {

		let content;

		if(this.state.channel) {

			let {name, logo} = this.state.channel;
			let achievements = this.state.achievements;

			content = (
				<Template>
					<div id="channel-header">
						<div className="channel-fav"><img src={require('../img/star-not-favorited.png')} /></div>
						<div className="channel-logo">
							<img src={logo} />
						</div>
						<div className="channel-info">
							<div className="channel-name">{name}</div>
							<div className="channel-description"></div>
						</div>
						<div className="channel-achievement-progress">0 / {achievements.length}</div>
						<div className="channel-buttons">
							<button className="join">Join Channel</button>
						</div>
					</div>
					<div className="achievements-container">
						{achievements.map((achievement, index) => (
							<div key={'achievement-' + index} className="achievement">
								<div className="achievement-logo"></div>
								<div className="achievement-info">
									<div className="achievement-title">{achievement.title}</div>
									<div className="achievement-description">{achievement.description}</div>
								</div>
							</div>
						))}
						
					</div>
				</Template>
			);
		} else {
			content = (<Template>Loading channel information...</Template>);
		}

		return content;
	}
}

export default ChannelPage;