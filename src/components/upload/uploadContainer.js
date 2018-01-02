import React, {Component} from 'react';
import UploadList from './uploadList';
import {Redirect} from "react-router-dom";

export default class UploadContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			leftFileArray: [],
			rightFileArray: []
		};
	}

	handleStart(files) {
		console.log("Start ...");

		const reader = new FileReader();



		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');

		console.log("Redirect ...");
		// this.setState({redirect: true});
	}

	render() {
		return (
            <div>
				<div className="cf">
					<UploadList fileUpload={(fileArray) => this.setState({leftFileArray: fileArray})} />
					<UploadList fileUpload={(fileArray) => this.setState({rightFileArray: fileArray})} />
				</div>
				{
					this.state.redirect ?
					<Redirect to="/dj-controller" /> :
					<a onClick={this.handleStart.bind(this)} className="start-btn">Start playing</a>
				}
            </div>
		);
	}
}
