import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './tutorial-panel.css';

export default class InfoPanel extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
			<div className="tutorial-panel">
				<div className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={infoModal => (this.infoModal = infoModal)}>
						<div className="modal-header">
							<h3>Tutorials</h3>
						</div>
						<div className="modal-content">
							<Tabs>
								<TabList className="manage-tabs">
									<Tab className="manage-tab">Custom Achievements</Tab>
								</TabList>
								<TabPanel>
									<div className="video-content">
										<div className="video-section">
											<iframe width="480" height="270" src="https://www.youtube.com/embed/4JULGfd9LOs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
										</div>
									</div>
								</TabPanel>
							</Tabs>
							<div className="button-bank">
								<button className="tutorial-close-button" onClick={this.props.onClose}>Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

	}

}