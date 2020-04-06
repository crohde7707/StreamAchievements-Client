import React from 'react';

export default class TooltipWrapper extends React.Component {

	constructor() {
		super();

		this.state = {
			showActionText: false
		}
	}

	tooltipClicked = () => {
		this.setState({
			showActionText: true
		});

		if(this.props.onClick) {
			this.props.onClick();
			this._tooltip.focus();
		}

		setTimeout(() => {
			this.setState({
				showActionText: false
			})
		}, 1000);
	}

	render () {
		let tooltipClasses = "tooltip";
		let tooltipText = this.props.hoverText;

		if(this.state.showActionText) {
			tooltipClasses += " copied"
			if(this.props.actionText) {
				tooltipText = this.props.actionText;
			}
		}

		return (
			<div className={tooltipClasses}>
				<span href="javascript:;" onClick={this.tooltipClicked} ref={(el) => this._tooltip = el}>
					<span className="tooltiptext">{tooltipText}</span>
					{this.props.children}
				</span>
			</div>
		)
	}
}