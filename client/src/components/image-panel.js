import React from 'react';

export default class ImagePanel extends React.Component {

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

		this.imageModal.style.top = (achievementModal.offsetHeight / 2) - (this.imageModal.offsetHeight / 2) + 'px';
	}

	render() {

		return (
			<div className="image-panel">
				<div className="modal-mask" onClick={() => {this.props.onCancel()}}></div>
				<div className="modal-container">
					<div className="modal" ref={imageModal => (this.imageModal = imageModal)}>
						<div className="modal-header">
							<h3>Choose Your Icon</h3>
						</div>
						<div className="modal-content chooseImage--wrapper">
							<div className="currentImage">
								<h4>Current Image</h4>
								<img src={this.props.currentImage} />
							</div>
							<div className="chooseImage">

							</div>
						</div>
					</div>
				</div>
			</div>
		)

	}

}