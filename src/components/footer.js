import React from 'react';

import './footer.css';

export default class Footer extends React.Component {

	render() {
		return (
			<div className="footer">
				<div className="footer-content">
					‎© 2019 StreamAchievements. All Rights Reserved.
				</div>
				<div className="footer-content social">
					<a target="_blank" href="https://twitter.com/streamachieve">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/twitter-icon.png" />
					</a>
					<a target="_blank" href="https://discord.gg/xkF35Qj">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/discord-icon.png" />
					</a>
					<a target="_blank" href="https://www.youtube.com/channel/UC06LsnP9p8woHBqwjN_jJtw">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/yt-icon.png" />
					</a>
				</div>
			</div>
		)
	}

}