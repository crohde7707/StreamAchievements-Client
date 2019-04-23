import React from 'react';
import axios from 'axios';

import Template from '../components/template';
import Achievement from '../components/achievement';
import Notice from '../components/notice';
import ConfirmPanel from '../components/confirm-panel';
import ImagePanel from '../components/image-panel';
import connector from '../redux/connector';

import './achievement-page.css';

class AchievementPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: "",
			description: "",
			icon: "",
			code: "",
			resubType: "0",
			query: "",
			bot: "",
			earnable: true,
			limited: false,
			secret: false,
			iconPreview: '',
			id: '',
			edit: false,
			showConfirm: false,
			showImagePanel: false
		};
	}

	componentDidMount() {
		console.log(this.props.profile);
		if(this.props.match.params.achievementid) {
			axios.get('/api/achievement/retrieve?id=' + this.props.match.params.channelid + '&aid=' + this.props.match.params.achievementid).then((res) => {
				console.log(res.data);

				if(res.data.error) {
					//redirect to home
				} else {

					this.setState({
						originalAchievement: res.data.achievement,
						...res.data.achievement,
						iconPreview: res.data.achievement.icon,
						edit: true
					});
				}
			});
		}
	}

	revert = () => {
		let originalAchievement = this.state.originalAchievement;

		if(originalAchievement) {
			this.setState({
				...originalAchievement,
				iconPreview: originalAchievement.icon,
				touched: {}
			});	
		} else {
			this.setState({
				title: "",
				description: "",
				icon: "",
				code: "",
				resubType: "0",
				query: "",
				bot: "",
				earnable: true,
				limited: false,
				secret: false,
				iconPreview: '',
				id: '',
				edit: false,
				showConfirm: false,
				showImagePanel: false
			});
		}
		
	}

	handleIconChange = (event) => {
		let touched = this.state.touched || {};
		touched['icon'] = true;

		if(event.target.files[0]) {
			let preview = URL.createObjectURL(event.target.files[0]);
			this.setState({
				icon: preview,
				iconPreview: preview,
				file: event.target.files[0],
				touched: touched
			});	
		} else {
			this.setState({
				icon: '',
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

		let stateUpdate = {
			[name]: value,
			touched
		};

		if(name === "code") {
			stateUpdate.touched['query'] = true;
			stateUpdate.query = '';
		}



		this.setState(stateUpdate);
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

		let achievement = {};

		if(this.state.edit) {
			if(this.state.touched) {
				Object.keys(this.state.touched).forEach((key) => {
					if(this.state.touched[key]) {
					    achievement[key] = this.state[key];
					}
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

			if(this.state.code !== '0') {
				achievement.query = this.state.query;

				if(this.state.code === "1") {
					achievement.resubType = this.state.resubType;
				}

				if(this.state.code === "4") {
					achievement.bot = this.state.bot
				}
			}
		}

		achievement.edit = this.state.edit;
		achievement.id = this.state._id;

		if(this.state.file) {
			var reader  = new FileReader();
			
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
		
		axios.post('/api/achievement/delete', {
			achievementID: this.state._id
		}).then(response => {
			let data = {
				notice: "\"" + this.state.title + "\" achievement was deleted successfully!",
				delete: this.state._id
			};

			this.props.history.push('/manage/' + this.props.profile.username);
			//redirect to manage-channel#achievements
		});
	}

	sendData = (achievement) => {
		console.log(achievement);
		axios.post('/api/achievement/create', achievement).then((res) => {
			console.log(res.data);
			if(res.data.created) {
				//redirect to manage-channel#achievements

			} else if(res.data.update) {
				//redirect to manage-channel#achievements
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
				deleteButton = (
					<img
						className="delete-achievement-button"
						onClick={() => {this.setState({showConfirm: true})}}
						src={require('../img/trash-white.png')}
					/>
				);
				//deleteButton = (<button type="button" className="delete-achievement-button" onClick={() => {this.setState({showConfirm: true})}}>Delete</button>);
			}

			let customType = (<option title="Unlocked wtih paid tier!" value="4">Custom</option>);

			if(this.state.iconPreview) {
				imgPreviewContent = (<img src={this.state.iconPreview} />);
			} else {
				imgPreviewContent = (<div className="currentIcon--placeholder"></div>);
			}

			let pageHeader = "Create Achievement";

			if(this.props.match.params.achievementid) {
				pageHeader = "Edit Achievement";
			}

			content = (
				<Template>
					<div className="achievement-wrapper">
						<div className="achievementPage-header">
							<h2>{pageHeader}</h2>
							<span>{deleteButton}</span>
						</div>
						<div className={"modal-error" + ((this.state.error) ? " modal-error--active" : "")}>
							{this.state.error}
						</div>
						<h4>Achievement Preview</h4>
						<div className="achievement-preview">
							<Achievement earned={true} achievement={this.state} />
						</div>
						<h4>Achievement Info</h4>
						<form onSubmit={this.handleSubmit}>
							<div className="formGroup">
								<label htmlFor="achievement-title">Name</label>
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
								<label>Configuration</label>
								<div className="checkboxes">
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
										<label htmlFor="achievement-limited" title="This achievement can only be earned for a limited time" >Limited Time</label>
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
							</div>
							<h4>Condition</h4>
							<div className="formGroup">
								<label htmlFor="achievement-code">Type of Achievement</label>
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
		                    <input type="submit" value="Save" />
		                    <div className="button-bank">
			                    <button type="button" className="achievement-button" onClick={() => {this.revert();}}>Reset</button>
			                    <button type="button" className="achievement-button cancel-achievement-button" onClick={() => {this.props.history.push('/manage/' + this.props.profile.username);}}>Cancel</button>
		                    </div>
		                    {confirmPanel}
		                    {imagePanel}
						</form>
					</div>
				</Template>		
			);

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

		return (content);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(AchievementPage);