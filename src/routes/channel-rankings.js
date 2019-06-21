import React from 'react';

export default class ChannelRankings extends React.Component {
	
	constructor() {
		super();
	}

	render() {
		return (
			<Template spinner={{isLoading: this.state.loading, fullscreen: true}}>
				<div className="main-content">
					<ChannelList onLoad={this.listLoaded} />
				</div>
			</Template>
		)
	}

}