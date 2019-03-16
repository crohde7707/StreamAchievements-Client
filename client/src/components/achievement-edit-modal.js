import React from 'react';

import './modal.css';

class AchievementEditModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : ""),
			earnable: ((props.achievement)) ? props.achievement.earnable : false,
			limited: ((props.achievement)) ? props.achievement.limited : false
		};

	}

	shouldComponentUpdate(nextProps, nextState) {

		if ((!this.props.achievement && nextProps.achievement) || (this.props.achievement._id !== nextProps.achievement._id)) {
			console.log(nextProps.achievement);
			this.setState({
				title: nextProps.achievement.title,
				description:nextProps.achievement.description,
				file: nextProps.achievement.icon,
				earnable: nextProps.achievement.earnable,
				limited: nextProps.achievement.limited
			});
		}

		if(!this.props.active && nextProps.active) {
			//this.positionModal();
		}

		return true;
	}

	componentDidUpdate(prevProps, prevState) {
		this.positionModal();
	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		console.log(this.modal);

		console.log(this.modal.offsetHeight);
		console.log(this.modal.offsetWidth);

		this.modal.style.top = (winHeight/2) - (this.modal.offsetHeight / 2) + scrollTop + 'px';
		this.modal.style.left = (winWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

	}

	onMaskClick = () => {
		this.props.onClose();
	}

	handleChange = (event) => {
		this.setState({
			file: URL.createObjectURL(event.target.files[0])
		});
	}

	handleTitleChange = (event) => {
		this.setState({
			title: event.target.value
		});
	}

	handleDescriptionChange = (event) => {
		this.setState({
			description: event.target.value
		});
	}

	handleEarnableChange = (event) => {
		this.setState({
			earnable: event.target.value
		});
	}

	handleLimitedChange = (event) => {
		this.setState({
			earnable: event.target.value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
	}

	render() {

		let content = null;

		if (this.props.active) {
			console.log(this.state);
			let {title, description, earnable, limited} = this.state;

			content = (
				<div>
					<div className="modal-header">
						<h3>{this.props.title}</h3>
					</div>
					<div className="modal-content">
						<form onSubmit={this.handleSubmit}>
							<div className="formGroup">
								<label htmlFor="achievement-title">Title</label>
								<input className="textInput" type="text" id="achievement-title" value={title} onChange={this.handleTitleChange}/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-description">Description</label>
								<input className="textInput" type="text" id="achievement-description" value={description} onChange={this.handleDescriptionChange} />
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-earnable" title="This achievement can currently be earned">Earnable</label>
								<input 
									id="achievement-earnable"
									type="checkbox"
									title="This achievement can currently be earned"
									checked={earnable}
									onChange={this.handleEarnableChange}
								/>
								<label htmlFor="achievement-earnable" title="This achievement can only be earned for a limited time" >Limited Time</label>
								<input
									id="achievement-limited"
									type="checkbox"
									title="This achievement can only be earned for a limited time"
									checked={limited}
									onChange={this.handleLimitedChange}
								/>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-secret" title="This achievement will be a secret in your list until someone earns it!">Secret</label>
								<input id="achievement-secret" type="checkbox" title="This achievement will be a secret in your list until someone earns it!" />
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-icon">Icon</label>
								<input
			                        type="file"
			                        id="achievement-icon"
			                        accept="image/*"
			                        ref={fileInputEl =>
			                            (this.fileInputEl = fileInputEl)
			                        }
			                        onChange={this.handleChange}
			                    />
			                    <img src={this.state.file} />
		                    </div>
		                    <input type="submit" value="Submit" />
						</form>
					</div>
				</div>		
			);
		}

		return (
			<div className={((!this.props.active) ? "modal--hidden" : "")}>
				<div onClick={this.onMaskClick} className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={modal => (this.modal = modal)}>
						<a href="javascript:;" onClick={this.onMaskClick}>X</a>
						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default AchievementEditModal;