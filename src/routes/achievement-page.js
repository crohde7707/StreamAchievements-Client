import React from 'react';
import axios from 'axios';

import Template from '../components/template';
import Achievement from '../components/achievement';
import Notice from '../components/notice';
import ConfirmPanel from '../components/confirm-panel';
import ImagePanel from '../components/image-panel';
import connector from '../redux/connector';
import LoadingSpinner from '../components/loading-spinner';

import './achievement-page.css';

class AchievementPage extends React.Component {

	constructor(props) {
		console.log('constructor');
		super(props);

		this.state = {
			fetch: true,
			title: "",
			description: "",
			icon: "",
			code: "",
			resubType: "0",
			query: "",
			bot: "",
			condition: "",
			earnable: true,
			limited: false,
			secret: false,
			iconPreview: '',
			id: '',
			edit: false,
			showConfirm: false,
			showImagePanel: false,
			defaultIcons: {}
		};

		if(props.profile) {
			this.fetchData();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		//debugger;
		if(this.state.fetch && !this.props.profile && nextProps.profile) {

			this.fetchData();
		}

		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('componentWillUpdate');
	}

	componentWillUnmount() {
		console.log('unmount');
	}

	fetchData = () => {
		if(this.props.match.params.achievementid) {
			axios.get('https://streamachievements.com/api/achievement/retrieve?aid=' + this.props.match.params.achievementid).then((res) => {
				if(res.data.error) {
					//redirect to home
				} else {

					this.setState({
						originalAchievement: res.data.achievement,
						...res.data.achievement,
						iconPreview: res.data.achievement.icon,
						icons: res.data.images,
						defaultIcons: res.data.defaultIcons,
						fetch: false,
						edit: true
					});
				}
			});
		} else {
			axios.get('https://streamachievements.com/api/achievement/icons').then(res => {
				this.setState({
					icons: res.data.images,
					defaultIcons: res.data.defaultIcons,
					fetch: false
				});
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
				condition: "",
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

		return new Promise((resolve, reject) => {
			if(event.target.files[0]) {
				let file = event.target.files[0];
				let preview = URL.createObjectURL(file);
				console.log(event.target);
				var img = new Image();
	       		img.src = preview;

		        img.onload = () => {
		            var width = img.naturalWidth, height = img.naturalHeight;
		            window.URL.revokeObjectURL( img.src );
		            if( width <= 300 && height <= 300 ) {
		            	let touched = this.state.touched || {};
						touched['icon'] = true;
						touched['file'] = true;
						touched['iconName'] = true;
						touched['iconPreview'] = true;

						let newPreview = URL.createObjectURL(file);
		                
		                this.setState({
		                	icon: newPreview,
		                	iconPreview: newPreview,
							iconName: file.name,
		                	file: file,
		                	touched: touched
		                });

						resolve({error: null});

		            } else { 
		                resolve({
		                	error: 'Icon needs to be less than 300x300'
		                });
		            } 
		        };


			} else {
				let touched = this.state.touched || {};
				touched['icon'] = true;
				
				this.setState({
					icon: '',
					iconPreview: '',
					file: '',
					touched: touched
				});

				resolve({error: null});
			}
		});
		
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
								<label htmlFor="achievement-condition">Condition</label>
								<input
									id="achievement-condition"
									name="condition"
									className="textInput"
									type="text"
									value={this.state.condition}
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
				iconName: (this.state.file) ? this.state.file.name : '',
				code: this.state.code
			};

			if(this.state.code !== '0') {
				achievement.query = this.state.query;

				if(this.state.code === "1") {
					achievement.resubType = this.state.resubType;
				}

				if(this.state.code === "4") {
					achievement.bot = this.state.bot;
					achievement.condition = this.state.condition;
				}
			}
		}

		achievement.id = this.state._id;

		if(this.state.file && this.state.file != '') {
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
		
		axios.post('https://streamachievements.com/api/achievement/delete', {
			achievementID: this.state._id
		}).then(response => {
			let data = {
				notice: "\"" + this.state.title + "\" achievement was deleted successfully!",
				delete: this.state._id
			};

			this.props.history.push('/manage/' + this.props.profile.username + '?tab=achievements');
			//redirect to manage-channel#achievements
		});
	}

	sendData = (achievement) => {
		console.log(achievement);
		let api = 'https://streamachievements.com/api/achievement/create';

		if(this.state.edit) {
			api = 'https://streamachievements.com/api/achievement/update';
		}

		axios.post(api, achievement).then((res) => {
			
			if(res.data.created || res.data.update) {
				//redirect to manage-channel#achievements
				this.clearState();
				this.props.history.push('/manage/?tab=achievements');
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

	toggleHover = (showHover) => {
		if(showHover) {
			this.hover.classList.add('hoverText--active');
		} else {
			this.hover.classList.remove('hoverText--active');
		}
	}

	clearState = () => {
		this.setState({
			fetched: false,
			title: "",
			description: "",
			icon: "",
			code: "",
			resubType: "0",
			query: "",
			bot: "",
			condition: "",
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

	render() {

		let content, iconGallery, confirmPanel, imagePanel, imgPreviewContent, iconSection;
		let deleteButton = null;

			let {title, description, earnable, limited, secret} = this.state;

			if(this.state.showConfirm) {
				confirmPanel = (
					<ConfirmPanel
						onConfirm={this.handleDelete}
						onCancel={() => {this.setState({showConfirm: false})}}
					>
						<div>Are you sure you want to delete this achievement?</div>
					</ConfirmPanel>
				);
			}

			if(this.state.showImagePanel) {
				imagePanel = (
					<ImagePanel 
						currentImage={this.state.iconPreview}
						icons={this.state.icons}
						onChange={this.handleIconChange}
						onConfirm={() => {this.setState({showImagePanel: false})}}
						onCancel={() => {this.setState({showImagePanel: false})}}
					/>
				);
			} else {
				imagePanel = undefined;
			}

			if(this.state.edit) {
				deleteButton = (
					<img
						className="delete-achievement-button"
						onClick={() => {this.setState({showConfirm: true})}}
						src={require('../img/trash-white.png')}
					/>
				);
			}

			let customType;

			if(this.state.iconPreview) {
				imgPreviewContent = (<img src={this.state.iconPreview} />);
			} else {
				imgPreviewContent = (<div className="currentIcon--placeholder"></div>);
			}
			
			if(this.props.patreon && this.props.patreon.gold) {
				customType = (<option value="4">Custom</option>);
				iconSection = (
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
				)
			} else if(!this.state.loading) {
				customType = (<option disabled title="Unlocked wtih Gold Tier!" value="4">Custom (Unlocked with the Gold Tier!)</option>);
				iconSection = (
					<div className="formGroup upgradeTier">
						<p>Upload custom images for each of your achievements by upgrading to the Gold Tier on Patreon!</p> 
					</div>
				);
			}

			let pageHeader = "Create Achievement";

			if(this.props.match.params.achievementid) {
				pageHeader = "Edit Achievement";
			}

			content = (
				<Template spinner={{isLoading: this.state.fetch, fullscreen: true}}>
					<div className="achievement-wrapper">
						<div className="achievementPage-header">
							<h2>{pageHeader}</h2>
							<span>{deleteButton}</span>
						</div>
						<div className={"modal-error" + ((this.state.error) ? " modal-error--active" : "")}>
							{this.state.error}
						</div>
						<h4>
							Achievement Preview
							<span className="help" title="This is what your achievement looks like, based on the information below!"></span>
						</h4>
						<div className="achievement-preview">
							<Achievement earned={true} achievement={this.state} defaultIcons={this.state.defaultIcons} />
						</div>
						<h4>
							Achievement Info
							<span className="help" title="Basic information for your achievement!"></span>
						</h4>
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
							<h4>Condition<span className="help" title="Sets what will trigger a community member to earn the achievement!"></span></h4>
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
							<h4 className="noMargin">Icon<span className="help" title="Upload an icon specific for your achievement! Leaving this blank will fall back on the one provided in your general settings!"></span></h4>
							{iconSection}
		                    <input type="submit" className="achievement-button submit-achievement" value="Save" />
		                    <div className="button-bank">
			                    <button type="button" className="achievement-button" onClick={() => {this.revert();}}>Reset</button>
			                    <button type="button" className="achievement-button cancel-achievement-button" onClick={() => {this.props.history.push('/manage/' + this.props.profile.username + '?tab=achievements');}}>Cancel</button>
		                    </div>
		                    {confirmPanel}
		                    {imagePanel}
						</form>
					</div>
				</Template>		
			);

		return (content);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(AchievementPage);