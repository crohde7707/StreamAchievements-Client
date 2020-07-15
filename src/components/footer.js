import React from 'react';

import './footer.css';

export default class Footer extends React.Component {

	render() {
		return (
			<div className="footer">
				<div className="footer-content social">
					<a target="blank" href="https://twitter.com/streamachieve">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/twitter-icon.png" />
					</a>
					<a target="blank" href="https://discord.gg/xkF35Qj">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/discord-icon.png" />
					</a>
					<a target="blank" href="https://www.youtube.com/channel/UC06LsnP9p8woHBqwjN_jJtw">
						<img src="https://res.cloudinary.com/phirehero/image/upload/v1563915371/yt-icon.png" />
					</a>
				</div>
				<div className="footer-content copyright">
					‎<span>© 2020 Stream Achievements. All Rights Reserved.</span>
				</div>
				<div className="footer-content legal">
					<a href="/legal/terms-of-use">Terms of Service</a>
					<span>-</span>
					<a href="/legal/privacy-policy">Privacy Policy</a>
					<span>-</span>
					<a href="/legal/cookie-policy">Cookie Policy</a>
				</div>
			</div>
		)
	}

}