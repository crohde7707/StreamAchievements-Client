import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './routes/home-page';
import LandingPage from './routes/landing-page';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
	<BrowserRouter>
		<App>
			<Switch>
        		<Route path='/' exact component={LandingPage} />
        		<Route path='/home' component={HomePage} />
    		</Switch>
		</App>
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
