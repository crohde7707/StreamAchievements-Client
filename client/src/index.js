import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './routes/home-page';
import LandingPage from './routes/landing-page';
import ChannelPage from './routes/channel-page';
import TestPage from './routes/test-page';
import ManageChannelPage from './routes/manage-channel';
import ChannelDirectoryPage from './routes/channel-directory-page';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
	        		<Route path='/directory' component={ChannelDirectoryPage} />
	        		<Route path='/channel/:channelid/manage' component={ManageChannelPage} />
	        		<Route path='/channel/:channelid' component={ChannelPage} />
	        		<Route path="/test" component={TestPage} />
	    		</Switch>
			</App>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
