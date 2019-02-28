import React from 'react';
import axios from 'axios';

import Header from '../components/header';

export default class HomePage extends React.Component {

	render() {
		return (
			<div>
				<Header title="Landing Page" />
				<div>
					This is my content
				</div>
			</div>
		);
	}
}