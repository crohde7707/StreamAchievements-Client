import React from 'react';
import connector from '../redux/connector';


import Template from '../components/template';

class SupportPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Template>
				Support
			</Template>
		)

	}

}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(SupportPage);