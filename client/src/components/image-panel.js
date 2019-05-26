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

			this.imageModal.style.top = (winHeight/2) - (this.imageModal.offsetHeight) + scrollTop + 'px';
			this.imageModal.style.left = (winWidth / 2) - (this.imageModal.offsetWidth / 2) + 'px';	
	}

	onChange = (event) => {
		this.props.onChange(event).then(res => {
			if(res.error) {
				console.log(res.error);
			}
		});
	}

	chooseImage = (image) => {

	}

	render() {

		let iconGallery, previewImage;
		let icons = this.props.icons;

		if(icons.length > 0) {
			iconGallery = icons.map((image, index) => {

				let classes = "gallery-wrapper";

				if(this.props.currentImage && this.props.currentImage === image.url) {
					classes += " image--selected";
				}

				return (
					<button key={"icon-" + index} type="button" className={classes} onClick={() => {this.chooseImage(image)}}>
						<img alt={image.name} src={image.url} />
					</button>
				);
			});
		} else {
			iconGallery = (<div className="noIcons">No icons have been uploaded!</div>);
		}
            	


		if(this.props.currentImage) {
			previewImage = this.props.currentImage
		} else {
			previewImage = 'https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png' //update with empty image
		}

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
								<img src={previewImage} />
							</div>
							<div className="chooseImage">
								<button type="button" onClick={() => {this.fileInputEl.click()}} className="uploadImageButton">Upload an Image</button>
								<span class="upload--subtext">Image must be 300x300 or less</span>
								<input
							        type="file"
							        id="achievement-icon"
							        accept="image/jpeg, image/png"
							        ref={fileInputEl =>
							            (this.fileInputEl = fileInputEl)
							        }
							        onChange={this.onChange}
							    />
							</div>
						</div>
						<button className="chooseImage--confirm" type="button" onClick={this.props.onConfirm}>Save</button>
						<button type="button" className="chooseImage--cancel" onClick={this.props.onCancel}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}