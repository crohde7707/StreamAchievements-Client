import React from 'react';

import './alert-configuration-panel.css';

export default class AlertConfigurationPanel extends React.Component {

	constructor(props) {
		super(props);

		let overlay = props.overlay || {};

		this.state = {
			chat: overlay.chat || true,
			message: overlay.message || "",
			sound: overlay.sound || "001",
			enterEffect: overlay.enterEffect || "easeIn",
			exitEffect: overlay.exitEffect || "easeOut",
			volume: overlay.volume || 100,
			duration: overlay.duration || 1
		};
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

		if(this.state.valid && !this.state.valid[name]) {
			stateUpdate.valid = {
				[name]: true
			};
		}

		this.setState(stateUpdate);
	}

	isInvalid = (field) => {
		if(this.state.valid && typeof this.state.valid[field] === 'boolean' && !this.state.valid[field]) {
			return true;
		} else {
			return false;
		}
	}

	playSound = () => {
		console.log(this.audioRef);
		this.audioRef.play();
	}

	copyOverlayURL = () => {
		this._overlayURL.select();
		document.execCommand("copy");
		document.getSelection().removeAllRanges();
	}

	render() {
		let audioSrc = `/sounds/achievement.${this.state.sound}.mp3`;
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
				<div className="section-wrapper">
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
				       		/>
				       		<button type="button" onClick={this.copyOverlayURL}>Copy</button>
				       	</div>
				       	<div className="helpText">This URL is unique to you! Don't share it with anyone!</div>
				    </div>
				</div>
				<div className="section-group">
					<div className="section-wrapper">
					    <div className="section-label">
					        <label htmlFor="message">Alert in Chat?</label>
					    </div>
					    <div className="section-value">
					       <input
								id="alert-message"
								name="chat"
								className="textInput"
								type="checkbox"
								checked={this.state.chat}
								value="chat"
								onChange={this.handleDataChange}
							/>
					    </div>
					</div>
					{chatMessage}
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
								<option value="easeIn">Ease In</option>
								<option value="fadeIn">Fade In</option>
								<option value="zoomIn">Zoom In</option>
								<option value="slideIn-Top">Slide In</option>
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
								<option value="easeOut">Ease Out</option>
								<option value="fadeOut">Fade Out</option>
								<option value="zoomOut">Zoom Out</option>
								<option value="slideOut-Top">Slide Out</option>
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
							name="sound"
							className={"selectInput" + ((this.isInvalid("sound")) ? " invalid" : "")}
							title="Duration"
							onChange={this.handleDataChange}
							value={this.state.sound}
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
			</div>
		)
	}

}