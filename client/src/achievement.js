import React from 'react';
import PropTypes from 'prop-types';

class Achievement extends React.Component {
	static propTypes = {
		info: PropTypes.shape({
			title: PropTypes.string,
			icon: PropTypes.string,
			description: PropTypes.string,
			percentage: PropTypes.string
		})
	};

	render() {

		let {title, description, icon, percentage} = this.props.info;

		return (
			<li className="achievement">
				<div className="achievement-icon">
        			<img src={require('./img/' + icon)} />
        		</div>
        		<div className="achievement-info">
        			<span className="achievement-title">{title}</span>
        			<span className="achievement-description">{description}</span>
        		</div>
        		<div className="achievement-cap">
        			<img src={require('./img/achievement-cap.png')} />
        		</div>
        	</li>
		);
	}
}

export default Achievement;