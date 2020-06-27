import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import connector from '../redux/connector';
import {updateStatus} from '../redux/profile-reducer';
import {Link} from 'react-router-dom';

import Notice from '../components/notice';
import Template from '../components/template';
import Achievement from '../components/achievement';
import GiftAchievementModal from '../components/gift-achievement';
import ConfirmPanel from '../components/confirm-panel';
import ModeratorPanel from '../components/moderator-panel';
import AlertConfig from '../components/alert-configuration-panel';
import LoadingSpinner from '../components/loading-spinner';
import ImagePanel from '../components/image-panel';
import MembersPanel from '../components/members-panel';
import InfoPanel from '../components/info-panel';
import ChannelIntegrationsPanel from '../components/channel-integrations-panel';
import StreamlabsPanel from '../components/streamlabs-panel';
import TooltipWrapper from '../components/tooltip-wrapper';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import './dashboard-page.css';

const ICON_SELECTED = 'icon--selected';

class DashboardPage extends React.Component {

	constructor() {
		super();

		this.state = {
			channel: '',
			achievements: '',
			notice: '',
			showConfirm: false,
			showAction: false,
			loading: true,
			showImagePanel: false,
			overlay: '',
			selected: {
				defaultIcon: '',
				hiddenIcon: ''
			},
			reordering: false,
			isMod: false,
			showInfoPanel: false,
			showDeletePopup: false,
			copytext: false,
			eventTabActive: false
		};

		this.icons = {
			default: {
				gold: "https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png",
				silver: "https://res.cloudinary.com/phirehero/image/upload/v1558834120/default-icon-silver.png",
				bronze: "https://res.cloudinary.com/phirehero/image/upload/v1559961119/default-icon-bronze.png"
			},
			hidden: "https://res.cloudinary.com/phirehero/image/upload/v1558811887/hidden-icon.png"
		};

		this._info = {
			title: 'Referral Code',
			content: (
				<div>
					<p>When someone uses this referral code to sign up for their channel, you will be granted the ability to <strong>create your very own Custom Achievement</strong> that your community will be able to earn!</p>
					<p>These Custom Achievements are where you can really bring the uniquenss of your channel out, and let everyone enjoy earning an achievement for that quirky minigame of yours, or that overly used command!</p>
					<p>Find a friend, give them your code, and get that custom capability unlocked!!</p>
				</div>
			)
		}
	}

