import React from 'react';

import './alert-configuration-panel.css';

export default class AlertConfigurationPanel extends React.Component {

	constructor(props) {
		super(props);

		let alert = props.alert || {};

		this.state = {
			message: alert.message || "",
			sound: alert.sound || "001",
			volume: alert.volume || 100,
			duration: alert.duration || 1
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

	render() {
		let audioSrc = `/sounds/achievement.${this.state.sound}.mp3`;
		let audioVolume = parseFloat(this.state.volume) / 100;

		return (
			<div className="alert-overlay">
				<h4>Alert Configuration</h4>
				<div className="section-wrapper">
				    <div className="section-label">
				        <label htmlFor="message">Alert Message</label>
				    </div>
				    <div className="section-value">
				       <input
							id="alert-message"
							name="message"
							className="textInput"
							type="text"
							value={this.state.message}
							onChange={this.handleDataChange}
						/>
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