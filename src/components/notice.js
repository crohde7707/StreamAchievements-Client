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
				
				setTimeout(() => {
					if(this.notice) {
						this.notice.classList.add('notice--visible');
					}
				}, 500)
				
			});

			setTimeout(() => {

				if(this.notice) {
					this.notice.classList.remove('notice--visible');
				}
				setTimeout(() => {
					this.setState({
						message: ''
					});
					this.props.onClear();
				}, 2500);
			}, 3500);
		}
	}

	render() {
		return (
			<div
				className="notice--wrapper"
				ref={notice => (this.notice = notice)}
			>
				<div className="notice">
					{this.state.message}
				</div>
			</div>
		)
	}
}