import React from 'react';

import './modal.css';

class Modal extends React.Component {

	onMaskClick = () => {
		this.props.onClose();
	}

	render() {

		let content = null;
		
		if(this.props.active) {
			content = (
				<div>
					<div onClick={this.onMaskClick} className="modal-mask"></div>
					<div className="modal-container">
						<div className="modal">
							<a href="javascript:;" onClick={this.onMaskClick}>X</a>
							<div className="channel-search">
								<h3>Join a Channel</h3>
								<input type="text" />
							</div>
							<div className="channel-results">
								<div className="channel-item">
									<div className="channel-item--logo"><img src="https://static-cdn.jtvnw.net/jtv_user_pictures/694825d9-0ab8-460f-ab9c-8886e26b6563-profile_image-300x300.png" /></div>
									<div className="channel-item--name">phirehero</div>
									<div className="channel--details"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);	
		} 

		return content;
	}
}

export default Modal;