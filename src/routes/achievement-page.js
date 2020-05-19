import React from 'react';
import axios from 'axios';

import Template from '../components/template';
import Achievement from '../components/achievement';
import ConfirmPanel from '../components/confirm-panel';
import ImagePanel from '../components/image-panel';
import InfoPanel from '../components/info-panel';
import TutorialPanel from '../components/tutorial-panel';
import connector from '../redux/connector';
import {Link} from 'react-router-dom';

import './achievement-page.css';
import '../components/achievement-extension.css';

class AchievementPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			achType: "",
			alert: true,
			bot: "",
			condition: "",
			customAllowed: true,
			defaultIcons: {},
			description: "",
			extensionPreview: false,
			shortDescription: "",
			earnable: true,
			edit: false,
			fetch: true,
			icon: "",
			iconPreview: '',
			id: '',
			limited: false,
			platforms: {},
			query: "",
			secret: false,
			showConfirm: false,
			showImagePanel: false,
			title: "",
			unlocked: false,
			referred: false,
			rank: ""
		};

		if(props.profile) {
			this.fetchData();
		}

		this._info = {
			customMessage: {
				title: 'Custom Message',
				content: (
					<div>
						<p>The Stream Achievements bot listens to the chat for a specific message you provide! You will need to tell the bot which data you are looking for!</p>
						<p>You have the following variables to use when writing out your message:
							<ul>
								<li><span>{"{user}"}</span>: The person that will be receiving the acheivement</li>
								<li><span>{"{target}"}</span>: The intended target (usually another viewer in chat)</li>
								<li><span>{"{amount}"}</span>: Any numeric amount (think achievements for chat currency, minigame results, counters, etc)</li>
								<li><span>{"{total}"}</span>: Same as above, in the event there are two numeric values in your message</li>
								<li><span>{"{time}"}</span>: Useful when getting time from your chatbot!</li>
								<li><span>{"{ignore}"}</span>: When you want to ignore any section in your bot's message!</li>
							</ul>
						</p>
						<h4>Example</h4>
						<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1563304527/custom_message_example.png" />
						<p>With this message above, an achievement will occur for this message in chat:</p>
						<span>phirehero has 3485 Tacos in their taco wallet!</span>
					</div>
				)
			},
			customCondition: {
				title: 'Custom Condition',
				content: (
					<div>
						<p>There are 2 ways an achievement will trigger: Just by a message happening, or by a certain condition being met.</p>
						<p>To have an achievement be awarded based on the message happening (i.e. you don't care about any values or time, just that it was spoken), you will just leave the condition field blank!</p>
						<p>If you are looking for a certain criteria to be met, just specify what that criteria is!</p>
						<p className="separator">The conditions are based on the following operators:
							<ul>
								<li><span>{"Equality (=)"}</span>: Value matches exactly {"(amount=400)"}</li>
								<li><span>{"Less Than (<)"}</span>: Value is less than what you specify {"(amount<400)"}</li>
								<li><span>{"Less Than or Equal (<=)"}</span>: Value is less than or exactly what you specify {"(amount<=400)"}</li>
								<li><span>{"Greater Than (>)"}</span>: Value is greater than what you specify {"(amount>400)"}</li>
								<li><span>{"Greater Than or Equal (>=)"}</span>: Value is greater than or exactly what you specify {"(amount>=400)"}</li>
							</ul>
						</p>
					</div>
				)
			},
			followageMessage: {
				title: 'Followage',
				content: (
					<div>
						<p>In order for a member of your community to earn the Follow achievement when they have already been following for some time, you will need to let our system know about your followage command!</p>
						<p>There are 2 variables you will need to use in this message for us to determine if the achievement should be awarded or not:</p>
						<ul>
							<li><span>{"{user}"}</span>: The person that will be receiving the achievement</li>
							<li><span>{"{followage}"}</span>: The part of the message that details how long someone has been following</li>
						</ul>
						<h4>Example</h4>
						<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1577803231/followage.png" />
						<p>With this above, an achievement will occur for these messages, and so on, in chat:</p>
						<p><strong>phiretest, you followed phirehero 1 day ago. Remember that?</strong></p>
						<span><strong>phiretest, you followed phirehero 2 years, 3 months ago. Remember that?</strong></span>
					</div>
				)
			}
		};
	}

	componentDidMount() {
		if(this.props.match.url.indexOf('/mod/') === 0 && this.props.match.params.channelid) {
			this.setState({
				isMod: true
			});
		}

		if(this.props.location.search.length > 0) {
			let params = this.props.location.search.substr(1);
			params = params.split('&');

			params.findIndex((param) => {
				let keyValue = param.split('=');

				if(keyValue[0] === 'tutorial' && keyValue[1] === 'true') {
					this.setState({
						tutorial: true,
						step: 0
					});

					return true;
				}

				return false;
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.fetch && !this.props.profile && nextProps.profile) {

			this.fetchData();
		}

		return true;
	}

	fetchData = () => {
		if(this.props.match.url.indexOf('/mod/') === 0 && this.props.match.params.channelid) {
			if(this.props.match.params.achievementid) {
				axios.get(`${process.env.REACT_APP_API_DOMAIN}api/achievement/mod/retrieve?aid=${this.props.match.params.achievementid}&channel=${this.props.match.params.channelid}`, {
					withCredentials: true
				}).then((res) => this.handleFetch(res, true));
			} else {
				axios.get(`${process.env.REACT_APP_API_DOMAIN}api/achievement/mod/icons?channel=${this.props.match.params.channelid}`, {
					withCredentials: true
				}).then(res => {
					this.setState({
						icons: res.data.images,
						defaultIcons: res.data.defaultIcons,
						fetch: false,
						isGoldChannel: res.data.isGoldChannel,
						customAllowed: res.data.customAllowed
					});
				});
			}
		} else {
			if(this.props.match.params.achievementid) {
				axios.get(process.env.REACT_APP_API_DOMAIN + 'api/achievement/retrieve?aid=' + this.props.match.params.achievementid, {
					withCredentials: true
				}).then((res) => this.handleFetch(res, false));
			} else {
				axios.get(process.env.REACT_APP_API_DOMAIN + 'api/achievement/icons', {
					withCredentials: true
				}).then(res => {
					this.setState({
						channel: res.data.channel,
						icons: res.data.images,
						defaultIcons: res.data.defaultIcons,
						fetch: false,
						customAllowed: res.data.customAllowed
					});
				});
			}
		}
	}

	handleFetch = (res, isMod) => {
		if(res.data.error) {
			//redirect to home
		} else {
			let achievement = {...res.data.achievement};
			
			if(!achievement.achType) {
				achievement.achType = "3";
			}

			let stateUpdate = {
				originalAchievement: res.data.achievement,
				...achievement,
				channel: res.data.channel,
				iconPreview: res.data.achievement.icon,
				icons: res.data.images,
				defaultIcons: res.data.defaultIcons,
				fetch: false,
				edit: true,
				isMod,
				isGoldChannel: res.data.isGoldChannel,
				customAllowed: res.data.customAllowed,
				unlocked: res.data.achievement.unlocked,
				referred: res.data.referred
			};

			console.log(res.data.channel.platforms);

			console.log(achievement.platforms);

			if(this.state.channel && !this.state.channel.integrations.streamlabs && (achievement.achType === "5" || achievement.achType === "6")) {
				stateUpdate.error = (<div>This achievement only works when you are <a href="/profile?tab=integration">integrated</a> with Streamlabs!</div>);
			}

			this.setState(stateUpdate);
		}
	}

	revert = () => {
		let originalAchievement = this.state.originalAchievement;

		if(originalAchievement) {
			let stateUpdate = {
				...this.state,
				...originalAchievement,
				iconPreview: originalAchievement.icon,
				touched: undefined
			};

			delete stateUpdate.iconName;

			this.setState(stateUpdate);	
		} else {
			this.setState({
				achType: "",
				alert: true,
				bot: "",
				condition: "",
				description: "",
				extensionPreview: false,
				shortDescription: "",
				earnable: true,
				edit: false,
				icon: "",
				iconPreview: '',
				id: '',
				limited: false,
				query: "",
				secret: false,
				showConfirm: false,
				showImagePanel: false,
				title: "",
				touched: undefined,
				unlocked: false,
				rank: ""
			});
		}
		
	}

	handleIconChange = (event) => {

		return new Promise((resolve, reject) => {
			if(event.target.files[0]) {
				let file = event.target.files[0];
				let preview = URL.createObjectURL(file);

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
						touched['iconType'] = true;
						touched['iconPreview'] = true;

						let newPreview = URL.createObjectURL(file);
		                
		                this.setState({
		                	icon: newPreview,
		                	iconPreview: newPreview,
							iconName: file.name,
							iconType: file.type,
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

	showPopup = (key) => {
		this.setState({
			key,
			showInfoPanel: true
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

		if(name === "achType") {
			stateUpdate.touched['query'] = true;
			stateUpdate.touched['condition'] = true;
			stateUpdate.query = '';
			if(value === "0") {
				stateUpdate.condition = 1000;
			} else {
				stateUpdate.condition = '';
			}

		}

		if(this.state.valid && !this.state.valid[name]) {
			stateUpdate.valid = {
				[name]: true
			};
		}

		this.setState(stateUpdate);
	}

	getConditionContent = () => {
		if(this.state.achType !== "") {

			let conditionContent;
			let helpText;

			switch(this.state.achType) {
				case "0":
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-condition">Tier</label>
								<select 
									id="achievement-condition"
									name="condition"
									className={"selectInput" + ((this.isInvalid("condition")) ? " invalid" : "")}
									onChange={this.handleDataChange}
									value={this.state.condition}
								>
									<option value={1000}>Tier 1</option>
									<option value={2000}>Tier 2</option>
									<option value={3000}>Tier 3</option>
								</select>
							</div>
						</div>
					)
					break;
				case "1":
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-condition">Months *</label>
								<input
									id="achievement-condition"
									name="condition"
									className={"textInput" + ((this.isInvalid("condition")) ? " invalid" : "")}
									type="text"
									value={this.state.condition}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="helpText">Number of months a viewer has subbed altogether</div>
						</div>
					);
					break;
				case "2":
					//Gifted Sub
					helpText = "Total number of gifted subs (defaults to 1)";
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-condition"># of Gifted Subs *</label>
								<input
									id="achievement-condition"
									name="condition"
									className={"textInput" + ((this.isInvalid("condition")) ? " invalid" : "")}
									type="text"
									value={this.state.condition}
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
					conditionContent = (
						<div>
							<div className="achievementTypeInfo">For manual achievements, they can only be obtained by you gifting them out to your community!</div>
						</div>
					);
					break;
				case "4":
					//Custom
					if(this.state.customAllowed || (this.state.edit && this.state.originalAchievement.achType === "4")) {

						conditionContent = (
							<div>
								<div className="formGroup">
									<label htmlFor="achievement-bot">Bot Name *</label>
									<input
										id="achievement-bot"
										name="bot"
										className={"textInput" + ((this.isInvalid("bot")) ? " invalid" : "")}
										type="text"
										value={this.state.bot}
										onChange={this.handleDataChange}
									/>
								</div>
								<div className="formGroup">
									<label htmlFor="achievement-query">
										<a href="javascript:;" onClick={() => {this.showPopup('customMessage')}} className="gold">Chat Message</a> *
									</label>
									<input
										id="achievement-query"
										name="query"
										className={"textInput" + ((this.isInvalid("query")) ? " invalid" : "")}
										type="text"
										value={this.state.query}
										onChange={this.handleDataChange}
									/>
								</div>
								<div className="formGroup">
									<label htmlFor="achievement-condition">
										<a href="javascript:;" onClick={() => {this.showPopup('customCondition')}} className="gold">Condition</a>
									</label>
									<input
										id="achievement-condition"
										name="condition"
										className={"textInput" + ((this.isInvalid("condition")) ? " invalid" : "")}
										type="text"
										value={this.state.condition}
										onChange={this.handleDataChange}
									/>
								</div>
							</div>
						);
					} else {
						conditionContent = (
							<div className="formGroup upgradeTier">
								<p>Create unlimited custom achievements with <Link className="gold" to="/gold">Stream Achievements Gold</Link>!</p> 
							</div>
						)
					}
					break;
				case "5":
					//Follow (Streamlabs)
					conditionContent = (
						<div>
							<div className="formGroup">
								<label htmlFor="achievement-bot">Bot Name *</label>
								<input
									id="achievement-bot"
									name="bot"
									className={"textInput" + ((this.isInvalid("bot")) ? " invalid" : "")}
									type="text"
									value={this.state.bot}
									onChange={this.handleDataChange}
									placeholder="The bot that has your followage command"
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-query">
									<a href="javascript:;" onClick={() => {this.showPopup('followageMessage')}} className="gold">Followage Message</a> *
								</label>
								<input
									id="achievement-query"
									name="query"
									className={"textInput" + ((this.isInvalid("query")) ? " invalid" : "")}
									type="text"
									value={this.state.query}
									onChange={this.handleDataChange}
									placeholder="The message you bot puts in the chat ({user} is required)"
								/>
							</div>
						</div>
					);
					break;
				default:
					break;
			}

			return conditionContent;
		}

		return null;
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if(this.isFormValid()) {

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
					shortDescription: this.state.shortDescription,
					earnable: this.state.earnable,
					alert: this.state.alert,
					limited: this.state.limited,
					secret: this.state.secret,
					iconName: (this.state.file) ? this.state.file.name : '',
					iconType: (this.state.file) ? this.state.file.type : '',
					achType: this.state.achType,
					rank: this.state.rank
				};
				
				achievement.condition = this.state.condition;

				if(this.state.achType === "2") {
					if(!this.state.condition) {
						achievement.condition = 1;
					}
				}

				if(this.state.achType === "4" || this.state.achType === "5") {
					achievement.bot = this.state.bot;
					achievement.query = this.state.query;
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
	}

	isFormValid = () => {
		let validUpdate = {};
		let isValid = true;

		this.isNullorEmpty(validUpdate, 'title');
		this.isNullorEmpty(validUpdate, 'achType');
		//this.isNullorEmpty(validUpdate, 'rank')

		switch(this.state.achType) {
			case "1":
				this.isNumber(validUpdate, 'condition');
				break;
			case "2":
				this.isNumber(validUpdate, 'condition');
				break;
			case "4":
				this.isCustomAllowed(validUpdate, 'achType');
				this.isNullorEmpty(validUpdate, 'bot');
				this.isValidQuery(validUpdate, 'query');
				this.isValidCondition(validUpdate, 'condition');
				break;
			case "5":
				this.isNullorEmpty(validUpdate, 'bot');
				this.isValidFollowage(validUpdate, 'query');
				break;
			default:
				break;
		}

		this.setState({
			valid: validUpdate
		});

		Object.keys(validUpdate).forEach(field => {
			if(!validUpdate[field]) {
				isValid = false;
			}
		});
		
		return isValid;

	}

	isCustomAllowed = (fieldSet, field) => {
		if(this.state.customAllowed || (this.state.edit && this.state.originalAchievement.achType === '4')) {
			fieldSet[field] = true;
			return;
		}

		fieldSet[field] = false;
	}

	isValidQuery = (fieldSet, field) => {
		if(!this.isNullorEmpty(fieldSet, field)) {
			return;
		} else {
			let userFound = this.state[field].indexOf('{user}') >= 0;

			if(!userFound) {
				fieldSet[field] = false;
			} else {
				fieldSet[field] = true;
			}
		}
	}

	isValidFollowage = (fieldSet, field) => {
		if(!this.isNullorEmpty(fieldSet, field)) {
			return;
		} else {
			let userFound = this.state[field].indexOf('{user}') >= 0;
			let followageFound = this.state[field].indexOf('{followage}') >= 0;

			if(!userFound || !followageFound) {
				fieldSet[field] = false;
			} else {
				fieldSet[field] = true;
			}
		}
	}

	isValidCondition = (fieldSet, field) => {
		if(this.state[field].length > 0) {
			let query = this.state['query'];
			let queryMatches = query.match(/({[a-zA-Z0-9_,\.]+})/g);

			let pattern = /[a-zA-Z0-9_]+[<>=]+[a-zA-Z0-9_,\.]+;*/g;
			let matches = this.state[field].match(pattern);

			if(matches) {
				let combined = matches.join('');

				if(combined.length === this.state[field].length) {

					let found = false;
					//check if provided condition is in message
					queryMatches.length > 0 && queryMatches.forEach(query => {
						let key = query.replace(/[{}]+/g, '');

						if(key !== 'user' && !found) {
							let test = new RegExp(key + '[<>=]+');

							if(this.state[field].match(test)) {
								found = true;
							}
						}
					});

					if(found) {
						fieldSet[field] = true;	
						return;
					}
				}
			}

			fieldSet[field] = false;
		}
	}

	isNullorEmpty = (fieldSet, field) => {
		if(!this.state[field] || this.state[field] === '') {
			fieldSet[field] = false;
		} else {
			fieldSet[field] = true;
		}

		return fieldSet[field];
	}

	isNumber = (fieldSet, field) => {
		let fieldValue = parseInt(this.state[field]);
		if(!Number.isNaN(fieldValue)) {
			if(fieldValue.toString().length !== this.state[field].length) {
				this.setState({
					[field]: fieldValue
				});
			}
			fieldSet[field] = true;
		} else {
			fieldSet[field] = false;
		}
	}

	isInvalid = (field) => {
		if(this.state.valid && typeof this.state.valid[field] === 'boolean' && !this.state.valid[field]) {
			return true;
		} else {
			return false;
		}
	}

	handleDelete = (event) => {
		this.setState({
			showConfirm:false
		});
		
		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/achievement/delete', {
			achievementID: this.state._id
		}, {
			withCredentials: true
		}).then(response => {
			let data = {
				notice: "\"" + this.state.title + "\" achievement was deleted successfully!",
				delete: this.state._id
			};

			this.props.history.push('/dashboard/?tab=achievements');
		});
	}

	handleCancel = () => {
		if(!this.state.isMod) {
			this.props.history.push('/dashboard/?tab=achievements');					
		} else {
			this.props.history.push('/mod/' + this.props.match.params.channelid + '?tab=achievements');
		}
	}

	sendData = (achievement) => {
		let api, mod = "", param = "";

		if(this.state.isMod) {
			mod = "mod/";
			param = `?channel=${this.props.match.params.channelid}`;
		}
		
		if(this.state.edit) {
			api = `${process.env.REACT_APP_API_DOMAIN}api/achievement/${mod}update${param}`;
		} else {
			api = `${process.env.REACT_APP_API_DOMAIN}api/achievement/${mod}create${param}`;
		}

		axios.post(api, achievement, {
			withCredentials: true
		}).then((res) => {
			
			if(res.data.created || res.data.update) {
				//redirect to manage-channel#achievements
				this.clearState();
				if(!this.state.isMod) {
					this.props.history.push('/dashboard/?tab=achievements');					
				} else {
					this.props.history.push('/mod/' + this.props.match.params.channelid + '?tab=achievements');
				}

			} else {
				this.setState({
					error: res.data.message
				});
			}
		});
	}

	showImagePanel = (event) => {
		if(!this.state.isMod) {
			this.setState({
				showImagePanel: true
			});
		}
	}

	showTutorial = () => {
		this.setState({
			showTutorial: true
		});
	}

	toggleHover = (showHover) => {
		if(!this.state.isMod) {
			if(showHover) {
				this.hover.classList.add('hoverText--active');
			} else {
				this.hover.classList.remove('hoverText--active');
			}
		}
	}

	clearState = () => {
		this.setState({
			fetched: false,
			title: "",
			description: "",
			shortDescription: "",
			icon: "",
			achType: "",
			rank: "",
			query: "",
			bot: "",
			condition: "",
			earnable: true,
			alert: true,
			limited: false,
			secret: false,
			iconPreview: '',
			id: '',
			edit: false,
			showConfirm: false,
			showImagePanel: false,
			showInfoPanel: false,
			showTutorial: false
		});
	}

	getBotOptions = () => {
		if(this.state.channel && this.state.channel.integrations.streamlabs) {
			return (
				<React.Fragment>
					<option value="5">New Follow</option>
					<option value="6">New Donation</option>
					<option value="7">New Bit Donation</option>
				</React.Fragment>
			)
		}
	}

	togglePreview = () => {
		this.setState({
			extensionPreview: !this.state.extensionPreview
		});
	}

	enableCustomAchievement = () => {
		this.setState({
			fetch: true
		});
		axios.post(`${process.env.REACT_APP_API_DOMAIN}api/achievement/enable`, {
			aid: this.props.match.params.achievementid
		}, {
			withCredentials: true
		}).then(res => {
			this.setState({
				fetch: false,
				unlocked: res.data.unlocked
			});
		});
	}

	getInteractiveTutorial = (step) => {
		let content;

		switch(step) {
			case 0:
				content = (
					<InfoPanel buttonText="Get Started" onClose={() => this.setState({step: 1})}>
						<h3>My First Achievement</h3>
						<p>Let's get started with creating your first achievement!</p>
					</InfoPanel>
				)
				break;
			default:
				break;
		}

		return content;
	}

	handlePlatformChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		debugger;

		let touched = this.state.touched || {};
		touched[name] = true;

		let stateUpdate = {
			[name]: value,
			touched
		};

		if(name === "achType") {
			stateUpdate.touched['query'] = true;
			stateUpdate.touched['condition'] = true;
			stateUpdate.query = '';
			if(value === "0") {
				stateUpdate.condition = 1000;
			} else {
				stateUpdate.condition = '';
			}

		}

		if(this.state.valid && !this.state.valid[name]) {
			stateUpdate.valid = {
				[name]: true
			};
		}

		this.setState(stateUpdate);
	}

	render() {

		let pageHeader, content, iconGallery, confirmPanel, imagePanel, infoPanel, tutorialPanel, imgPreviewContent, iconSection, platformContent;
		let deleteButton = null;

		let isGold = (this.props.patreon && this.props.patreon.gold) || (this.state.isMod && this.state.isGoldChannel);

		if(this.state.isMod) {
			if(this.state.edit) {
				pageHeader = (<span><span className="capitalize">{`Edit ${this.props.match.params.channelid}`}</span>'s Achievement <span className="gold">[MODERATOR]</span></span> );
			} else {
				pageHeader = (<span><span className="capitalize">{`Add ${this.props.match.params.channelid}`}</span>'s Achievement <span className="gold">[MODERATOR]</span></span> );
			}
		} else {
			if(this.state.edit) {
				pageHeader = "Edit Achievement";
			} else {
				pageHeader = "Create Achievement";
			}
		}

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

			if(this.state.showInfoPanel) {
				infoPanel = (
					<InfoPanel 
						title={this._info[this.state.key].title}
						onClose={() => {this.setState({showInfoPanel: false})}}
					>
						{this._info[this.state.key].content}
					</InfoPanel>
				);
			} else {
				infoPanel = undefined;
			}

			if(this.state.showTutorial) {
				tutorialPanel = (
					<TutorialPanel onClose={() => {this.setState({showTutorial: false})}} />
				);
			} else {
				tutorialPanel = undefined
			}

			if(this.state.edit && !this.state.isMod) {
				deleteButton = (
					<img
						className="delete-achievement-button"
						onClick={() => {this.setState({showConfirm: true})}}
						src="https://res.cloudinary.com/phirehero/image/upload/v1556641782/trash-white.png"
					/>
				);
			}

			let customType;

			if(this.state.iconPreview) {
				imgPreviewContent = (<img src={this.state.iconPreview} />);
			} else {
				imgPreviewContent = (<img src={this.state.defaultIcons.default} />);
			}
			
			if(isGold) {
				let className = "formGroup icon-upload";
				let hover = (<div className="hoverText" ref={hover => (this.hover = hover)}>Click to Edit</div>);
				
				if(this.state.isMod) {
					className += " isMod";
					hover = undefined;
				}

				customType = (<option value="4">Custom</option>);
				iconSection = (
					<div className={className}>
						<label htmlFor="achievement-icon">Icon</label>
						<div
							className="currentIcon"
							onClick={this.showImagePanel}
							onMouseEnter={() => {this.toggleHover(true)}}
							onMouseLeave={() => {this.toggleHover(false)}}
						>
	                    	{imgPreviewContent}
	            			{hover}        	
                    	</div>
                    </div>
				)
			} else if(typeof this.state.customAllowed !== 'boolean') {
				customType = (<option value="4">{`Custom [${this.state.customAllowed} remaining]`}</option>);
				iconSection = (
					<div className="formGroup upgradeTier">
						<p>Upload custom images for each of your achievements by upgrading to <Link className="gold" to="/gold">Stream Achievements Gold</Link>!</p>
					</div>
				);
			/* } else if(!this.state.loading) {
				customType = (<option title="Unlocked with Stream Achievements Gold!" value="4">Custom [0 remaining]</option>);
				iconSection = (
					<div className="formGroup upgradeTier">
						<p>Upload custom images for each of your achievements by upgrading to <Link className="gold" to="/gold">Stream Achievements Gold</Link>!</p>
					</div>
				);
			} */
			} else if(!this.state.loading) {
				customType = (<option disabled title="Unlocked with Stream Achievements Gold!" value="4">Custom [Gold]</option>);
				iconSection = (
					<div className="formGroup upgradeTier">
						<p>Upload custom images for each of your achievements by upgrading to <Link className="gold" to="/gold">Stream Achievements Gold</Link>!</p>
					</div>
				);
			}


			let saveButton, toggleText, achievementPreviewClasses, warning;

			if(this.state.touched && Object.keys(this.state.touched).length > 0) {
				saveButton = <input className='achievement-button submit-achievement submit-achievement--active' type="submit" value="Save" />
			} else {
				saveButton = <input className='achievement-button submit-achievement' disabled type="submit" value="Save" />
			}

			achievementPreviewClasses = "achievement-preview";

			if(this.state.extensionPreview) {
				toggleText = "Show Normal View";
				achievementPreviewClasses += " achievement-preview--extension";
			} else {
				toggleText = "Show Extension View";
			}

			if(this.state.edit && this.state.achType === "4" && !isGold && !this.state.unlocked) {
				let enableText = "";
				let enableButton;

				if(this.state.referred) {
					enableText = " Would you like to enable this achievement for your referral bonus?";
					enableButton = (<button onClick={this.enableCustomAchievement} className="enableButton">Enable</button>);
				} else {
					enableText = (<span>To re enable, become a <a href="/gold" className="gold-white">Gold</a> member once again!"</span>);
				}

				warning = (
					<div className="achievement-page--inactiveWarning">
						<div className="info">
							<span>This custom achievement is currently disabled, and can not be earned by your community.</span>
							<span>{enableText}</span>
						</div>
						{enableButton}
					</div>
				)
			}

			//platform section
			let channelPlatforms;

			if(this.state.channel) {
				channelPlatforms = Object.keys(this.state.channel.platforms);

				console.log(channelPlatforms);
				if(channelPlatforms.length > 1) {
					//show platform picker
					platformContent = (
						<div>
							<h4>Platforms</h4>
							<div className="formGroup">
								<div className="achievement-platforms">
									<label htmlFor="achievement-twitch">
										<input 
									  		id="achievement-twitch"
											name="twitch"
											type="checkbox"
											title="This achievement can currently be earned"
											checked={this.state.platforms}
											onChange={this.handlePlatformChange}
										/>
										<div className="platformLink twitch">
											<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589664671/twitch-glitch-white.png" />
										</div>
									</label>
									<label htmlFor="achievement-mixer">
										<input 
									  		id="achievement-mixer"
											name="mixer"
											type="checkbox"
											title="This achievement can currently be earned"
											checked={this.state.platforms}
											onChange={this.handlePlatformChange}
										/>
										<div className="platformLink mixer">
											<img alt="" src="https://res.cloudinary.com/phirehero/image/upload/v1589665074/mixer-icon-dark.png" />
										</div>
									</label>
								</div>
							</div>
						</div>
					)
				}
			}

			content = (
				<Template spinner={{isLoading: this.state.fetch, fullscreen: true}}>
					<div className="achievement-wrapper">
						<div className="achievementPage-header">
							<h2>{pageHeader}</h2>
							<span className="delete-achievement-button">{deleteButton}</span>
							<button type="button" className="tutorial-button" onClick={this.showTutorial}><span>Tutorials</span></button>
						</div>
						{warning}
						<div className={"modal-error" + ((this.state.error) ? " modal-error--active" : "")}>
							{this.state.error}
						</div>
						<h4>
							Achievement Preview
							<span className="help" title="This is what your achievement looks like, based on the information below!"></span>
						</h4>
						<div className={achievementPreviewClasses}>
							<Achievement
								earned={true}
								unlocked={isGold}
								achievement={this.state}
								defaultIcons={this.state.defaultIcons}
							/>

							<div className="toggleView">
								<button type="button" onClick={this.togglePreview}>{toggleText}</button>
							</div>
						</div>
						<h4>
							Achievement Info
							<span className="help" title="Basic information for your achievement!"></span>
						</h4>
						<form onSubmit={this.handleSubmit}>
							<div className="formGroup">
								<label htmlFor="achievement-title">Title *</label>
								<input
									id="achievement-title"
									name="title"
									className={"textInput" + ((this.isInvalid("title")) ? " invalid" : "")}
									type="text"
									value={this.state.title}
									onChange={this.handleDataChange}
									ref={(el) => {this._title = el}}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-description">Description *</label>
								<input
									id="achievement-description"
									name="description"
									className="textInput"
									type="text"
									value={this.state.description}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-short-description">Short Description</label>
								<input
									id="achievement-short-description"
									name="shortDescription"
									className="textInput"
									type="text"
									value={this.state.shortDescription}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="helpText">If provided, the short description will be used on mobile sizes and the extensions</div>
							{/*<div className="formGroup">
								<label htmlFor="achievement-rank">Rank *</label>
								<select 
									id="achievement-rank"
									name="rank"
									className={"selectInput" + ((this.isInvalid("rank")) ? " invalid" : "")}
									title="The achievement's rank"
									onChange={this.handleDataChange}
									value={this.state.rank}
								>
									<option value=""></option>
									<option value="0">Bronze</option>
									<option value="1">Silver</option>
									<option value="2">Gold</option>
									<option value="3">Platinum</option>
									<option value="4">Feat (Unranked)</option>
								</select>
							</div>*/}
							{platformContent}
							<h4>Configuration</h4>
							<div className="formGroup checkboxes">
								<div className="checkbox">
									<div className="checkbox-label">Earnable</div>
									<label className="switch" htmlFor="achievement-earnable" title="Toggle if the achievement can be earned">
									  	<input 
									  		id="achievement-earnable"
											name="earnable"
											type="checkbox"
											title="This achievement can currently be earned"
											checked={this.state.earnable}
											onChange={this.handleDataChange}
										/>
									  	<span className="slider round"></span>
									</label>
								</div>
								<div className="checkbox">
									<div className="checkbox-label">Alert</div>
									<label className="switch" htmlFor="achievement-alert" title="Toggle if the achievement will trigger an overlay in stream">
									  	<input 
									  		id="achievement-alert"
											name="alert"
											type="checkbox"
											title="This achievement can currently be earned"
											checked={this.state.alert}
											onChange={this.handleDataChange}
										/>
									  	<span className="slider round"></span>
									</label>
								</div>
								<div className="checkbox">
									<div className="checkbox-label">Limited Time</div>
									<label className="switch" htmlFor="achievement-limited" title="Toggle if the achievement can only be earned for a limited time" >
										<input
											id="achievement-limited"
											name="limited"
											type="checkbox"
											title="This achievement can only be earned for a limited time"
											checked={this.state.limited}
											onChange={this.handleDataChange}
										/>
									  	<span className="slider round"></span>
									</label>
								</div>
								<div className="checkbox">
									<div className="checkbox-label">Secret</div>
									<label className="switch" htmlFor="achievement-secret" title="Toggle if the achievement will be a secret">
										<input
											id="achievement-secret"
											name="secret"
											type="checkbox"
											title="This achievement will be a secret in your list until someone earns it!"
											checked={this.state.secret}
											onChange={this.handleDataChange}
										/>

										<span className="slider round"></span>
									</label>
								</div>
							</div>
							<h4>Condition<span className="help" title="Sets what will trigger a community member to earn the achievement!"></span></h4>
							<div className="formGroup">
								<label htmlFor="achievement-achType">Type of Achievement *</label>
								<select 
									id="achievement-achType"
									name="achType"
									className={"selectInput" + ((this.isInvalid("achType")) ? " invalid" : "")}
									title="The type of event that this achievement will be awarded for!"
									onChange={this.handleDataChange}
									value={this.state.achType}
								>
									<option value=""></option>
									{this.getBotOptions()}
									<option value="0">New Sub</option>
									<option value="1">Resub</option>
									<option value="2">Gifted Sub</option>
									<option value="3">Manual</option>
									{customType}
								</select>
							</div>
							{this.getConditionContent()}
							<h4 className="noMargin">Icon<span className="help" title="Upload an icon specific for your achievement! Leaving this blank will fall back on the one provided in your general settings!"></span></h4>
							{iconSection}
		                    {saveButton}
		                    <div className="button-bank">
			                    <button type="button" className="achievement-button" onClick={() => {this.revert();}}>Reset</button>
			                    <button type="button" className="achievement-button cancel-achievement-button" onClick={this.handleCancel}>Cancel</button>
		                    </div>
		                    {confirmPanel}
		                    {imagePanel}
		                    {infoPanel}
		                    {tutorialPanel}
		                    {this.getInteractiveTutorial(this.state.step)}
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