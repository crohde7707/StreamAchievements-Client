import React from 'react';

import './info-panel.css';

export default class InfoPanel extends React.Component {

	render() {

		let buttonText = "Close";

		if(this.props.buttonText) {
			buttonText = this.props.buttonText;
		}

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
							<button type="button" className="info-close-button" onClick={this.props.onClose}>{buttonText}</button>
						</div>
					</div>
				</div>
			</div>
		)

	}

}