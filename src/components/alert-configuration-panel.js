import React from 'react';
import axios from 'axios';

import './alert-configuration-panel.css';

export default class AlertConfigurationPanel extends React.Component {

	constructor(props) {
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

		this.state = {
			chat: overlay.chat || true,
			message: overlay.message || "",
			sfx: sfx,
			enterEffect: overlay.enterEffect || "easeIn",
			exitEffect: overlay.exitEffect || "easeOut",
			volume: overlay.volume || 100,
			duration: overlay.duration || 1,
			delay: overlay.delay || 2
		};
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
		this._overlayURL.select();
		document.execCommand("copy");
		document.getSelection().removeAllRanges();
	}

	testAlert = () => {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'api/channel/testOverlay', {
			withCredentials: true
		}).then((res) => {
			//popup message
		});
	}

	render() {
		let audioSrc = `/sounds/achievement.${this.state.sfx}.mp3`;
		let audioVolume = parseFloat(this.state.volume) / 100;

		let chatMessage;

		if(this.state.chat) {
			chatMessage = (
				<div className="section-wrapper">
				    <div className="section-label">
				        <label htmlFor="message">Chat Message</label>
				    </div>
				    <div className="section-value">
				       <input
							id="alert-message"
							name="message"
							className="textInput"
							type="text"
							value={this.state.message}
							placeholder="{user} just earned the {achievement} achievement! PogChamp"
							onChange={this.handleDataChange}
						/>
				    </div>
				</div>
			)
		} else {
			chatMessage = undefined;
		}

		return (
			<div className="alert-overlay">
				<h4>Alert Configuration</h4>
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
				       		<button type="button" onClick={this.copyOverlayURL}>Copy</button>
				       	</div>
				       	<div className="helpText">This URL is unique to you! Don't share it with anyone!</div>
				       	<div className="helpText">Place overlay full screen, positioning options coming soon!</div>
				    </div>
				</div>
				<div className="section-group">
					<div className="section-wrapper section--inline">
					    <div className="section-label">
					        <label htmlFor="chat">Alert in Chat?</label>
					    </div>
					    <div className="section-value">
					       <input
								id="alert-chat"
								name="chat"
								className="textInput"
								type="checkbox"
								checked={this.state.chat}
								value="chat"
								onChange={this.handleDataChange}
							/>
					    </div>
					</div>
					{/*chatMessage*/}
				</div>
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
			</div>
		)
	}

}