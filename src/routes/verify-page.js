import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import qs from 'query-string';
import connector from '../redux/connector';
import {updateStatus} from '../redux/profile-reducer';
import { TwitterShareButton } from 'react-twitter-embed';

import Template from '../components/template';

import './verify-page.css';

class VerifyPage extends React.Component {

	constructor() {
		super();

		this.state = {
			expired: false,
			verified: true,
			fetch: false
		}
	}

	componentDidMount() {
		let queries = qs.parse(this.props.location.search);
		if(queries.id && queries['utm_medium'] === 'Email' && fetch) {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/verify', {id: queries.id}, {
				withCredentials: true
			}).then(res => {
				
				if(res.data.expired) {
					this.setState({
						expired: true,
						verified: false,
						fetch: false
					});
				} else if(res.data.verified) {
					if(this.props.profile) {
						this.props.dispatch(updateStatus({status: "verified"}));
					}
					
					this.setState({
						verified: true,
						expired: false,
						fetch: false
					});
				} else {
					this.setState({
						fetch: false
					});
				}
			})
		} else {
			this.props.history.push('/home');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(!prevProps.profile && this.props.profile) {
			if(this.state.verified) {
				this.props.dispatch(updateStatus({status: "verified"}));
			}
		}
	}

	render() {
		let content;

		if(this.state.expired) {
			content = (
				<div className='verify-wrapper'>
					<h2>Whoops! Looks like your link expired!!</h2>
					<p>Do not fear, just make your way back over to <Link to='/channel/create'>Start A Channel</Link> that way we can get another invite sent out for you!</p>
					<p>Just remember, invites expire after 72 hours, so don't forget to check that email!</p>
				</div>
			);
		} else if(this.state.verified) {
			content = (
				<div className='verify-wrapper'>
					<h2>You have been verified!</h2>
					<img className="congrats-icon" src="https://res.cloudinary.com/phirehero/image/upload/v1563800518/congrats.png" />
					<p>You are now ready to start creating those achievmenets for your community to earn!</p>
					<p>Let your community know that you now offer achievements! Click the 'Share on Twitter' button below to inform the masses, or just <strong>@streamachieve</strong> with your own custom message!</p>
					<div className="share">
						<TwitterShareButton
						    url={'https://streamachievements.com/'}
						    options={{
						    	text: 'I was just verified to start offering achievements for our #Twitch community through #StreamAchievements! @streamachieve',
						    	size: 'large'
						    }}
						  />
					</div>
					
					<div className="getting-started">
						{/*<div className="getting-started--choice" onClick={() => this.props.history.push('/dashboard/achievement?tutorial=true')}>
							<h3>Create my First Achievement</h3>
							<h4>Tutorial</h4>
							<p>A step by step process for creating your very first achievement!</p>
						</div>*/}
						<div className="getting-started--choice" onClick={() => this.props.history.replace('/dashboard')}>
							<h3>Take me to my Dashboard</h3>
							{/*<p>Navigates straight to your dashboard, fit for those "Figure it out as I go" types!</p>*/}
						</div>
					</div>
				</div>
			);
		}

		return (
			<Template spinner={{isLoading: this.state.fetch, fullscreen: true}}>
				{content}
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(VerifyPage);