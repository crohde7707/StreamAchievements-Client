import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app';
//Routes
import HomePage from './routes/home-page';
import ProfilePage from './routes/profile-page';
import LandingPage from './routes/landing-page';
import LinkPage from './routes/link-page';
import ChannelPage from './routes/channel-page';
import VerifyPage from './routes/verify-page';
import GoldPage from './routes/gold-page';
import DashboardPage from './routes/dashboard-page';
import AchievementPage from './routes/achievement-page';
import ChannelDirectoryPage from './routes/channel-directory-page';
import CreateChannelPage from './routes/create-channel-page';
import AdminPanelPage from './routes/admin-panel';
import ModPage from './routes/mod-page';
import LegalTermsPage from './routes/terms-of-use-page';
import LegalPrivacyPage from './routes/privacy-policy-page';
import LegalCookiePage from './routes/cookie-policy-page';
import OverlayPanel from './routes/overlay-panel';
import TestListeners from './routes/test-listeners';
import SubscriptionPage from './routes/subscription-page';

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
	        		<Route path='/link' component={LinkPage} />
	        		<Route key='owner-edit-achievement' path='/dashboard/achievement/:achievementid' component={AchievementPage} />
	        		<Route key='mod-edit-achievement' path='/mod/:channelid/achievement/:achievementid' component={AchievementPage} />
	        		<Route key='owner-achievement' path='/dashboard/achievement' component={AchievementPage} />
	        		<Route key='mod-achievement' path='/mod/:channelid/achievement' component={AchievementPage} />
	        		<Route key='owner-dashboard' path='/dashboard/' component={DashboardPage} />
	        		<Route key='mod-dashboard' path='/mod/:channelid' component={DashboardPage} />
	        		<Route path='/mod/' component={ModPage} />
	        		<Route path='/channel/verify' component={VerifyPage} />
	        		<Route path='/channel/create' component={CreateChannelPage} />
	        		<Route path='/channel/:platform/:channelid' component={ChannelPage} />
	        		<Route path='/channel/:channelid' component={ChannelPage} />
	        		<Route path="/gold/subscription" component={SubscriptionPage} />
	        		<Route path="/gold" component={GoldPage} />
	        		<Route path="/test" component={TestListeners} />
	        		<Route path="/overlay/:uid" component={OverlayPanel} />
	        		<Route path="/overlay" component={OverlayPanel} />
	        		<Route path="/legal/terms-of-use" component={LegalTermsPage} />
	        		<Route path="/legal/privacy-policy" component={LegalPrivacyPage} />
	        		<Route path="/legal/cookie-policy" component={LegalCookiePage} />
	        		<Route component={LandingPage} />
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