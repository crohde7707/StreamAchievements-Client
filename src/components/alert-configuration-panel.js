import React from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner';

import './alert-configuration-panel.css';

const ICON_SELECTED = 'icon--selected';

export default class AlertConfigurationPanel extends React.Component {

	constructor(props) {
		console.log(props.overlay.chat);
		super(props);

		let overlay = props.overlay || {};
		let sfx = '001';

		if(overlay.sfx) {
			let regex = new RegExp(/streamachievements\.com\/sounds\/achievement\.(?<sfx>[0-9]+)\.mp3/);
			let match = overlay.sfx.match(regex);
			if(match) {
				sfx = match[1];
			} else {
				sfx = overlay.sfx
			}
		}

		this.icons = {
			layout1: "https://res.cloudinary.com/phirehero/image/upload/v1586198072/layout-1.png",
			layout2: "https://res.cloudinary.com/phirehero/image/upload/v1586198072/layout-2.png",
			layout3: "https://res.cloudinary.com/phirehero/image/upload/v1586198072/layout-3.png"
		}

		this.state = {
			chat: (overlay.chat !== undefined) ? overlay.chat : true,
			chatMessage: overlay.chatMessage || "",
			sfx: sfx,
			enterEffect: overlay.enterEffect || "easeIn",
			exitEffect: overlay.exitEffect || "easeOut",
			volume: overlay.volume || 100,
			duration: overlay.duration || 1,
			delay: overlay.delay || 2,
			custom: overlay.custom || false,
			graphic: overlay.graphic || undefined,
			layout: overlay.layout || 1,
			textColor: overlay.textColor || "rgb(0,0,0)",
			titleFontSize: overlay.titleFontSize || 64,
			showDescription: overlay.showDescription || true,
			descFontSize: overlay.descFontSize || 40,
			copyurl: false,
			loading: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.graphic !== this.props.graphic && this.state.graphic !== this.props.graphic) {
			this.setState({
				graphic: this.props.graphic
			})
		}
	}

	handleLayoutChange = (name, value) => {
		let stateUpdate = {
			[name]: value
		};

		this.setState(stateUpdate);

		this.props.onChange({
			target: {
				name,
				value
			}
		});
	}

	removeGraphic = (event) => {
		event.preventDefault();
		event.stopPropagation();

		this.setState({
			graphic: ''
		})

		this.props.onChange({
			target: {
				name: 'graphic',
				value: ''
			}
		});
		
	}

	handleDataChange = (evt) => {
		const target = evt.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let stateUpdate = {
			[name]: value
		};

		this.setState(stateUpdate);
		this.props.onChange(evt);
	}

	isInvalid = (field) => {
		if(this.state.valid && typeof this.state.valid[field] === 'boolean' && !this.state.valid[field]) {
			return true;
		} else {
			return false;
		}
	}

	playSound = () => {
		this.audioRef.play();
	}

	copyOverlayURL = () => {
		this.setState({
			copyurl: true
		});
		this._overlayURL.select();
		document.execCommand("copy");
		document.getSelection().removeAllRanges();
		this._copyURL.focus();
		setTimeout(() => {
			this.setState({
				copyurl: false
			});
		}, 1000);
	}