	componentDidMount() {
		if(this.props.match.url.indexOf('/mod/') === 0 && this.props.match.params.channelid) {
			this.setState({
				isMod: true
			}, () => {
				axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/mod/retrieve?channel=' + this.props.match.params.channelid, {
					withCredentials: true
				}).then(res => {
					let stateUpdate = {
						channel: res.data.channel,
						achievements: res.data.achievements,
						overlay: res.data.channel.overlay,
						events: res.data.events,
						loading: false,
						selected: {},
						isMod: true
					};

					let channelIcons = res.data.channel.icons;

					if(channelIcons) {
						if(channelIcons.default) {
							if(channelIcons.default === this.icons.default.gold) {
								stateUpdate.selected.defaultIcon = 'gold';
								stateUpdate.defaultIconOriginal = 'gold';
							} else if (channelIcons.default === this.icons.default.silver) {
								stateUpdate.selected.defaultIcon = 'silver';
								stateUpdate.defaultIconOriginal = 'silver';
							} else if (channelIcons.default === this.icons.default.bronze) {
								stateUpdate.selected.defaultIcon = 'bronze';
								stateUpdate.defaultIconOriginal = 'bronze';
							} else {
								stateUpdate.selected.defaultIcon = 'customDefault';
								stateUpdate.defaultIconOriginal = 'customDefault';
								stateUpdate.defaultIconPreview = channelIcons.default;	
							}
						}

						if(channelIcons.hidden) {
							if(channelIcons.hidden !== this.icons.hidden) {
								stateUpdate.selected.hiddenIcon = 'customHidden';
								stateUpdate.hiddenIconOriginal = 'customHidden';
								stateUpdate.hiddenIconPreview = channelIcons.hidden;
							} else {
								stateUpdate.selected.hiddenIcon = 'default';
								stateUpdate.hiddenIconOriginal = 'default';
							}
						}

					}

					this.setState(stateUpdate);
				})
			})
			
		} else {
			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/dashboard', {
				withCredentials: true
			}).then((res) => {
				if(res.data.error) {
					this.props.history.replace('/');
				} else {

					let stateUpdate = {
						channel: res.data.channel,
						moderators: res.data.moderators,
						achievements: res.data.achievements,
						images: res.data.images,
						events: res.data.events,
						members: res.data.members,
						overlay: res.data.channel.overlay,
						membersOffset: res.data.membersOffset,
						loading: false,
						selected: {}
					};

					let channelIcons = res.data.channel.icons;

					if(channelIcons) {
						if(channelIcons.default) {
							if(channelIcons.default === this.icons.default.gold) {
								stateUpdate.selected.defaultIcon = 'gold';
								stateUpdate.defaultIconOriginal = 'gold';
							} else if (channelIcons.default === this.icons.default.silver) {
								stateUpdate.selected.defaultIcon = 'silver';
								stateUpdate.defaultIconOriginal = 'silver';
							} else if (channelIcons.default === this.icons.default.bronze) {
								stateUpdate.selected.defaultIcon = 'bronze';
								stateUpdate.defaultIconOriginal = 'bronze';
							} else {
								stateUpdate.selected.defaultIcon = 'customDefault';
								stateUpdate.defaultIconOriginal = 'customDefault';
								stateUpdate.defaultIconPreview = channelIcons.default;	
							}
						}

						if(channelIcons.hidden) {
							if(channelIcons.hidden !== this.icons.hidden) {
								stateUpdate.selected.hiddenIcon = 'customHidden';
								stateUpdate.hiddenIconOriginal = 'customHidden';
								stateUpdate.hiddenIconPreview = channelIcons.hidden;
							} else {
								stateUpdate.selected.hiddenIcon = 'default';
								stateUpdate.hiddenIconOriginal = 'default';
							}
						}

					}

					this.setState(stateUpdate);
				}
			});
		}
	}

	setNotice = (notice) => {
		this.setState({
			notice
		});
	}

	clearNotice = () => {
		this.setState({
			notice: ''
		});
	}

	filterList = (event) => {
	    var updatedList = this.state.achievements;

	    if(event.target.value === '') {
	    	//nothing in text box
	    	this.setState({filteredAchievements: false});
	    } else {
	    	updatedList = updatedList.filter(function(achievement){
		      return (achievement.title).toLowerCase().search(
		        event.target.value.toLowerCase()) !== -1;
		    });
		    
		    this.setState({filteredAchievements: updatedList});
	    }	    
  	}

  	handleTestAchievement = (aid) => {
  		this.setState({
			loading: true
		}, () => {
			axios.get(`${process.env.REACT_APP_API_DOMAIN}api/channel/testOverlay?aid=${aid}`, {
				withCredentials: true
			}).then((res) => {
				setTimeout(() => {
					this.setState({
						loading: false
					});
					this.setNotice("Test Alert Sent!");
				}, 300)
			});
		})
  	}

  	showGiftModal = (aid) => {

  		this.setState({
			isModalActive: true,
			aid
		});	
		
	}

	hideGiftModal = (award) => {
		
		let stateUpdate = {
			isModalActive: false
		};

		if(award) {
			stateUpdate.notice = 'Awarded achievements successfully!';
		}
		
		this.setState(stateUpdate);
	}

	hideAchievementModal = () => {
		this.setState({
			isModalActive: false,
			edition: null
		});
	}

	updateAchievements = (data) => {
		if(data.notice) {
			this.setState({
				notice: data.notice
			});
		}
		if(data.delete) {
			//Achievement deleted, remove from list
			let currentAchievements = this.state.achievements;

			let updatedAchievements = currentAchievements.filter(achievement => {
				return achievement._id !== data.delete
			});

			this.setState({
				achievements: updatedAchievements
			});
		} else if(data.achievement) {

			let newAchievement = data.achievement;
			let currentAchievements = this.state.achievements;
			let found = false;

			currentAchievements.forEach((currentAchievement, index, arr) => {
				if(currentAchievement._id === newAchievement._id) {
					found = true;
					arr[index] = newAchievement;
				}
			});

			if(!found) {
				currentAchievements.push(newAchievement);	
			}
			
			this.setState({
				achievements: currentAchievements
			});
		}
	}

	handleAction = () => {
		if(this.state.reordering) {
			this.setState({
				achievements: this.state.preorderedAchievements,
				preorderedAchievements: null,
				reordering: false,
				showAction: false
			});
		} else {
			this.setState({
				showAction: !this.state.showAction
			});	
		}
	}

	handleActionBlur = () => {
		this.setState({
			showAction: false
		})
	}

	promptDelete = (image) => {
		this.setState({
			showConfirm: true,
			imageToDelete: image
		});
	}

	handleImageDelete = () => {
		let image = this.state.imageToDelete;

		this.setState({
			showConfirm: false,
			loading: true,
			imageToDelete: null
		});

		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/image', {
			image: image
		}, {
			withCredentials: true
		}).then(res => {
			if(res.error) {

			} else {
				let stateUpdate = {
					loading: false,
					...res.data
				};

				if(image.type === 'default') {
					stateUpdate.defaultIconPreview = '';
					this.handleIconSelect({target: { name: 'gold' }}, 'defaultIcon', this.icons.default.gold);
				} else if(image.type === 'hidden') {
					stateUpdate.hiddenIconPreview = '';
					this.handleIconSelect({target: { name: 'default' }}, 'hiddenIcon', this.icons.hidden);
				}

				this.setState(stateUpdate);					
				
			}
		});
	}

	showImagePanel = (event, iconName) => {
		this.setState({
			showImagePanel: true,
			iconName
		});
	}

	toggleHover = (showHover, node) => {
		if(showHover) {
			node.classList.add('hoverText--active');
		} else {
			node.classList.remove('hoverText--active');
		}
	}

	handleIconChange = (event, id, max) => {

		return new Promise((resolve, reject) => {
			
			let maxSize = max || 300;
			let name = id || this.state.iconName;

			if(event.target.files[0]) {
				let file = event.target.files[0];
				let preview = URL.createObjectURL(file);
				
				var img = new Image();
	       		img.src = preview;

		        img.onload = () => {
		            var width = img.naturalWidth, height = img.naturalHeight;
		            window.URL.revokeObjectURL( img.src );
		            
		            if( width <= maxSize && height <= maxSize ) {

		            	let touched = this.state.touched || {};
						touched[name] = true;
						touched[name + 'File'] = true;
						touched[name + 'Name'] = true;
						touched[name + 'Preview'] = true;
						touched[name + 'Type'] = true;

						let newPreview = URL.createObjectURL(file);

						let stateUpdate = {
							touched
						};

						stateUpdate[name + 'File'] = file;
						stateUpdate[name + 'Name'] = file.name;
						stateUpdate[name + 'Preview'] = newPreview;
						stateUpdate[name + 'Type'] = file.type;

						this.setState(stateUpdate);

						resolve({error: null});

		            } else { 
		                resolve({
		                	error: 'Icon needs to be less than 300x300'
		                });
		            } 
		        };
			} else {
				let touched = this.state.touched || {};
				touched[name] = true;
				
				let stateUpdate = {
					touched
				};

				stateUpdate[name + 'File'] = '';
				stateUpdate[name + 'Name'] = '';
				stateUpdate[name + 'Preview'] = '';

				this.setState(stateUpdate);

				resolve({error: null});
			}
		});
		
	}

	handleCancel = (originalIcon) => {
		let stateUpdate = {
			showImagePanel: false
		};

		if(originalIcon) {
			let touched = this.state.touched || undefined;

			if(touched) {
				delete touched[this.state.iconName];
				delete touched[this.state.iconName + 'File'];
				delete touched[this.state.iconName + 'Name'];
				delete touched[this.state.iconName + 'Preview'];
				stateUpdate.touched = touched;
			}

			stateUpdate[this.state.iconName + 'Preview'] = originalIcon;
		}

		this.setState(stateUpdate);
	}

	handleIconSelect = (evt, iconName, icon) => {
		let name = evt.target.name;
		let prevIconName = this.state.selected[iconName];

		if(prevIconName != name) {
			let stateUpdate = {
				selected: this.state.selected
			};

			stateUpdate.selected[iconName] = name;
			stateUpdate[iconName + 'Selected'] = icon;

			let touched = this.state.touched || {};

			if(this.state[iconName + 'Original'] === name) {
				delete touched[iconName];
			} else {
				touched[iconName] = true;
			
				if(prevIconName === 'customDefault' || prevIconName === 'customHidden') {
					delete touched[iconName + 'File'];
					delete touched[iconName + 'Name'];
					delete touched[iconName + 'Preview'];
				}
			}
			stateUpdate.touched = touched;

			this.setState(stateUpdate);
		}
	}

	handleCustomIcon = (evt, iconName) => {
		if(this.props.patreon && this.props.patreon.gold) {

			let identifier = (iconName === 'defaultIcon') ? 'customDefault' : 'customHidden';
			
			if(this[iconName + 'Preview'] && this.state.selected[iconName] !== identifier) {

				let stateUpdate = {
					selected: this.state.selected
				};

				stateUpdate.selected[iconName] = identifier;
				this[iconName + 'Selected'] = this[iconName + 'Preview'];
				stateUpdate[iconName + 'Selected'] = this.state[iconName + 'Preview'];
				stateUpdate[iconName + 'Type'] = this.state[iconName + 'File'].type;

				let touched = this.state.touched || {};

				touched[iconName] = true;
				touched[iconName + 'File'] = true;
				touched[iconName + 'Type'] = true;

				stateUpdate.touched = touched;

				this.setState(stateUpdate);

			} else {
				this.showImagePanel(evt, iconName);
			}
		}
	}

	handleOverlayChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let touched = this.state.touched || {};
		touched[name] = true;

		let stateUpdate = {
			[name]: value,
			touched
		};

		if(this.state.valid && !this.state.valid[name]) {
			stateUpdate.valid = {
				[name]: true
			};
		}

		this.setState(stateUpdate);
	}

	handleConfirm = () => {
		let iconName = this.state.iconName;
		let identifier = (iconName === 'defaultIcon') ? 'customDefault' : 'customHidden';
		let stateUpdate = {
			selected: this.state.selected,
			showImagePanel: false
		};

		stateUpdate.selected[iconName] = identifier;
		this[iconName + 'Selected'] = this[iconName + 'Preview'];
		stateUpdate[iconName + 'Selected'] = this.state[iconName + 'Preview'];

		this.setState(stateUpdate);
	}

	handleTabSelect = (idx, lastIdx, evt) => {
		if(!this.state.isMod) {
			if(idx === 1 && !this.state.eventTabActive) {
				this.setState({
					eventTabActive: true
				});
			} else if(idx !== 1 && this.state.eventTabActive) {
				this.setState({
					eventTabActive: false
				});
			}
		}
	}

	handleSave = () => {
		this.setState({
			loading: true
		});

		let defaultPromise, hiddenPromise, graphicPromise;
		let payload = {};

		let {
			defaultIcon,
			defaultIconFile,
			defaultIconSelected,
			hiddenIcon,
			hiddenIconFile,
			hiddenIconSelected,
			graphic,
			graphicFile,
			graphicSelected,
			...other
		} = this.state.touched;
		
		//check for default change
		if(defaultIcon) {
			//change made to default icon
			if(defaultIconFile) {
				//need to upload
				defaultPromise = new Promise((resolve, reject) => {
					var defaultReader = new FileReader();
					defaultReader.addEventListener("load", () => {
						payload.defaultIcon = defaultReader.result;
						payload.defaultIconName = this.state.defaultIconFile.name;
						payload.defaultIconType = this.state.defaultIconType;
						resolve();
					});
					defaultReader.readAsDataURL(this.state.defaultIconFile);
				});
			} else {
				payload.defaultImage = this.state.defaultIconSelected
				defaultPromise = Promise.resolve();
			}
		} else {
			defaultPromise = Promise.resolve();
		}
		//check for hidden change
		if(hiddenIcon) {
			//change made to default icon
			if(hiddenIconFile) {
				//need to upload
				hiddenPromise = new Promise((resolve, reject) => {
					var hiddenReader = new FileReader();
					hiddenReader.addEventListener("load", () => {
						payload.hiddenIcon = hiddenReader.result;
						payload.hiddenIconName = this.state.hiddenIconFile.name;
						payload.hiddenIconType = this.state.hiddenIconType;
						resolve();
					});
					hiddenReader.readAsDataURL(this.state.hiddenIconFile);
				});
			} else {
				payload.hiddenImage = this.state.hiddenIconSelected
				hiddenPromise = Promise.resolve();
			}
		} else {
			hiddenPromise = Promise.resolve();
		}

		if(graphic) {
			if(graphicFile) {
				graphicPromise = new Promise((resolve, reject) => {
					var graphicReader = new FileReader();
					graphicReader.addEventListener("load", () => {
						payload.overlay = payload.overlay || {};
						payload.overlay.graphic = graphicReader.result;
						payload.overlay.graphicName = this.state.graphicFile.name;
						resolve();
					});
					graphicReader.readAsDataURL(this.state.graphicFile);
				});
			} else {
				payload.overlay = payload.overlay || {};
				payload.overlay.graphic = ""
				graphicPromise = Promise.resolve();
			}
		} else {
			graphicPromise = Promise.resolve();
		}

		Promise.all([defaultPromise, hiddenPromise, graphicPromise]).then(results => {
			if(other) {
				let otherKeys = Object.keys(other);
				payload.overlay = payload.overlay || {};
				otherKeys.forEach(key => {
					payload.overlay[key] = this.state[key];
				});
			}

			if(Object.keys(payload).length > 0) {
				//changes made, call to service
				axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/preferences', payload, {
					withCredentials: true
				}).then((res) => {
					let stateUpdate = {
						channel: res.data.channel,
						loading: false,
						touched: {}
					};

					if(res.data.images) {
						stateUpdate.images = res.data.images;
					}

					this.setState(stateUpdate);
				});
			}
		
		});
	}

	copyReferralLink = () => {
		this._referral.select();
		document.execCommand("copy");
		document.getSelection().removeAllRanges();
	}

	toggleReorder = () => {
		if(!this.state.isMod) {
			this.setState({
				preorderedAchievements: this.state.achievements.slice(0),
				reordering: true,
				showAction: false
			});	
		}
	}

	onDragEnd = result => {
		
		if(result.destination) {
			let achievements = this.state.achievements;

			let source = result.source.index;
			let destination = result.destination.index;

			let movedAchievement = achievements.splice(source, 1);

				achievements.splice(destination, 0, movedAchievement[0]);

			this.setState({
				achievements
			});
		}
		
	}

	saveReorder = () => {
		this.setState({
			reordering: false,
			loading: true
		});

		let achievements = this.state.achievements.map((ach, idx) => {
			return {
				...ach,
				order: idx
			}
		});

		axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/reorder', {
			achievements
		},{
			withCredentials: true
		}).then((res) => {
			this.setState({
				loading: false
			});
		});
	}

	showPopup = (key) => {
		this.setState({
			showInfoPanel: true
		});
	}

	showDeletePopup = () => {
		this.setState({
			showDeletePopup: true
		});
	}

	updateModerators = (moderators) => {
		//TODO
	}

	handleDeleteText = (evt) => {
		let field = evt.target;

		if(field.name="delete") {
			this.setState({
				deleteVerify: (field.value === this.state.channel.owner.toUpperCase())
			});
		}
	}

	handleDeleteChannel = () => {
		this.setState({
			loading: true
		}, () => {
			axios.post(process.env.REACT_APP_API_DOMAIN + 'api/channel/delete', {
				channel: this.state.channel.owner
			}, {
				withCredentials: true
			}).then(res => {
				if(res.data.delete) {
					this.props.dispatch(updateStatus({status: "viewer"}));
					//redirect to home page
					this.props.history.push('/home');
				} else {
					//prompt error
					this.setState({
						loading: false,
						notice: "An error occured while deleting your channel! Try again later, or contact us via Discord!"
					});
				}
			})
		})
	}

	render() {

		if(this.props.profile && !this.props.profile.stats === 'verified') {
			return (<Redirect to='/home' />);
		}

		let generalContent, eventContent, moderatorContent, achievementTab, imageContent, memberContent, imagePanel, infoPanel, isGold;

		if(this.state.channel) {

			if(this.state.isMod) {
				isGold = this.state.channel.gold
			} else if(this.props.patreon) {
				isGold = this.props.patreon.gold || false
			}

			let achievementRoute = '/dashboard/achievement';

			if(this.state.isMod) {
				achievementRoute = '/mod/' + this.props.match.params.channelid + '/achievement';
			}

			let {logo, owner, referral} = this.state.channel;
			let achievements = this.state.achievements;

			if(Array.isArray(this.state.filteredAchievements)) {

				achievements = this.state.filteredAchievements;
			}

			let customDefaultIcon, customHiddenIcon;

			if(isGold) {
				if(this.state.defaultIconPreview) {
					customDefaultIcon = (
						<div className="customDefaultImg">
							<img
								alt="Default Icon"
								name="customDefault"
								className={this.state.selected.defaultIcon === 'customDefault' ? ICON_SELECTED : ''}
								ref={(el) => (this.defaultIconPreview = el)}
								src={this.state.defaultIconPreview} 
							/>
						</div>
					);
				} else {
					customDefaultIcon = (
						<div className="defaultIcon--placeholder"></div>
					);
				}
				
				if(this.state.hiddenIconPreview) {
					customHiddenIcon = (
						<div className="customHiddenImg">
							<img
								alt="Hidden icon"
								name="customHidden"
								className={this.state.selected.hiddenIcon === 'customHidden' ? ICON_SELECTED : ''}
								ref={(el) => (this.hiddenIconPreview = el)} 
								src={this.state.hiddenIconPreview}
							/>
						</div>
					);
				} else {
					customHiddenIcon = (
						<div className="hiddenIcon--placeholder"></div>
					);
				}
			}

			let defaultBlurb;

			if(isGold) {
				defaultBlurb = (<p>Being a patreon supporter, you have the option to upload a custom icon for each achievement when creating one! Also, you can upload a custom image here to use for all achievements by default!</p>);
			} else {
				defaultBlurb = (<p>Wan't to provide your own custom icons for your achievements? Consider upgrading to <Link className="gold" to="/gold">StreamAchievement Gold!</Link> You will be able to upload an icon to use for all achievements, or provide a custom icon for each achievement when creating them!</p>);
			}


			if(this.state.showImagePanel) {
				imagePanel = (
					<ImagePanel 
						currentImage={this.state[this.state.iconName + 'Preview']}
						icons={this.state.images.gallery}
						onChange={this.handleIconChange}
						onConfirm={this.handleConfirm}
						onCancel={this.handleCancel}
					/>
				);
			} else {
				imagePanel = undefined;
			}

			let defaultHoverText = (this.state.defaultIconPreview) ? ((this.state.selected.defaultIcon === 'customDefault') ? 'Edit' : 'Select') : 'Upload';
			let hiddenHoverText = (this.state.hiddenIconPreview) ? ((this.state.selected.hiddenIcon === 'customHidden') ? 'Edit' : 'Select') : 'Upload';

			let generalWrapperClasses = "general-configuration";

			if(this.state.touched && Object.keys(this.state.touched).length > 0) {
				generalWrapperClasses += " generalTab--update"
			}

			let priGenContent;

			if(!this.state.isMod) {
				priGenContent = (
					<div>
						<h4>Basic Info</h4>
						<span className="subText">This information is managed by Twitch</span>
						<div className="section-wrapper basic-info">
							<div className="section-label">
						        <label htmlFor="name">Twitch Name</label>
						    </div>
						    <div className="section-value">
						        <span name="name">{owner}</span>
						    </div>
						</div>
						<div className="section-wrapper basic-info">
							<div className="section-label">
						        <label htmlFor="logo">Channel Logo</label>
						    </div>
						    <div className="section-value">
						        <span name="logo"><img alt="" src={logo} /></span>
						    </div>
						</div>
						<div className="section-wrapper basic-info referral">
							<div className="section-label">
								<label htmlFor="referral">
									<a href="javascript:;" onClick={() => {this.showPopup()}} className="gold">Referral Code</a>
								</label>
							</div>
							<div className="section-value">
								<span name="referral">{referral.code}</span>
								<TooltipWrapper
									hoverText="Copy to clipboard"
									actionText="Copied!"
									onClick={this.copyReferralLink}
								>
									<img alt="Copy Referral Link" src="https://res.cloudinary.com/phirehero/image/upload/v1578686410/link.png" />
								</TooltipWrapper>
								<input 
									style={{opacity: 0}} 
									value={`https://streamachievements.com/channel/create?referral=${referral.code}`} 
									ref={(el) => this._referral = el}
									onChange={() => {}}
								/>
							</div>
						</div>
						<h4>Channel Customization</h4>
						<div className="section-wrapper">
							<div className="section-label">
								<label htmlFor="defaultIcon">Default Icon for Achievements</label>
								<p>Choose an image to use for your achievements!</p>
								{defaultBlurb}
							</div>
							<div className="section-value default-icons">
								<div className={"formGroup icon-upload" + ((isGold) ? '' : ' disabled')}>
									<div
										className="defaultIcon"
										onClick={(evt) => this.handleCustomIcon(evt, 'defaultIcon')}
										onMouseEnter={() => {this.toggleHover(true, this.defaultHover)}}
										onMouseLeave={() => {this.toggleHover(false, this.defaultHover)}}
									>
				                    	{customDefaultIcon}
				                    	<div 
				                    		className="hoverText" 
				                    		ref={hover => (this.defaultHover = hover)}
			                    		>
			                    			{defaultHoverText}
		                    			</div>
			                    	</div>
			                    </div>
			                    <div className={"divider" + ((isGold) ? '' : ' disabled')}>
			                    	<span>OR</span>
			                    </div>
			                    <div className="defaultIcon--defaults">
				                    <img 
				                    	alt="" 
				                    	name="gold"
				                    	className={"icon--stock" + ((this.state.selected.defaultIcon === 'gold') ? ' ' + ICON_SELECTED : '')}
				                    	src={this.icons.default.gold}
				                    	onClick={(evt) => {this.handleIconSelect(evt, 'defaultIcon', this.icons.default.gold)}}
				                    	ref={el => (this.defaultGold = el)}
			                    	/>
				                    <img 
				                    	alt="" 
				                    	name="silver"
				                    	className={"icon--stock" + ((this.state.selected.defaultIcon === 'silver') ? ' ' + ICON_SELECTED : '')}
				                    	src={this.icons.default.silver} 
				                    	onClick={(evt) => {this.handleIconSelect(evt, 'defaultIcon', this.icons.default.silver)}}
				                    	ref={el => (this.defaultSilver = el)}
			                    	/>
				                    <img 
				                    	alt="" 
				                    	name="bronze"
				                    	className={"icon--stock" + ((this.state.selected.defaultIcon === 'bronze') ? ' ' + ICON_SELECTED : '')}
				                    	src={this.icons.default.bronze} 
				                    	onClick={(evt) => {this.handleIconSelect(evt, 'defaultIcon', this.icons.default.bronze)}}
				                    	ref={el => (this.defaultBronze = el)}
			                    	/>
		                    	</div>
							</div>
						</div>
						<div className="section-wrapper">
							<div className="section-label">
						        <label htmlFor="unearnedIcon">Hidden Achievement Icon</label>
						        <p>This will be the icon used when displaying an achievement that hasn't been earned yet</p>
						    </div>
						    <div className="section-value default-icons">
						    	<div className={"formGroup icon-upload" + ((isGold) ? '' : ' disabled')}>
									<div
										className="hiddenIcon"
										onClick={(evt) => this.handleCustomIcon(evt, 'hiddenIcon')}
										onMouseEnter={() => {this.toggleHover(true, this.hiddenHover)}}
										onMouseLeave={() => {this.toggleHover(false, this.hiddenHover)}}
									>
				                    	{customHiddenIcon}
				                    	<div className="hoverText" ref={hover => (this.hiddenHover = hover)}>{hiddenHoverText}</div>
			                    	</div>
			                    </div>
			                    <div className={"divider" + ((isGold) ? '' : ' disabled')}>
			                    	<span>OR</span>
			                    </div>
						        <img 
						        	alt="" 
						        	name="default"
						        	className={"icon--stock" + ((this.state.selected.hiddenIcon === 'default') ? ' ' + ICON_SELECTED : '')}
						        	src={this.icons.hidden} 
						        	onClick={(evt) => {this.handleIconSelect(evt, 'hiddenIcon', this.icons.hidden)}} 
						        	ref={el => (this.defaultHidden = el)}
						        />
						    </div>
						</div>
					</div>
				);
			}

			let deleteButtonClasses = "delete-channel--button";

			let graphic;

			if(this.state.graphic) {
				graphic = this.state.graphic
			} else if(this.state.graphicPreview) {
				graphic = this.state.graphicPreview
			}

			generalContent = (
				<div className={generalWrapperClasses}>
						{priGenContent}
						<AlertConfig 
							oid={this.state.channel.oid}
							overlay={this.state.overlay}
							onChange={this.handleOverlayChange}
							onGraphicChange={this.handleIconChange}
							isMod={this.state.isMod}
							setNotice={this.setNotice}
							isGold={isGold}
							graphic={graphic}
						/>
						<h4>Delete Channel</h4>
						<div className="section-wrapper delete-channel">
							{/* Make promptDelete take param to reuse for delete */}
							<button className="delete-channel--button" onClick={this.showDeletePopup}>Delete Channel</button>
						</div>
						{imagePanel}
						<div className="saveReorder--wrapper">
							<button className="saveReorder--button" type="button" onClick={this.handleSave}>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1564251099/save-icon-shadow.png" />
							</button>
						</div>
				</div>
			);

			if(this.state.events.length > 0) {
				eventContent = (
					<div className="events-wrapper">
						{this.state.events.map((event, idx) => {
							let classes = "event";

							if(idx % 2 !== 0) {
								classes += " stripe";
							}
							
							return (
								<div key={"event." + idx} className={classes}>
									<div className="event-title">
										<span className="event-member">{event.member}</span>
										<span> earned the </span>
										<span className="event-achievement">{event.achievement}</span>
										<span> achievement</span>
									</div>
									<span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
								</div>
							)
						})}
					</div>
				);
			} else {
				eventContent = (
					<div className="events-wrapper">
						<h3>No achievements have been logged yet!</h3>
					</div>
				)
			}

			moderatorContent = (<ModeratorPanel channel={this.state.channel.owner} moderators={this.state.moderators} onUpdate={this.updateModerators} />);

			let modal;

			if(this.state.isModalActive) {
				modal = (
					<GiftAchievementModal 
						aid={this.state.aid}
						channel={this.state.channel.owner}
						active={this.state.isModalActive}
						onClose={this.hideGiftModal}
						onSubmit={this.hideGiftModal}
						isMod={this.state.isMod}
					/>
				);
			} else {
				modal = undefined;
			}

			if(achievements.length === 0 && !this.state.filteredAchievements) {
				achievementTab = (
					<div>
						<div onClick={() => {
							this.props.history.push(achievementRoute);
						}} className="add-achievement">
							<div>Add your first achievement!</div>
							<div><img alt="plus icon" src={require('../img/plus.png')} /></div>
						</div>
					</div>
				);
			} else {
				let actionClasses = "achievementsHeader--actions";

				if(this.state.showAction) {
					actionClasses += " achievementsHeader--actionsVisible";
				}

				let saveAction = undefined;
				let wrapperClass = "achievementTab";
				let actionText = "Actions";

				if(this.state.reordering) {
					saveAction = this.saveReorder;
					actionText = "Cancel Reorder";
					wrapperClass += " achievementTab--reordering"
				}

				let reorderLink;

				if(!this.state.isMod) {
					reorderLink = (<li><a href="javascript:;" onClick={this.toggleReorder}>Reorder</a></li>);
				}

				achievementTab = (
					<div className={wrapperClass}>
						<div className="achievementsHeader">
							<h3>Showing {achievements.length} Achievements</h3>
							<div className="achievement-search">
								<input placeholder="Search for achievement..." type="text" onChange={this.filterList} />
							</div>
							<div className="achievementsHeader--actionMenu">
								<button 
									type="button" 
									className="achievementsHeader--menu" 
									onClick={this.handleAction}
									onBlur={this.handleActionBlur}
								>
									{actionText}
								</button>
								<div className={actionClasses}>
									<ul>
										<li><Link to={achievementRoute}>Create</Link></li>
										{reorderLink}
									</ul>
								</div>
							</div>
						</div>
						<DragDropContext onDragEnd={this.onDragEnd}>
							<Droppable droppableId={"achievement-list"}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="achievement-list"
									>
										{achievements.map((achievement, index) => {
											let className = '';

											if(achievement.achType === '4' && !isGold && !achievement.unlocked) {
												className = 'achievement--disabled';
											}
											return (
												<Achievement 
													key={'achievement-' + index}
													unlocked={isGold || achievement.unlocked}
													className={className}
													editable={true}
													achievement={achievement}
													onGift={this.showGiftModal}
													defaultIcons={this.state.channel.icons}
													onClick={() => {this.props.history.push(achievementRoute + '/' + achievement.uid)}}
													onTest={this.handleTestAchievement}
													draggable={this.state.reordering}
													index={index}
												/>
											)
										})}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
						{modal}
						<div className="saveReorder--wrapper">
							<button className="saveReorder--button" type="button" onClick={saveAction}>
								<img src="https://res.cloudinary.com/phirehero/image/upload/v1564251099/save-icon-shadow.png" />
							</button>
						</div>
					</div>
				);
			}

			if(!this.state.isMod && this.state.images.gallery.length > 0) {
				imageContent = (
					<div>
						<div className="imageGallery">
							{this.state.images.gallery.map((image, index) => {
								let classNames = "image--wrapper";
								let label;

								if(image.achievementID) {
									classNames += " active"
								} else if(image.type === 'default' && this.state.channel.icons.default === image.url) {
									classNames += " default";
									label = (<div className="image--label">Default</div>);
								} else if(image.type === 'hidden' && this.state.channel.icons.hidden === image.url) {
									classNames += " default"
									label = (<div className="image--label">Hidden</div>);
								}
								return (
									<div key={'image-' + index} className={classNames}>
										<div className="deleteImg" onClick={() => {this.promptDelete(image)}}><div className="icon"></div></div>
										<img alt="" src={image.url}	/>
										{label}
									</div>
								);
							})}
						</div>
					</div>
				);
			} else {
				imageContent = (
					<div>
						<div className="imageGallery">
							<h3>You currently don't have any images!</h3>
						</div>
					</div>
				);
			}

			

			memberContent = <MembersPanel 
								isMod={this.state.isMod}
								members={this.state.members}
								achievements={this.state.achievements}
								offset={this.state.membersOffset}
								channel={this.state.channel}
							/>

		} else {
			generalContent = (<LoadingSpinner />);
			moderatorContent = (<LoadingSpinner />);
			achievementTab = (<LoadingSpinner />);
			imageContent = (<LoadingSpinner />);
			memberContent = (<LoadingSpinner />);
		}

		const params = new URLSearchParams(this.props.location.search);
		const tab = params.get('tab');
		let tabIndex = 0;

		let confirmPanel;

		if(this.state.showConfirm) {
			confirmPanel = (
				<ConfirmPanel
					onConfirm={this.handleImageDelete}
					onCancel={() => {this.setState({showConfirm: false})}}
				>
					<div className="delete-image--confirm">
						<div>Are you sure you want to delete this image?</div>
						<img alt="" src={this.state.imageToDelete.url} />
					</div>
				</ConfirmPanel>
			);
		}

		if(this.state.isMod) {
			if(tab === 'achievements') {
				tabIndex = 1
			}
		} else {

			switch(tab) {
				case 'events':
					tabIndex = 1;
					if(!this.state.eventTabActive && this.state.loading) {
						this.setState({
							eventTabActive: true
						});
					}
					break;
				case 'moderators':
					tabIndex = 2;
					break;
				case 'achievements':
					tabIndex = 3;
					break;
				case 'images':
					tabIndex = 4;
					break;
				case 'rankings':
					tabIndex = 5;
					break;
				default:
					break;
			}
		}

		let tabs, tabContent;

		if(this.state.isMod) {
			tabs = (
				<React.Fragment>
					<Tab className="manage-tab">General</Tab>
					<Tab className="manage-tab">Achievements</Tab>
				</React.Fragment>
			);

			tabContent = (
				<React.Fragment>
					<TabPanel>
						{generalContent}
					</TabPanel>
					<TabPanel>
						{achievementTab}
					</TabPanel>
				</React.Fragment>
			)
		} else {
			tabs = (
				<React.Fragment>
					<Tab className="manage-tab">General</Tab>
					<Tab className="manage-tab">Events</Tab>
					<Tab className="manage-tab">Integrations</Tab>
					<Tab className="manage-tab">Achievements</Tab>
					<Tab className="manage-tab">Members</Tab>
					<Tab className="manage-tab">Moderators</Tab>
					{this.state.channel.gold && <Tab className="manage-tab">Images</Tab>}
				</React.Fragment>
			);

			tabContent = (
				<React.Fragment>
					<TabPanel>
						{generalContent}
					</TabPanel>
					<TabPanel>
						{eventContent}
					</TabPanel>
					<TabPanel>
						<ChannelIntegrationsPanel channel={this.state.channel} updateChannel={this.updateChannel} />
					</TabPanel>
					<TabPanel>
						{achievementTab}
					</TabPanel>
					<TabPanel>
						{memberContent}
					</TabPanel>
					<TabPanel>
						{moderatorContent}
					</TabPanel>
					{this.state.channel.gold && <TabPanel>
						{imageContent}
						{confirmPanel}
					</TabPanel>}
				</React.Fragment>
			)
		}

		let pageHeader, deletePopup;

		if(this.state.isMod) {
			pageHeader = (<h2><span className="capitalize">{this.state.channel.owner}</span>'s Dashboard <span className="gold">[MODERATOR]</span></h2>);
		} else {
			pageHeader = (<h2>Your Dashboard</h2>);
		}

		if(this.state.showInfoPanel) {
			infoPanel = (
				<InfoPanel 
					title={this._info.title}
					onClose={() => {this.setState({showInfoPanel: false})}}
				>
					{this._info.content}
				</InfoPanel>
			);
		} else {
			infoPanel = undefined;
		}

		if(this.state.showDeletePopup) {
			let deleteButtonClasses = "delete-channel--button";

			if(this.state.deleteVerify) {
				deleteButtonClasses += " active";
			}

			deletePopup = (
				<InfoPanel
					title="Confirm Delete Channel"
					onClose={() => {this.setState({
						showDeletePopup: false,
						deleteVerify: false
					})}}
				>
					<div className="delete-channel">
						<div className="section-label">
					        <label htmlFor="delete">
					        	<span>By deleting your channel, all achievements created by you and earned for your channel will be deleted!</span>
					        	<span>THIS IS IRREVERSABLE!</span>
					        	<span>To delete your channel, type your channel's name in all caps in the box below</span>
				        	</label>
					    </div>
					    <div className="section-value">
					        <input 
					        	id="delete-channel"
					        	name="delete"
					        	onChange={this.handleDeleteText}
					        />
					    </div>
					</div>
					<div className="delete-channel">
						{/* Make promptDelete take param to reuse for delete */}
						<button className={deleteButtonClasses} disabled={!this.state.deleteVerify} onClick={this.handleDeleteChannel}>Delete Channel</button>
					</div>
				</InfoPanel>
			)
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="manage-container">
					{pageHeader}
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs defaultIndex={tabIndex} onSelect={this.handleTabSelect}>
						<TabList className="manage-tabs">
							{tabs}
						</TabList>
						{tabContent}
					</Tabs>
				</div>
            	{infoPanel}
            	{deletePopup}
			</Template>
		);
	}
}

class AchievementList extends React.Component {

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(DashboardPage);