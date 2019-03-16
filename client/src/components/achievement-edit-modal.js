import React from 'react';

import './modal.css';

class AchievementEditModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : "")
		};

	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.props.achievement && nextProps.achievement) {
			this.setState({
				title: nextProps.achievement.title,
				description:nextProps.achievement.description,
				file: nextProps.achievement.icon
			});
		}

		return true;
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

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
	}

	render() {

		let content = null;

		if (this.props.active) {

			let {title, description} = this.state;

			content = (
				<div>
					<div onClick={this.onMaskClick} className="modal-mask"></div>
					<div className="modal-container">
						<div className="modal">
							<a href="javascript:;" onClick={this.onMaskClick}>X</a>
							<div className="modal-header">
								<h3>{this.props.title}</h3>
							</div>
							<div className="modal-content">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="achievement-title">Title</label>
									<input type="text" id="achievement-title" value={title} onChange={this.handleTitleChange}/>
									<label htmlFor="achievement-description">Description</label>
									<input type="text" id="achievement-description" value={description} onChange={this.handleDescriptionChange} />
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
				                    <input type="submit" value="Submit" />
								</form>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return content;
	}
}

export default AchievementEditModal;