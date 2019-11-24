import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

import './app.css';

class App extends Component {

  render() {

    return (
      		<div>
      			<Helmet>
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@streamachieve" />
              <meta name="twitter:creator" content="@phirehero" />
              <meta name="twitter:title" content="Stream Achievements" />
              <meta name="twitter:description" content="Looking to add a bit more fun and flair to your Twitch channel? Why not add some achievements for your community to earn as they engage with your stream! Check out Stream Achievements today!" />
              <meta name="twitter:image" content="https://res.cloudinary.com/phirehero/image/upload/v1563584378/twitter-card-2.png" />
              <meta property="og:type" content="website" />
      				<title>Stream Achievements</title>
      				<link rel="canonical" href="https://streamachievements.com" />
      			</Helmet>
            	{this.props.children}
        	</div>
    );
  }
}

export default App;
