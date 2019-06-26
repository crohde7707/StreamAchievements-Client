import React from 'react';
import Template from '../components/template';

import './how-to.css';

export default class HowTo extends React.Component {
	
	render() {

		return (
			<Template>
				<div className="main-content howTo">
					<h2 id="#create-achievement">Create an Achievement</h2>
					<div>
						<p>Looks like you are ready to start creating achievements for your community! Well here is a nice step-by-step guide to the achievements page!</p>
						<ol>
							<li className="step-header">Achievement Preview</li>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561578470/achievement-preview.png" />
							<p>The <i>Achievement Preview</i> section is just a nifty preview of what your achievement will look like to the community when it has been created! It will update as you go about providing the information for your achievement!</p>
							<li className="step-header">Achievement Info</li>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561578470/achievement-info.png" />
							<p>The <i>Achievement Info</i> section is where you provide your basic information about your achievement!</p>
								<ul>
									<li><b>Name: </b>The actual name of the achievement</li>
									<li><b>Description: </b>This is where you provide info about the achievement! This is how you lead on your community as to how they can obtain this achievement!</li>
									<li><b>Configuration: </b>These will be your toggles to handle how your achievement behaves!</li>
										<ul>
											<li><b>Earnable: </b>(on by default) Allows you to set if the achievement can currently be earned or not</li>
											<li><b>Limited Time: </b>(off by default) Allows you to show that your achievement can only be earned for a limited time</li>
											<li><b>Secret: </b>(off by default) When a community is viewing your page, the info about the achievement will be hidden, replaced with '???' and your configured hidden icon</li>
										</ul>
								</ul>
							<li className="step-header">Achievement Condition</li>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561578470/achievement-condition.png" />
							<p>The <i>Achievement Condition</i> section is where all the magic happens! Your achievement's criteria will be based on what you choose and configure here!</p>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561578470/achievement-condition-1.png" />
							<ul>
								<li><b>New Sub: </b>The achievement will be awarded when the community member becomes a sub</li>
								<li><b>Resub: </b>The achievement will be awarded for resubscriptiosn, based on the following pieces of information:</li>
									<ul>
										<li><b>Type: </b> Streak (if awarding based on the sub streak) - OR - Total (if awarding based on the total months subbed)</li>
										<li><b>Condition: </b> The number of months</li>
									</ul>
								<li><b>Gifted Sub: </b>The achievement will be awarded for gifted subs, based on the following piece of information:</li>
									<ul>
										<li><b>Condition: </b> The total number of subscriptions gifted in the channel</li>
									</ul>
								<li><b>Manual: </b>The achievement will be awarded only when you award it yourself! This will be done from your dashboard!</li>
								<li><b>Custom: </b><span className="gold">[Gold]</span> The achievement will be awarded based on activity in your chat! See Chat-based Achievements for more information!</li>
							</ul>
							<li className="step-header">Achievement Icon <span className="gold">[Gold]</span></li>
							<p>By default, your achievements will use whatever you have configured for your <span className="highlight">Default Icon</span>! This section will only be visible and useable if you backing at the <span className="gold">Gold</span> level in Patreon!</p>
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1561578470/achievement-icon.png" />
							<p>By clicking on the icon box, you will be able to upload your own image to be used for your achievement! Follow the criteria below for your icons:</p>
								<ul>
									<li>Must be 300x300 pixels or smaller in size</li>
									<li>Must be a png or jpg</li>
									<li>Image is of equal width and height (for best results)</li>
								</ul>
						</ol>
					</div>
				</div>
			</Template>
		)
	}

}