	testAlert = () => {
		this.setState({
			loading: true
		}, () => {
			axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/testOverlay', {
				withCredentials: true
			}).then((res) => {
				setTimeout(() => {
					this.setState({
						loading: false
					});
					this.props.setNotice("Test Alert Sent!");
				}, 300)
			});
		})
	}

	onChange = (event) => {
		this.props.onChange(event).then(res => {
			if(res.error) {
				console.log(res.error);
			}
		});
	}

	toggleHover = (showHover, node) => {
		if(showHover) {
			node.classList.add('hoverText--active');
		} else {
			node.classList.remove('hoverText--active');
		}
	}

	render() {
		let audioSrc = `/sounds/achievement.${this.state.sfx}.mp3`;
		let audioVolume = parseFloat(this.state.volume) / 100;

		let chatMessage, customSection;

		let tooltipClasses = "tooltip";
		let copyText = "Copy to clipboard";

		if(this.state.copyurl) {
			copyText = "Copied!";
			tooltipClasses += " copied";
		}

		if(this.state.chat) {
			chatMessage = (
				<div className="section-wrapper">
				    <div className="section-label">
				        <label htmlFor="chatMessage">Custom Chat Message</label>
				    </div>
				    <div className="section-value chatMessage">
				       <input
							id="alert-message"
							name="chatMessage"
							className="textInput"
							type="text"
							value={this.state.chatMessage}
							placeholder="{user} just earned the {achievement} achievement! PogChamp"
							onChange={this.handleDataChange}
						/>
						<div className="helpText">Don't forget your identifiers! ({" {user}, {achievement} "})</div>
				    </div>
				</div>
			)
		} else {
			chatMessage = undefined;
		}

		let overlayURLContent, chatToggleContent;

		if(!this.props.isMod) {
			overlayURLContent = (
				<div className="section-wrapper overlay-url-section">
				    <div className="section-label">
				        <label htmlFor="message">Overlay URL</label>
				    </div>
				    <div className="section-value overlay-url">
				       	<div className="overlay-url--wrapper">
				       		<input 
				       			type="text"
				       			readOnly
				       			className="textInput overlay-url"
				       			ref={(el) => {this._overlayURL = el}}
				       			value={`https://streamachievements.com/overlay/${this.props.oid}`}
								onChange={this.handleDataChange}
				       		/>
				       		<div className={tooltipClasses}>
				       			<span className="tooltiptext" id="myTooltip">{copyText}</span>
								<button type="button" onClick={this.copyOverlayURL} ref={el => {this._copyURL = el}}>Copy</button>
			       			</div>
				       	</div>
				       	<div className="helpText">This URL is unique to you! Don't share it with anyone!</div>
				       	<div className="helpText">Set resolution to match your screen, then resize how you would like!</div>
				    </div>
				</div>
			);

			chatToggleContent = (
				<div className="section-group">
					<div className="section-wrapper section--inline">
					    <div className="section-label">
					        <label htmlFor="chat">Alert in Chat?</label>
					    </div>
					    <div className="section-value">
					       <div className="checkbox">
							<label className="switch" htmlFor="alert-chat" title="Toggle if the achievement will alert in chat">
							  	<input 
							  		id="alert-chat"
									name="chat"
									type="checkbox"
									className="textInput"
									checked={this.state.chat}
									value="chat"
									onChange={this.handleDataChange}
								/>
							  	<span className="slider round"></span>
							</label>
						</div>
					    </div>
					</div>
					{chatMessage}
				</div>
			);
		}

		if(this.props.isGold) {
			let previewImage, customContent, descriptionSection;

			let defaultHoverText;
			let graphicClasses = "defaultIcon";

			if(this.state.graphic) {
				previewImage = this.state.graphic
				defaultHoverText = "Edit"
			} else {
				graphicClasses += " graphic--blank";
				previewImage = 'https://res.cloudinary.com/phirehero/image/upload/v1558809631/upload.png' //update with empty image
				defaultHoverText = "Upload"
			}

			if(this.state.showDescription) {
				descriptionSection = (
					<div className="section-wrapper">
						<div className="section-label">
							<label htmlFor="layout">Member Font Size</label>
						</div>
						<div className="section-value">
							<input 
								id="alert-descFontSize"
								name="descFontSize"
								className="sliderInput"
								title="Description Font Size"
								onChange={this.handleDataChange}
								type="range"
								min={12}
								max={72}
								step={2}
								value={this.state.descFontSize}
							/>
							<span>{this.state.descFontSize}px</span>
						</div>
					</div>
				)
			}

			customContent = (
				<React.Fragment>
					<div className="section-wrapper">
						<div className="section-label">
							<label htmlFor="graphic">Alert Graphic</label>
							<p><i>Max Size: 1000px x 1000px</i></p>
						</div>
						<div className="section-value alert-graphic">
							<input
						        type="file"
						        id="graphic"
						        accept="image/png"
						        ref={fileInputEl =>
						            (this.fileInputEl = fileInputEl)
						        }
						        onChange={(evt) => this.props.onGraphicChange(evt, "graphic", 5000)}
						    />
							<div className="formGroup icon-upload">
								<div
									className={graphicClasses}
									onClick={(evt) => this.fileInputEl.click()}
									onMouseEnter={() => {this.toggleHover(true, this.defaultHover)}}
									onMouseLeave={() => {this.toggleHover(false, this.defaultHover)}}
								>
									<div className="deleteImg" onClick={this.removeGraphic}><div className="icon"></div></div>
			                    	<img src={previewImage} />
			                    	<div 
			                    		className="hoverText" 
			                    		ref={hover => (this.defaultHover = hover)}
		                    		>
		                    			{defaultHoverText}
	                    			</div>
		                    	</div>
		                    </div>
						</div>
					</div>
					<div className="section-wrapper">
						<div className="section-label">
							<label htmlFor="layout">Alert Layout</label>
						</div>
						<div className="section-value">
							<img 
		                    	alt="" 
		                    	name="layout-1"
		                    	className={"icon--stock" + ((this.state.layout === 1) ? ' ' + ICON_SELECTED : '')}
		                    	src={this.icons.layout1}
		                    	onClick={(evt) => {
		                    		this.handleLayoutChange("layout", 1)}}
		                    	ref={el => (this.layout1 = el)}
	                    	/>
	                    	<img 
		                    	alt="" 
		                    	name="layout-2"
		                    	className={"icon--stock" + ((this.state.layout === 2) ? ' ' + ICON_SELECTED : '')}
		                    	onClick={(evt) => {
		                    		this.handleLayoutChange("layout", 2)}}
		                    	src={this.icons.layout2}
		                    	ref={el => (this.layout2 = el)}
	                    	/>
	                    	<img 
		                    	alt="" 
		                    	name="layout-3"
		                    	className={"icon--stock" + ((this.state.layout === 3) ? ' ' + ICON_SELECTED : '')}
		                    	onClick={(evt) => {
		                    		this.handleLayoutChange("layout", 3)}}
		                    	src={this.icons.layout3}
		                    	ref={el => (this.layout3 = el)}
	                    	/>
						</div>
					</div>
					<div className="section-wrapper">
						<div className="section-label">
							<label htmlFor="layout">Text Color</label>
						</div>
						<div className="section-value">
							<input
								id="alert-textColor"
								name="textColor"
								className="textInput"
								type="color"
								value={this.state.textColor}
								onChange={this.handleDataChange}
							/>
						</div>
					</div>
					<div className="section-wrapper">
						<div className="section-label">
							<label htmlFor="layout">Title Font Size</label>
						</div>
						<div className="section-value">
							<input 
								id="alert-titleFontSize"
								name="titleFontSize"
								className="sliderInput"
								title="Title Font Size"
								onChange={this.handleDataChange}
								type="range"
								min={12}
								max={90}
								step={2}
								value={this.state.titleFontSize}
							/>
							<span>{this.state.titleFontSize}px</span>
						</div>
					</div>
					<div className="section-wrapper section--inline">
					    <div className="section-label">
					        <label htmlFor="custom">Display Member?</label>
					    </div>
					    <div className="section-value">
					    	<div className="checkbox">
								<label className="switch" htmlFor="alert-showDescription" title="Toggle if the achievement shows the member">
								  	<input 
								  		id="alert-showDescription"
										name="showDescription"
										type="checkbox"
										className="textInput"
										checked={this.state.showDescription}
										value="showDescription"
										onChange={this.handleDataChange}
									/>
								  	<span className="slider round"></span>
								</label>
							</div>
					    </div>
					</div>
					{(this.state.showDescription) ? descriptionSection : undefined}
				</React.Fragment>
			)
			
			customSection = (
				<React.Fragment>
					<div className="section-group--header">
						<h5>Custom Configuration</h5>
					</div>
					<div className="section-group">
						<div className="section-wrapper section--inline">
						    <div className="section-label">
						        <label htmlFor="custom">Customize Overlay?</label>
						    </div>
						    <div className="section-value">
						    	<div className="checkbox">
									<label className="switch" htmlFor="alert-custom" title="Toggle if the achievement can be earned">
									  	<input 
									  		id="alert-custom"
											name="custom"
											type="checkbox"
											className="textInput"
											checked={this.state.custom}
											value="chat"
											onChange={this.handleDataChange}
										/>
									  	<span className="slider round"></span>
									</label>
								</div>
						    </div>
						</div>
						{(this.state.custom) ? customContent : undefined}
					</div>
				</React.Fragment>
			)
		}

		return (
			<div className="alert-overlay">
				<h4>Alert Configuration</h4>
				<div className="section-group--header">
					<h5>General Configuration</h5>
				</div>
				{overlayURLContent}
				{chatToggleContent}
				<div className="section-group">
					<div className="section-wrapper">
					    <div className="section-label">
					        <label htmlFor="enterEffect">Enter Animation</label>
					    </div>
					    <div className="section-value">
					       <select 
								name="enterEffect"
								className={"selectInput" + ((this.isInvalid("enterEffect")) ? " invalid" : "")}
								title="Enter Animation"
								onChange={this.handleDataChange}
								value={this.state.enterEffect}
							>
								<optgroup label="Bounce">
						          <option value="bounceIn">Bounce In</option>
						          <option value="bounceInDown">Bounce In Down</option>
						          <option value="bounceInLeft">Bounce In Left</option>
						          <option value="bounceInRight">Bounce In Right</option>
						          <option value="bounceInUp">Bounce In Up</option>
						        </optgroup>
								<optgroup label="Fade">
						          <option value="fadeIn">Fade In</option>
						          <option value="fadeInDown">Fade In Down</option>
						          <option value="fadeInLeft">Fade In Left</option>
						          <option value="fadeInRight">Fade In Right</option>
						          <option value="fadeInUp">Fade In Up</option>
						        </optgroup>
						        <optgroup label="Flip">
						          <option value="flipInX">Flip In X</option>
						          <option value="flipInY">Flip In Y</option>
						        </optgroup>
						        <optgroup label="Slide">
						          <option value="slideInUp">Slide In Up</option>
						          <option value="slideInDown">Slide In Down</option>
						          <option value="slideInLeft">Slide In Left</option>
						          <option value="slideInRight">Slide In Right</option>
						        </optgroup>
						        <optgroup label="Zoom">
						          <option value="zoomIn">Zoom In</option>
						          <option value="zoomInDown">Zoom In Down</option>
						          <option value="zoomInLeft">Zoom In Left</option>
						          <option value="zoomInRight">Zoom In Right</option>
						          <option value="zoomInUp">Zoom In Up</option>
						        </optgroup>
							</select>
					    </div>
					</div>
					<div className="section-wrapper">
					    <div className="section-label">
					        <label htmlFor="exitEffect">Exit Animation</label>
					    </div>
					    <div className="section-value">
					       <select 
								name="exitEffect"
								className={"selectInput" + ((this.isInvalid("exitEffect")) ? " invalid" : "")}
								title="Exit Animation"
								onChange={this.handleDataChange}
								value={this.state.exitEffect}
							>
								<optgroup label="Bounce">
						          <option value="bounceOut">Bounce Out</option>
						          <option value="bounceOutDown">Bounce Out Down</option>
						          <option value="bounceOutLeft">Bounce Out Left</option>
						          <option value="bounceOutRight">Bounce Out Right</option>
						          <option value="bounceOutUp">Bounce Out Up</option>
						        </optgroup>
						        <optgroup label="Fade">
						          <option value="fadeOut">Fade Out</option>
						          <option value="fadeOutDown">Fade Out Down</option>
						          <option value="fadeOutLeft">Fade Out Left</option>
						          <option value="fadeOutRight">Fade Out Right</option>
						          <option value="fadeOutUp">Fade Out Up</option>
						        </optgroup>
						        <optgroup label="Flip">
						          <option value="flipOutX">Flip Out X</option>
						          <option value="flipOutY">Flip Out Y</option>
						        </optgroup>
						        <optgroup label="Slide">
						          <option value="slideOutUp">Slide Out Up</option>
						          <option value="slideOutDown">Slide Out Down</option>
						          <option value="slideOutLeft">Slide Out Left</option>
						          <option value="slideOutRight">Slide Out Right</option>
						        </optgroup>
						        <optgroup label="Zoom">
						          <option value="zoomOut">Zoom Out</option>
						          <option value="zoomOutDown">Zoom Out Down</option>
						          <option value="zoomOutLeft">Zoom Out Left</option>
						          <option value="zoomOutRight">Zoom Out Right</option>
						          <option value="zoomOutUp">Zoom Out Up</option>
						        </optgroup>
							</select>
					    </div>
					</div>
				</div>
				{customSection}
				<div className="section-group--header">
					<h5>Sound Configuration</h5>
				</div>
				<div className="section-wrapper">
				    <div className="section-label">
				        <label htmlFor="sound">Alert Sound</label>
				    </div>
				    <div className="section-value">
				       <select 
							id="alert-sound"
							name="sfx"
							className={"selectInput" + ((this.isInvalid("sfx")) ? " invalid" : "")}
							title="Duration"
							onChange={this.handleDataChange}
							value={this.state.sfx}
						>
							<option value="001">SFX 1</option>
							<option value="002">SFX 2</option>
							<option value="003">SFX 3</option>
							<option value="004">SFX 4</option>
							<option value="005">SFX 5</option>
							<option value="006">SFX 6</option>
							<option value="007">SFX 7</option>
							<option value="008">SFX 8</option>
						</select>
						<div className="play-sound">
							<img src="https://res.cloudinary.com/phirehero/image/upload/v1563245261/play.png" onClick={this.playSound} />
						</div>
						<div className="hidden">
							<audio 
								preload="auto"
								src={audioSrc}
								ref={(audio) => this.audioRef = audio}
								volume={audioVolume}
							/>
						</div>
				    </div>
				</div>
				<div className="section-wrapper">
					<div className="section-label">
				        <label htmlFor="volume">Alert Volume</label>
				    </div>
				    <div className="section-value">
				       <input 
							id="alert-volume"
							name="volume"
							className={"sliderInput" + ((this.isInvalid("volume")) ? " invalid" : "")}
							title="Volume"
							onChange={this.handleDataChange}
							type="range"
							min={0}
							max={100}
							value={this.state.volume}
						/>
						<span>{this.state.volume}%</span>
				    </div>
				</div>
				<div className="section-wrapper">
					<div className="section-label">
				        <label htmlFor="duration">Alert Duration</label>
				    </div>
				    <div className="section-value">
				       <input 
							id="alert-duration"
							name="duration"
							className={"sliderInput" + ((this.isInvalid("duration")) ? " invalid" : "")}
							title="Duration"
							onChange={this.handleDataChange}
							type="range"
							min={1}
							max={8}
							value={this.state.duration}
						/>
						<span>{this.state.duration} seconds</span>
				    </div>
				</div>
				<div className="section-wrapper">
					<div className="section-label">
				        <label htmlFor="delay">Alert Delay</label>
				    </div>
				    <div className="section-value">
				       <input 
							id="alert-delay"
							name="delay"
							className={"sliderInput" + ((this.isInvalid("delay")) ? " invalid" : "")}
							title="Delay"
							onChange={this.handleDataChange}
							type="range"
							min={1}
							max={8}
							value={this.state.delay}
						/>
						<span>{this.state.delay} seconds</span>
				    </div>
				</div>

				<div className="section-wrapper full">
				    <div className="section-value">
				         <button type="button" onClick={this.testAlert}>Send Test Alert</button>
				    </div>
				</div>
				<LoadingSpinner isLoading={this.state.loading} full={true} />
			</div>
		)
	}

}