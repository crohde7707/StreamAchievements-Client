import React from 'react';

export default class ImagePanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			originalImage: this.props.currentImage,
			removeImage: false
		}
	}

	onChange = (event) => {
		this.props.onChange(event).then(res => {
			if(res.error) {
				console.log(res.error);
			}
		});
	}

	handleSave = () => {
		if(this.props.currentImage !== this.state.originalImage || this.state.removeImage) {
			this.props.onConfirm(this.state.removeImage);
		} else {
			this.props.onCancel();
		}
	}

	handleCancel = () => {
		if(this.props.currentImage === this.state.originalImage) {
			this.props.onCancel();
		} else {
			this.props.onCancel(this.state.originalImage);
		}
	}

	removeImage = () => {
		this.setState({
			removeImage: true
		});
	}

	render() {

		let iconGallery, previewImage, removeImageButton;
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
            	
		if(this.props.currentImage && !this.state.removeImage) {
			previewImage = this.props.currentImage;
			removeImageButton = (<button className="remove-image-button" type="button" onClick={this.removeImage}>Remove Image</button>);
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
								<span className="upload--subtext">Image must be 300x300 or less</span>
								<input
							        type="file"
							        id="achievement-icon"
							        accept="image/jpeg, image/png, image/gif"
							        ref={fileInputEl =>
							            (this.fileInputEl = fileInputEl)
							        }
							        onChange={this.onChange}
							    />
							    {removeImageButton}
							</div>
						</div>
						<button className="chooseImage--confirm" type="button" onClick={this.handleSave}>Save</button>
						<button type="button" className="chooseImage--cancel" onClick={this.handleCancel}>Cancel</button>
					</div>
				</div>
			</div>
		)

	}

}