import React from 'react';

import './confirm-panel.css';

export default class ConfirmPanel extends React.Component {

	componentDidMount() {
		document.body.classList.add('scroll-lock');
	}

	positionModal = () => {
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		this.confirmModal.style.top = (winHeight/2) - (this.confirmModal.offsetHeight) + scrollTop + 'px';
	}

	componentWillUnmount() {
		if(document && document.body) {
			document.body.classList.remove('scroll-lock');
		}
	}

	render() {

		return (
			<div className="confirm-panel">
				<div className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={confirmModal => (this.confirmModal = confirmModal)}>
						<div className="modal-header">
							<h3>Confirm</h3>
						</div>
						<div className="modal-content">
							{this.props.children}
							<button className="confirm-delete-button" onClick={this.props.onConfirm}>Yes</button>
							<button className="cancel-delete-button" onClick={this.props.onCancel}>No</button>
						</div>
					</div>
				</div>
			</div>
		)

	}

}