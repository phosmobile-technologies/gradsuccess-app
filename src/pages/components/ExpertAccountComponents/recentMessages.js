import React from 'react';

export default class recentMessages extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className = "drop-down-main recentMessages">
					<div className = "drop-down-main-inner">
						<span>Recent Messages</span>
						<hr />
						<div className = "not-item">
							<span>Meeting for 25th, March 2019</span>
							<p>Ipsum has been the industry's standard dummy text ever since the 1500s</p>
						</div>
						<div className = "not-item">
							<span>Skype Call tommorow</span>
							<p>Ipsum has been the industry's standard dummy text ever since the 1500s</p>
						</div>
						<div className = "not-item">
							<span>Concluding phone call</span>
							<p>Ipsum has been the industry's standard dummy text ever since the 1500s</p>
						</div>
					</div>
					</div>
		);
	}
}
