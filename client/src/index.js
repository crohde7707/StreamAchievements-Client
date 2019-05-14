import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './routes/home-page';
import ProfilePage from './routes/profile-page';
import LandingPage from './routes/landing-page';
import ChannelPage from './routes/channel-page';
import TestPage from './routes/test-page';
import ManageChannelPage from './routes/manage-channel';
import AchievementPage from './routes/achievement-page';
import ChannelDirectoryPage from './routes/channel-directory-page';
import CreateChannelPage from './routes/create-channel-page';
import AdminPanelPage from './routes/admin-panel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
	<BrowserRouter>
		<Provider store={store}>
			<App>
				<Switch>
	        		<Route path='/' exact component={LandingPage} />
	        		<Route path='/home' component={HomePage} />
					<Route path='/profile' component={ProfilePage} />
	        		<Route path='/directory' component={ChannelDirectoryPage} />
	        		<Route path='/admin' component={AdminPanelPage} />
	        		<Route path='/manage/:channelid/achievement/:achievementid' component={AchievementPage} />
	        		<Route path='/manage/:channelid/achievement' component={AchievementPage} />
	        		<Route path='/manage/:channelid/' component={ManageChannelPage} />
	        		<Route path='/channel/create' component={CreateChannelPage} />
	        		<Route path='/channel/:channelid' component={ChannelPage} />
	        		<Route path="/test" component={TestPage} />
	    		</Switch>
			</App>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'));
