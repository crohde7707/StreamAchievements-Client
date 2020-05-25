import React from 'react';
import LoadingSpinner from './loading-spinner';

import './logoff-panel.css';

export default class ConfirmPanel extends React.Component {

	componentDidMount() {
		document.body.classList.add('scroll-lock');

		setTimeout(() => {
			window.location.href = `${process.env.REACT_APP_API_DOMAIN}auth/logout`;
		}, 2000)
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

		let header = this.props.header || "Confirm";

		return (
			<div className="confirm-panel logoff-panel">
				<div className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={confirmModal => (this.confirmModal = confirmModal)}>
						<div className="modal-header">
							<h3>Logging Off...</h3>
						</div>
						<div className="modal-content">
							{this.props.children}
							<LoadingSpinner isLoading={true} />
						</div>
					</div>
				</div>
			</div>
		)

	}

}