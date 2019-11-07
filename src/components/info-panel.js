import React from 'react';

import './info-panel.css';

export default class InfoPanel extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
			<div className="info-panel">
				<div className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={infoModal => (this.infoModal = infoModal)}>
						<div className="modal-header">
							<h3>{this.props.title}</h3>
						</div>
						<div className="modal-content">
							{this.props.children}
							<button className="info-close-button" onClick={this.props.onClose}>Close</button>
						</div>
					</div>
				</div>
			</div>
		)

	}

}