import React from 'react';
import connector from '../redux/connector';
import Template from '../components/template';
import {Link} from 'react-router-dom';
import './gold-page.css'


const PATREON_URL = 'https://www.patreon.com/streamachievements';

class GoldPage extends React.Component {

	render() {

		return (
			<Template>
				<div className="main-content gold-page">
					<h2 className="gold">Stream Achievements Gold</h2>
					<div className="section">
						<h3>What is Stream Achievements Gold?</h3>
						<p>Stream Achievements Gold is the premium tier of our system that is offered to members and content creators! Through your support, Stream Achievements is able to continue offering its excitement, and bringing more fun and exciting features to your communities!</p>
					</div>
					<div className="section">
						<h3>Why Should I Upgrade?</h3>
						<p>When you upgrade to Gold, you gain access extra features that unlocks the full potential of creating achievements for your community! Along with this, you also get access to a bit of personalization to really let your brand flair through your channel!</p>
					</div>
					<div className="section">
						<h3>What Features Do I Recieve By Becoming a Gold Supporter?</h3>
						<p>Here is a breakdown of all of the features available:</p>
						<div className="feature-table">
							<div className="row row-header">
								<div></div>
								<div>Basic</div>
								<div className="gold">Gold</div>
							</div>
							<div className="row">
								<div>Channel Creation</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Member Rankings</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Stream Overlay</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div className="iconLabel">
									<span>New Follow Achievements</span>
									<img src="https://res.cloudinary.com/phirehero/image/upload/v1574020961/DkF7COjV4AAkWht.png" alt="Streamlabs Chatbot" title="Streamlabs Chatbot" />
								</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div className="iconLabel">
									<span>New Donation Achievements</span>
									<img src="https://res.cloudinary.com/phirehero/image/upload/v1574020961/DkF7COjV4AAkWht.png" alt="Streamlabs Chatbot" title="Streamlabs Chatbot" />
								</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div className="iconLabel">
									<span>New Bits Achievements</span>
									<img src="https://res.cloudinary.com/phirehero/image/upload/v1574020961/DkF7COjV4AAkWht.png" alt="Streamlabs Chatbot" title="Streamlabs Chatbot" />
								</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>New Sub Achievements</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Resub Achievements</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Gifted Sub Achievements</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Manual Achievements</div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Custom Chat-based Achievements</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Custom Default & Hidden Achievement Icons</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Custom Icons for Each Achievement</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Channel Themes (Coming Soon!)</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Icon Gallery (Coming Soon!)</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row row-stripe">
								<div>Sneak Peaks For New Features</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
							<div className="row">
								<div>Votes for Next Added Feature</div>
								<div className="supported"></div>
								<div className="supported"><img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1562860834/checked.png" /></div>
							</div>
						</div>
					</div>
					<div className="section">
						<h3>Cool! How do I join Stream Achievements Gold?</h3>
						<p>The program is currently integrated through Patreon, so all you need to do is followed 2 simple steps:</p>
						<ol>
							<li>Head over to your <Link to="/profile?tab=integration">integrations</Link> within your profile, and link up your Patreon account</li>
							<li>Visit the Patreon page for Stream Achievements and <a href={PATREON_URL}>make your pledge</a> for the gold tier!</li>
							<li>Return to your integrations and hit the sync button, and it will reflect that you are an active patron!</li>
						</ol>
					</div>
					<div className="section">
						<h3>What happens if I cancel my pledge?</h3>
						<p>In the event that your are no longer an active patron, the extra features you had unlocked will be disabled!</p>
						<p>None of the achievements you created will be removed, nor will the images you uploaded! You will just see them greyed out from your channel!</p>
						<p>The moment you become an active patron again, all of these features will be re-enabled for you to use and provide!</p>
					</div>
					<div className="section">
						<h3>I am not a streamer, but I want to show support!</h3>
						<p>First off, thank you for your enthusiasm! If you are looking to just show support, you can also go through <a href={PATREON_URL}>Patreon</a> the same way! Being at the Stream Achievements Gold tier doesn't have to be just for content creators!</p>
					</div>
				</div>
			</Template>
		)

	}

}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(GoldPage);