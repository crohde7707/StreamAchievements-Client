import React from 'react';

import './popover.css';

/* 
	<Popover isActive={state.active} item={channel item} />
*/

export default class Popover extends React.Component {

	constructor() {
		super();

		this.state = {
			active: false,
			anchor: null
		};
	}

	positionPopover = () => {

	}

	componentDidUpdate(prevProps, prevState) {

		if(this.props.active !== this.state.active)
		this.setState({
			active: this.props.active
		})
		this.positionPopover();
	}

	render() {

		let popoverContent;

		if(this.state.active) {

			popoverContent = (
				<div className="popover">
					{this.props.children}
				</div>
			);
		} else {
			popoverContent = null;
		}

		return popoverContent;
	}

}