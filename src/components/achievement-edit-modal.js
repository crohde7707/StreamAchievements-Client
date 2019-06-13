import React from 'react';
import axios from 'axios';

import ConfirmPanel from './confirm-panel';
import ImagePanel from './image-panel';
import { build } from '../utils/regex-builder';

import './modal.css';

class AchievementEditModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : ""),
			icon: ((props.achievement) ? props.achievement.icon : ""),
			code: ((props.achievement) ? props.achievement.code : ""),
			resubType: ((props.achievement) ? props.achievement.resubType : "0"),
			query: ((props.achievement) ? props.achievement.query : ""),
			bot: ((props.achievement) ? props.achievement.bot : ""),
			earnable: ((props.achievement)) ? props.achievement.earnable : true,
			limited: ((props.achievement)) ? props.achievement.limited : false,
			secret: ((props.achievement)) ? props.achievement.secret : false,
			iconPreview: ((props.achievement)) ? props.achievement.icon : '',
			id: ((props.achievement)) ? props.achievement._id : '',
			edit: ((props.achievement)) ? true : false,
			showConfirm: false,
			showImagePanel: false
		};

	}

	componentDidMount() {
		this.resizeListener = window.addEventListener('resize', (event) => {
			if(this.resizeID !== null) {
				clearTimeout(this.resizeID);
			}

			this.resizeID = setTimeout(() => {
				this.resizeID = null
				this.positionModal();
			}, 100);
		});

		this.positionModal();
	}

	shouldComponentUpdate(nextProps, nextState) {

		if(nextProps.achievement) {

			if ((!this.props.achievement && nextProps.achievement) || (this.props.achievement._id !== nextProps.achievement._id)) {

				this.setState({
					title: nextProps.achievement.title,
					description:nextProps.achievement.description,
					icon: nextProps.achievement.icon,
					code: nextProps.achievement.code,
					resubType: nextProps.achievement.resubType || "0",
					query: nextProps.achievement.query || "",
					bot: nextProps.achievement.bot || "",
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeListener);
	}

	positionModal = () => {
		if(this.modal) {
			let winWidth = window.innerWidth;
			let winHeight = window.innerHeight;

			let scrollTop = document.documentElement.scrollTop;

			this.modal.style.top = (winHeight/2) - (this.modal.offsetHeight / 2) + scrollTop + 'px';
			this.modal.style.left = (winWidth / 2) - (this.modal.offsetWidth / 2) + 'px';	
		}
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
			edit: false,
			code: "",
			resubType: "0",
			bot: "",
			id: ''
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
		if(this.state.code !== "" && this.state.code !== "0") {

			let conditionContent;
			let helpText;

			switch(this.state.code) {
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
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-bot">Bot Name</label>
								<input
									id="achievement-bot"
									name="bot"
									className="textInput"
									type="text"
									value={this.state.bot}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-query">Message</label>
								<input
									id="achievement-query"
									name="query"
									className="textInput"
									type="text"
									value={this.state.query}
									onChange={this.handleDataChange}
								/>
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
			if(this.state.touched) {
				Object.keys(this.state.touched).forEach((key) => {
					if(this.state.touched[key]) {
					    achievement[key] = this.state[key];
					}
				});	
			} else {
				this.props.onSubmit({
					notice: "No changes made to the \"" + this.state.title + "\" achievement."
				});
			}
			
		} else {

			achievement = {
				title: this.state.title,
				description: this.state.description,
				earnable: this.state.earnable,
				limited: this.state.limited,
				secret: this.state.secret,
				iconName: this.state.file.name,
				code: this.state.code
			};

			debugger;

			if(Number.parseInt(this.state.code) > 0) {
				achievement.query = this.state.query;

				if(this.state.code === "1") {
					achievement.resubType = this.state.resubType;
				}

				if(this.state.code === "4") {
					achievement.bot = this.state.bot
					achievement.query = build(achievement.query);
				}
			}
		}

		achievement.edit = this.state.edit;
		achievement.id = this.state._id;

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

	handleDelete = (event) => {
		this.setState({
			showConfirm:false
		});
		
		axios.post('https://streamachievements.com/api/achievement/delete', {
			achievementID: this.state._id
		}).then(response => {
			let data = {
				notice: "\"" + this.state.title + "\" achievement was deleted successfully!",
				delete: this.state._id
			};

			this.onMaskClick();
			this.props.onSubmit(data);
		});
	}

	sendData = (achievement) => {
		console.log(achievement);
		axios.post('https://streamachievements.com/api/achievement/create', achievement).then((res) => {
			console.log(res.data);
			if(res.data.created) {
				this.onMaskClick();
				console.log(res.data.achievement);
				this.props.onSubmit({
					notice: "\"" + res.data.achievement.title + "\" achievement was created successfully!",
					achievement: res.data.achievement
				});
			} else if(res.data.update) {
				this.onMaskClick();
				this.props.onSubmit({
					notice: "\"" + res.data.achievement.title + "\" was updated successfully!",
					achievement: res.data.achievement
				});
			} else {
				this.setState({
					error: res.data.message
				});
			}
			
		});
	}

	showImagePanel = (event) => {
		this.setState({
			showImagePanel: true
		});
	}

	updateState = (state) => {

	}

	toggleHover = (showHover) => {
		if(showHover) {
			this.hover.classList.add('hoverText--active');
		} else {
			this.hover.classList.remove('hoverText--active');
		}
	}

	render() {

		let content, iconGallery, confirmPanel, imagePanel, imgPreviewContent;
		let deleteButton = null;

		if (this.props.active) {
			let {title, description, earnable, limited, secret} = this.state;

			if(this.state.showConfirm) {
				confirmPanel = (
					<ConfirmPanel
						onConfirm={this.handleDelete}
						onCancel={() => {this.setState({showConfirm: false})}}
					/>
				);
			}

			if(this.state.showImagePanel) {
				imagePanel = (
					<ImagePanel 
						currentImage={this.state.iconPreview}
						onChange={this.handleIconChange}
						onConfirm={() => {this.setState({showImagePanel: false})}}
						onCancel={() => {this.setState({showImagePanel: false})}}
					/>
				);
			}

			if(this.state.edit) {
				deleteButton = (<button type="button" className="delete-achievement-button" onClick={() => {this.setState({showConfirm: true})}}>Delete</button>);
			}

			let customType = (<option title="Unlocked wtih paid tier!" value="4">Custom</option>);

			if(this.state.iconPreview) {
				imgPreviewContent = (<img src={this.state.iconPreview} />);
			} else {
				imgPreviewContent = (<div className="currentIcon--placeholder"></div>);
			}

			content = (
				<div>
					<div className="modal-header">
						<h3>{this.props.title}</h3>
					</div>
					<div className={"modal-error" + ((this.state.error) ? " modal-error--active" : "")}>
						{this.state.error}
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
							<div className="formGroup checkboxes">
								<div className="checkbox">
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
								<div className="checkbox">
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
								<div className="checkbox">
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
							</div>
							<h4>Condition</h4>
							<div className="formGroup">
								<label htmlFor="achievement-code">Type</label>
								<select 
									id="achievement-code"
									name="code"
									className="selectInput"
									title="The code of event that this achievement will be awarded for!"
									onChange={this.handleDataChange}
									value={this.state.code}
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
							<h4 class="noMargin">Icon</h4>
							<div className="formGroup icon-upload">
								<label htmlFor="achievement-icon">Icon</label>
								<div
									className="currentIcon"
									onClick={this.showImagePanel}
									onMouseEnter={() => {this.toggleHover(true)}}
									onMouseLeave={() => {this.toggleHover(false)}}
								>
			                    	{imgPreviewContent}
			                    	<div className="hoverText" ref={hover => (this.hover = hover)}>Click to Edit</div>
		                    	</div>
		                    </div>
		                    <input type="submit" value="Submit" />
		                    {deleteButton}
		                    {confirmPanel}
		                    {imagePanel}
						</form>
					</div>
				</div>		
			);
		}

		let upload = (
			<input
                type="file"
                id="achievement-icon"
                accept="image/*"
                ref={fileInputEl =>
                    (this.fileInputEl = fileInputEl)
                }
                onChange={this.handleIconChange}
            />
		);

		return (
			<div className={((!this.props.active) ? "modal--hidden" : "")}>
				<div onClick={this.onMaskClick} className="modal-mask"></div>
				<div className="modal-container">
					<div id="achievementModal" className="modal" ref={modal => (this.modal = modal)}>
						<a href="javascript:;" onClick={this.onMaskClick}>X</a>
						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default AchievementEditModal;