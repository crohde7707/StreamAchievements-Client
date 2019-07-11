import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './app';
import HomePage from './routes/home-page';
import ProfilePage from './routes/profile-page';
import LandingPage from './routes/landing-page';
import ChannelPage from './routes/channel-page';
import VerifyPage from './routes/verify-page';
import GoldPage from './routes/gold-page';
import DashboardPage from './routes/dashboard-page';
import AchievementPage from './routes/achievement-page';
import ChannelDirectoryPage from './routes/channel-directory-page';
import CreateChannelPage from './routes/create-channel-page';
import AdminPanelPage from './routes/admin-panel';
import HowTo from './routes/how-to';
import TestListeners from './routes/test-listeners';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const rootElem = document.getElementById('root');

let app = (
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Provider store={store}>
			<App>
				<Switch>
	        		<Route path='/' exact component={LandingPage} />
	        		<Route path='/home' component={HomePage} />
					<Route path='/profile' component={ProfilePage} />
	        		<Route path='/directory' component={ChannelDirectoryPage} />
	        		<Route path='/admin' component={AdminPanelPage} />
	        		<Route path='/dashboard/achievement/:achievementid' component={AchievementPage} />
	        		<Route path='/dashboard/achievement' component={AchievementPage} />
	        		<Route path='/dashboard/' component={DashboardPage} />
	        		<Route path='/channel/verify' component={VerifyPage} />
	        		<Route path='/channel/create' component={CreateChannelPage} />
	        		<Route path='/channel/:channelid' component={ChannelPage} />
	        		<Route path="/gold" component={GoldPage} />
	        		<Route path="/howto" component={HowTo} />
	        		<Route path="/test" component={TestListeners} />
	    		</Switch>
			</App>
		</Provider>
	</BrowserRouter>
);

if(rootElem.hasChildNodes()) {
	hydrate(app, rootElem);
} else {
	render(app, rootElem);
}