import React from 'react';

export default class settings extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className = "drop-down-main settings">
					<div className = "drop-down-main-inner">
						<a href = "#">Settings</a>
						<hr />
						<div className = "not-item">
							<a href = "#">Change availablility</a>
						</div>
						<div className = "not-item">
							<a href = "#">Change contact details</a>
						</div>
						<div className = "not-item">
							<a href = "#">Change address</a>
						</div>
					</div>
					</div>
		);
	}
}
