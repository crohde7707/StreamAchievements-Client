import React from 'react';

export default class AlertConfigurationPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	handleDataChange = (evt) => {

	}

	isInvalid = (field) => {
		if(this.state.valid && typeof this.state.valid[field] === 'boolean' && !this.state.valid[field]) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		return (
			<div className="alert-overlay">
				<h4>Alert Configuration</h4>
				<div className="section-wrapper">
					<div className="section-label">
				        <label htmlFor="duration">Alert Duration</label>
				    </div>
				    <div className="section-value">
				       <select 
							id="alert-duration"
							name="duration"
							className={"selectInput" + ((this.isInvalid("duration")) ? " invalid" : "")}
							title="Duration"
							onChange={this.handleDataChange}
							value={this.state.duration}
						>
							<option value="4">4 sec.</option>
							<option value="6">6 sec</option>
							<option value="8">8 sec</option>
						</select>
				    </div>
				</div>
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
							<option value="1">SFX 1</option>
							<option value="2">SFX 2</option>
							<option value="3">SFX 3</option>
							<option value="4">SFX 4</option>
							<option value="5">SFX 5</option>
							<option value="6">SFX 6</option>
						</select>
				    </div>
				</div>
			</div>
		)
	}

}