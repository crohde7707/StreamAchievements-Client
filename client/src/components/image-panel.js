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
		console.log(this.imageModal.offsetWidth);
		console.log(this.imageModal.width);
		this.imageModal.style.left = (achievementModal.offsetWidth) - (this.imageModal.offsetWidth) + 'px';	
	}

	render() {

		let iconGallery = (
            	<div className="availableIcons">
            		<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
					<button type="button" class="gallery-wrapper">
				        <img src="https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png" />
					</button>
            	</div>
			)

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
								<button type="button" onClick={() => {this.fileInputEl.click()}} className="uploadImageButton">Upload an Image</button>
								<input
							        type="file"
							        id="achievement-icon"
							        accept="image/*"
							        ref={fileInputEl =>
							            (this.fileInputEl = fileInputEl)
							        }
							        onChange={this.props.onChange}
							    />
								{iconGallery}
							</div>
						</div>
						<button className="chooseImage--confirm" type="button" onClick={this.props.onConfirm}>Save</button>
					</div>
				</div>
			</div>
		)

	}

}