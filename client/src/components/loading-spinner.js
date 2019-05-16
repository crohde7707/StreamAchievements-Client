import React from 'react';

import './loading-spinner.css';

export default class LoadingSpinner extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let classes = 'loading-spinner';

		if(this.props.full) {
			classes += ' loading-spinner--full';
		}

		if(this.props.isLoading) {
			classes += ' loading-spinner--active';
		}

		return (
			<div className={classes}>
				<div className="loading-spinner--wrapper">
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		);
		
	}
}