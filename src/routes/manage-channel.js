import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import connector from '../redux/connector';
import {Link} from 'react-router-dom';

import Notice from '../components/notice';
import Template from '../components/template';
import Achievement from '../components/achievement';
import GiftAchievementModal from '../components/gift-achievement';
import ConfirmPanel from '../components/confirm-panel';
import LoadingSpinner from '../components/loading-spinner';
import ImagePanel from '../components/image-panel';

import './manage-channel.css';

const ICON_SELECTED = 'icon--selected';

class ManageChannel extends React.Component {

	constructor() {
		super();

		this.state = {
			channel: '',
			achievements: '',
			notice: '',
			showConfirm: false,
			loading: true,
			showImagePanel: false,
			selected: {
				defaultIcon: '',
				hiddenIcon: ''
			}
		};

		this.icons = {
			default: {
				gold: "https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png",
				silver: "https://res.cloudinary.com/phirehero/image/upload/v1558834120/default-icon-silver.png",
				bronze: "https://res.cloudinary.com/phirehero/image/upload/v1559961119/default-icon-bronze.png"
			},
			hidden: "https://res.cloudinary.com/phirehero/image/upload/v1558811887/hidden-icon.png"
		};
	}

	componentDidMount() {

		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/retrieve', {
			withCredentials: true
		}).then((res) => {
			if(res.data.error) {
				//redirect to home
			} else {

				let stateUpdate = {
					channel: res.data.channel,
					achievements: res.data.achievements,
					images: res.data.images,
					members: res.data.members,
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

  	showGiftModal = (aid) => {

  		this.setState({
			isModalActive: true,
			aid
		});	
		
	}

	hideGiftModal = (members) => {
		
		let stateUpdate = {
			isModalActive: false,
			notice: "Awarded achievements successfully!"
		};

		if(members) {
			stateUpdate.members = members;
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

	handleIconChange = (event) => {
		let touched = this.state.touched || {};
		let name = event.target.name;
		touched[name] = true;

		if(event.target.files[0]) {

			let stateUpdate = {
				file: event.target.files[0],
				touched: touched
			};

			stateUpdate[name + 'Preview'] = URL.createObjectURL(event.target.files[0]);
			
			this.setState(stateUpdate);	
		} else {

			let stateUpdate = {
				file: '',
				touched
			};

			stateUpdate[name + 'Preview'] = '';

			this.setState(stateUpdate);
		}
		
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
						touched[this.state.iconName] = true;
						touched[this.state.iconName + 'File'] = true;
						touched[this.state.iconName + 'Name'] = true;
						touched[this.state.iconName + 'Preview'] = true;

						let newPreview = URL.createObjectURL(file);

						let stateUpdate = {
							touched
						};

						stateUpdate[this.state.iconName + 'File'] = file;
						stateUpdate[this.state.iconName + 'Name'] = file.name;
						stateUpdate[this.state.iconName + 'Preview'] = newPreview;

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
				touched[this.state.iconName] = true;
				
				let stateUpdate = {
					touched
				};

				stateUpdate[this.state.iconName + 'File'] = '';
				stateUpdate[this.state.iconName + 'Name'] = '';
				stateUpdate[this.state.iconName + 'Preview'] = '';

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

				let touched = this.state.touched || {};

				touched[iconName] = true;
				touched[iconName + 'File'] = true;

				stateUpdate.touched = touched;

				this.setState(stateUpdate);

			} else {
				this.showImagePanel(evt, iconName);
			}
		}
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

	handleSave = () => {
		this.setState({
			loading: true
		});

		let defaultPromise, hiddenPromise;
		let payload = {};
		
		//check for default change
		if(this.state.touched.defaultIcon) {
			//change made to default icon
			if(this.state.touched.defaultIconFile) {
				//need to upload
				defaultPromise = new Promise((resolve, reject) => {
					var defaultReader = new FileReader();
					defaultReader.addEventListener("load", () => {
						payload.defaultIcon = defaultReader.result;
						payload.defaultIconName = this.state.defaultIconFile.name;
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
		if(this.state.touched.hiddenIcon) {
			//change made to default icon
			if(this.state.touched.hiddenIconFile) {
				//need to upload
				hiddenPromise = new Promise((resolve, reject) => {
					var hiddenReader = new FileReader();
					hiddenReader.addEventListener("load", () => {
						payload.hiddenIcon = hiddenReader.result;
						payload.hiddenIconName = this.state.hiddenIconFile.name;
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

		Promise.all([defaultPromise, hiddenPromise]).then(results => {
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

	render() {

		if(this.props.profile && !this.props.profile.stats === 'verified') {
			return (<Redirect to='/home' />);
		}

		let generalContent, achievementTab, imageContent, memberContent, imagePanel;

		if(this.state.channel) {

			let {logo, owner} = this.state.channel;
			let achievements = this.state.achievements;

			if(Array.isArray(this.state.filteredAchievements)) {

				achievements = this.state.filteredAchievements;
			}

			let customDefaultIcon, customHiddenIcon;

			if(this.props.patreon && this.props.patreon.gold) {
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

			if(this.props.patreon && this.props.patreon.gold) {
				defaultBlurb = (<p>Being a patreon supporter, you have the option to upload a custom icon for each achievement when creating one! Also, you can upload a custom image here to use for all achievements by default!</p>);
			} else {
				defaultBlurb = (<p>Wan't to provide your own custom icons for your achievements? Consider becoming a Patreon! You will be able to upload an icon to use for all achievements, or provide a custom icon for each achievement when creating them!</p>);
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

			let saveButton;

			if(this.state.touched && Object.keys(this.state.touched).length > 0) {
				saveButton = <input className='save-button--active' type="submit" value="Save" onClick={this.handleSave} />
			} else {
				saveButton = <input className='save-button--inactive' disabled type="submit" value="Save" />
			}

			generalContent = (
				<div className="general-configuration">
					<h4>Basic Info</h4>
					<span className="subText">This information is managed by Twitch</span>
					<div className="section-wrapper">
						<div className="section-label">
					        <label htmlFor="name">Twitch Name</label>
					    </div>
					    <div className="section-value">
					        <span name="name">{owner}</span>
					    </div>
					</div>
					<div className="section-wrapper">
						<div className="section-label">
					        <label htmlFor="logo">Channel Logo</label>
					    </div>
					    <div className="section-value">
					        <span name="logo"><img alt="" src={logo} /></span>
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
								<div className={"formGroup icon-upload" + ((this.props.patreon && this.props.patreon.gold) ? '' : ' disabled')}>
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
			                    <div className={"divider" + ((this.props.patreon && this.props.patreon.gold) ? '' : ' disabled')}>
			                    	<span>OR</span>
			                    </div>
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
						<div className="section-wrapper">
							<div className="section-label">
						        <label htmlFor="unearnedIcon">Hidden Achievement Icon</label>
						        <p>This will be the icon used when displaying an achievement that hasn't been earned yet</p>
						    </div>
						    <div className="section-value default-icons">
						    	<div className={"formGroup icon-upload" + ((this.props.patreon && this.props.patreon.gold) ? '' : ' disabled')}>
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
			                    <div className={"divider" + ((this.props.patreon && this.props.patreon.gold) ? '' : ' disabled')}>
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
						<div className="section-wrapper--end">
							 {saveButton}
						</div>
						{imagePanel}
				</div>
			);

			let modal;

			if(this.state.isModalActive) {
				modal = (
					<GiftAchievementModal 
						aid={this.state.aid}
						channel={this.state.channel._id}
						active={this.state.isModalActive}
						onClose={this.hideGiftModal}
						onSubmit={this.hideGiftModal}
						members={this.state.members}
					/>
				);
			} else {
				modal = undefined;
			}

			if(achievements.length === 0 && !this.state.filteredAchievements) {
				achievementTab = (
					<div>
						<div onClick={() => {
							this.props.history.push('/manage/achievement');
						}} className="add-achievement">
							<div>Add your first achievement!</div>
							<div><img alt="plus icon" src={require('../img/plus.png')} /></div>
						</div>
					</div>
				);
			} else {
				achievementTab = (
					<div>
						<div className="achievementsHeader">
							<h3>Showing {achievements.length} Achievements</h3>
							<div className="achievement-search">
								<input placeholder="Search for achievement..." type="text" onChange={this.filterList} />
							</div>
							<div className="achievementsHeader--add">
								<Link to={"/manage/achievement"}>Add New...<div className="achievementsHeader--plus">
									<img alt="" src={require('../img/plus.png')} />
								</div></Link>
								
							</div>
						</div>
						{achievements.map((achievement, index) => {
							let className = '';

							if(achievement.code === '4' && !this.props.patreon.gold) {
								className = 'achievement--disabled';
							}
							return (
								<Achievement 
									key={'achievement-' + index}
									unlocked={this.props.patreon && this.props.patreon.gold}
									className={className}
									editable={true}
									achievement={achievement}
									onGift={this.showGiftModal}
									defaultIcons={this.state.channel.icons}
									onClick={() => {this.props.history.push('/manage/achievement/' + achievement.uid)}}
								/>
							)
						})}
						{modal}
					</div>
				);
			}

			if(this.state.images.gallery.length > 0) {
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

			

			memberContent = (
				this.state.members.map((member, index) => (
					<div key={'member-' + index} className={"channelMember" + ((index % 2 === 1) ? " channelMember--stripe" : "")}>
						<div className="member-logo">
							<img alt="" src={member.logo} />
						</div>
						<div className="member-info">
							{member.name}
						</div>
					</div>
				))
			);
		} else {
			generalContent = (<LoadingSpinner />);
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

		switch(tab) {
			case 'achievements':
				tabIndex = 1;
				break;
			case 'images':
				tabIndex = 2;
				break;
			case 'rankings':
				tabIndex = 3;
				break;
			default:
				break;
		}

		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="manage-container">
					<h2>Manage Channel</h2>
					<Notice message={this.state.notice} onClear={this.clearNotice} />
					<Tabs defaultIndex={tabIndex}>
						<TabList className="manage-tabs">
							<Tab className="manage-tab">General</Tab>
							<Tab className="manage-tab">Achievements</Tab>
							<Tab className="manage-tab">Images</Tab>
							<Tab className="manage-tab">Rankings</Tab>
						</TabList>
						<TabPanel>
							{generalContent}
						</TabPanel>
						<TabPanel>
							{achievementTab}
						</TabPanel>
						<TabPanel>
							{imageContent}
							{confirmPanel}
						</TabPanel>
						<TabPanel>
							<h3>Rankings</h3>
							{memberContent}
						</TabPanel>
					</Tabs>
				</div>
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile,
		patreon: state.patreon
	};
}

export default connector(headerMapStateToProps)(ManageChannel);

//export default ManageChannel;