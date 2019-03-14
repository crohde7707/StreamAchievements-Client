import React from 'react';
import axios from 'axios';

import Template from '../components/template';

class ManageChannel extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
		axios.get('/api/channel/retrieve').then((res) => {
			console.log(res.data);

			if(res.data.error) {
				//redirect to home
			} else {
				this.setState({
					channel: res.data.channel,
					achievements: res.data.achievements
				});	
			}
		});
	}

	render() {

		return (
			<Template>
				<div>ManageChannel</div>
			</Template>
		);
	}
}

export default ManageChannel;