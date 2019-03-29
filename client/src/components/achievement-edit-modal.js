import React from 'react';
import axios from 'axios';

import './modal.css';

class AchievementEditModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : ""),
			type: ((props.achievement) ? props.achievement.type : ""),
			query: ((props.achievement) ? props.achievement.query : ""),
			earnable: ((props.achievement)) ? props.achievement.earnable : true,
			limited: ((props.achievement)) ? props.achievement.limited : false,
			secret: ((props.achievement)) ? props.achievement.secret : false,
			edit: false,
			modalPositioned: false
		};

	}

	shouldComponentUpdate(nextProps, nextState) {

		if(nextProps.achievement) {

			if ((!this.props.achievement && nextProps.achievement) || (this.props.achievement._id !== nextProps.achievement._id)) {
				
				this.setState({
					title: nextProps.achievement.title,
					description:nextProps.achievement.description,
					icon: nextProps.achievement.icon,
					type: nextProps.achievement.title,
					query: nextProps.achievement.query,
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
		if(!this.state.modalPositioned) {
			this.positionModal();	
		}
	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		this.modal.style.top = (winHeight/2) - (this.modal.offsetHeight / 2) + scrollTop + 'px';
		this.modal.style.left = (winWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

		this.setState({
			modalPositioned: true
		});

	}

	onMaskClick = () => {
		this.setState({
			title: '',
			description: '',
			type: '',
			query: '',
			earnable: true,
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

	getConditionContent = () => {
		if(this.state.type !== "" && this.state.type !== "0") {

			let conditionContent;
			let helpText;

			switch(this.state.type) {
				case "1":
					if(this.state.resubType) {
						if(this.state.resubType === "0") {
							helpText = "Number of months viewer has kept a streak";
						} else {
							helpText = "Number of months a viewer has subbed altogether";
						}
					} else {
						helpText = "Number of months viewer has kept a streak";
					}

					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="resubType">Resub Type</label>
								<select 
									id="resubType"
									name="resubType"
									className="selectInput"
									onChange={this.handleDataChange}
								>
									<option value="0">Streak</option>
									<option value="1">Total</option>
								</select>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-query">Condition</label>
								<input
									id="achievement-query"
									name="query"
									className="textInput"
									type="text"
									value={this.state.query}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="helpText">
								{helpText}
							</div>
						</div>
					);
					break;
				case "2":
					//Gifted Sub
					helpText = "Total number of gifted subs (defaults to 1)";
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-query">Condition</label>
								<input
									id="achievement-query"
									name="query"
									className="textInput"
									type="text"
									value={this.state.query}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="helpText">
								{helpText}
							</div>
						</div>
					);
					break;
				case "3":
					//Raid
					helpText = "Total raids from the viewer (defaults to 1)";
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-query">Condition</label>
								<input
									id="achievement-query"
									name="query"
									className="textInput"
									type="text"
									value={this.state.query}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="helpText">
								{helpText}
							</div>
						</div>
					);
					break;
				case "4":
					//Custom
					conditionContent = (
						<div className="formGroup">
							<label htmlFor="achievement-query">Condition</label>
							<input
								id="achievement-query"
								name="query"
								className="textInput"
								type="text"
								value={this.state.query}
								onChange={this.handleDataChange}
							/>
						</div>
					);
					break;
			}

			return conditionContent;
		}

		return null;
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

		let content, iconGallery;
		let deleteButton = null;

		if (this.props.active) {
			let {title, description, earnable, limited, secret} = this.state;

			if(this.state.edit) {
				deleteButton = (<button type="button" className="delete-achievement-button">Delete</button>);
			}

			iconGallery = (
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

			let customType = (<option disabled title="Unlocked wtih paid tier!" value="4">Custom</option>);

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
								<div>
									<input 
										id="achievement-earnable"
										name="earnable"
										type="checkbox"
										title="This achievement can currently be earned"
										checked={this.state.earnable}
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-earnable" title="This achievement can only be earned for a limited time" >Limited Time</label>
								<div>
									<input
										id="achievement-limited"
										name="limited"
										type="checkbox"
										title="This achievement can only be earned for a limited time"
										checked={this.state.limited}
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-secret" title="This achievement will be a secret in your list until someone earns it!">Secret</label>
								<div>
									<input
										id="achievement-secret"
										name="secret"
										type="checkbox"
										title="This achievement will be a secret in your list until someone earns it!"
										checked={this.state.secret}
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
							<h4>Condition</h4>
							<div className="formGroup">
								<label htmlFor="achievement-type">Type</label>
								<select 
									id="achievement-type"
									name="type"
									className="selectInput"
									title="The type of event that this achievement will be awarded for!"
									onChange={this.handleDataChange}
								>
									<option value=""></option>
									<option value="0">New Sub</option>
									<option value="1">Resub</option>
									<option value="2">Gifted Sub</option>
									<option value="3">Raid</option>
									{customType}
								</select>
							</div>
							{this.getConditionContent()}
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