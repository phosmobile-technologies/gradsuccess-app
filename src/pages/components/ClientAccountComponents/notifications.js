import React from 'react';

export default class notifications extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
					<div className = "drop-down-main notifications">
					<div className = "drop-down-main-inner">
						<span>Notifications</span>
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
			</div>
		);
	}
}
