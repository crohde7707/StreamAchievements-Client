import React from 'react';

import './notice.css';

export default class Notice extends React.Component {

	constructor() {
		super();

		this.state = {
			message: ''
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.message !== this.props.message && this.props.message !== '') {
			this.setState({
				message: this.props.message
			}, () => {
				this.positionNotice();
				this.notice.classList.add('notice--visible');
			});

			setTimeout(() => {

				this.notice.classList.remove('notice--visible');
				setTimeout(() => {
					this.setState({
						message: ''
					});
					this.props.onClear();
				}, 2000);
			}, 3000);
		}
	}

	positionNotice = () => {
		let winWidth = window.innerWidth;

		this.notice.style.top = 60 + 'px';
		this.notice.style.left = (winWidth / 2) - (this.notice.offsetWidth / 2) + 'px';

	}

	render() {
		return (
			<div
				className="notice"
				ref={notice => (this.notice = notice)}
			>
				{this.state.message}
			</div>
		)
	}
}