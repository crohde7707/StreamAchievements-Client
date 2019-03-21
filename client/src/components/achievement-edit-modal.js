import React from 'react';
import axios from 'axios';

import './modal.css';

class AchievementEditModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : ""),
			earnable: ((props.achievement)) ? props.achievement.earnable : false,
			limited: ((props.achievement)) ? props.achievement.limited : false,
			secret: ((props.achievement)) ? props.achievement.secret : false,
			edit: false
		};

	}

	shouldComponentUpdate(nextProps, nextState) {

		if(nextProps.achievement) {

			if ((!this.props.achievement && nextProps.achievement) || (this.props.achievement._id !== nextProps.achievement._id)) {
				
				this.setState({
					title: nextProps.achievement.title,
					description:nextProps.achievement.description,
					icon: nextProps.achievement.icon,
					earnable: nextProps.achievement.earnable,
					limited: nextProps.achievement.limited,
					secret: nextProps.achievement.secret,
					edit: true,
					iconPreview: nextProps.achievement.icon,
					id: nextProps.achievement._id
				});
			}
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

		this.modal.style.top = (winHeight/2) - (this.modal.offsetHeight / 2) + scrollTop + 'px';
		this.modal.style.left = (winWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

	}

	onMaskClick = () => {
		this.setState({
			title: '',
			description: '',
			earnable: false,
			limited: false,
			secret: false,
			iconPreview: '',
			file: '',
			edit: false
		})
		this.props.onClose();
	}

	handleIconChange = (event) => {
		let touched = this.state.touched || {};
		touched['icon'] = true;

		if(event.target.files[0]) {
			
			this.setState({
				iconPreview: URL.createObjectURL(event.target.files[0]),
				file: event.target.files[0],
				touched: touched
			});	
		} else {
			this.setState({
				iconPreview: '',
				file: '',
				touched: touched
			});
		}
		
	}

	handleDataChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let touched = this.state.touched || {};
		touched[name] = true;

		this.setState({
			[name]: value,
			touched: touched
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);

		let achievement = {};

		if(this.state.edit) {
			Object.keys(this.state.touched).forEach((key) => {
				if(this.state.touched[key]) {
				    achievement[key] = this.state[key];
				}
			});
		} else {

			achievement = {
				title: this.state.title,
				description: this.state.description,
				earnable: this.state.earnable,
				limited: this.state.limited,
				secret: this.state.secret,
				iconName: this.state.file.name
			}
		}

		achievement.edit = this.state.edit;
		achievement.id = this.state.id;

		if(this.state.file) {
			var reader  = new FileReader();
			console.log(this.state.file);
			reader.addEventListener("load", () => {
				
		    	achievement.icon = reader.result;
		    	this.sendData(achievement);
		  	}, false);

		  	reader.readAsDataURL(this.state.file);
		} else {
			this.sendData(achievement);
		}
	}

	sendData = (achievement) => {
		console.log(achievement);
		axios.post('/api/achievement/create', achievement).then((res) => {
			console.log(res.data);
			this.props.onSubmit(res.data.achievement);
		});
	}

	render() {

		let content = null;
		let deleteButton = null;

		if (this.props.active) {
			let {title, description, earnable, limited, secret} = this.state;

			if(this.state.edit) {
				deleteButton = (<button type="button" className="delete-achievement-button">Delete</button>);
			}

			content = (
				<div>
					<div className="modal-header">
						<h3>{this.props.title}</h3>
					</div>
					<div className="modal-content">
						<form onSubmit={this.handleSubmit}>
							<div className="formGroup">
								<label htmlFor="achievement-title">Title</label>
								<input
									id="achievement-title"
									name="title"
									className="textInput"
									type="text"
									value={this.state.title}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-description">Description</label>
								<input
									id="achievement-description"
									name="description"
									className="textInput"
									type="text"
									value={this.state.description}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-earnable" title="This achievement can currently be earned">Earnable</label>
								<input 
									id="achievement-earnable"
									name="earnable"
									type="checkbox"
									title="This achievement can currently be earned"
									checked={this.state.earnable}
									onChange={this.handleDataChange}
								/>
								<label htmlFor="achievement-earnable" title="This achievement can only be earned for a limited time" >Limited Time</label>
								<input
									id="achievement-limited"
									name="limited"
									type="checkbox"
									title="This achievement can only be earned for a limited time"
									checked={this.state.limited}
									onChange={this.handleDataChange}
								/>
								<label htmlFor="achievement-secret" title="This achievement will be a secret in your list until someone earns it!">Secret</label>
								<input
									id="achievement-secret"
									name="secret"
									type="checkbox"
									title="This achievement will be a secret in your list until someone earns it!"
									checked={this.state.secret}
									onChange={this.handleDataChange}
								/>
							</div>
							<h4>Icon</h4>
							<div className="formGroup">
								<label htmlFor="achievement-icon">Icon</label>
								<input
			                        type="file"
			                        id="achievement-icon"
			                        accept="image/*"
			                        ref={fileInputEl =>
			                            (this.fileInputEl = fileInputEl)
			                        }
			                        onChange={this.handleIconChange}
			                    />
		                    </div>
		                    <div className="formGroup iconPreview-group">
		                    	<div className="currentIcon">
			                    	<img src={this.state.iconPreview} />
		                    	</div>
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
		                    </div>
		                    <input type="submit" value="Submit" />
		                    {deleteButton}
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