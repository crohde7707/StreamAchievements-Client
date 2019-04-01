import React from 'react';

export default class ConfirmPanel extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
		this.positionModal();
	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;
		let achievementModal = document.getElementById('achievementModal');

		this.confirmModal.style.top = (achievementModal.offsetHeight / 2) - (this.confirmModal.offsetHeight / 2) + 'px';
		//this.confirmModal.style.top = (winHeight/4) + scrollTop + 'px';
		//this.confirmModal.style.left = (winWidth / 2) - (this.confirmModal.offsetWidth / 2) + 'px';
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
							<p>Are you sure you want to delete?</p>
							<button className="delete-achievement-button" onClick={this.props.onConfirm}>Yes</button>
							<button onClick={this.props.onCancel}>No</button>
						</div>
					</div>
				</div>
			</div>
		)

	}

}