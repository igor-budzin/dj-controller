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
		if(this.state.leftFileArray.length > 0 && this.state.rightFileArray.length > 0) {
			this.props.leftAudioFiles.call(null, this.state.leftFileArray);
			this.props.rightAudioFiles.call(null, this.state.rightFileArray);
			this.setState({redirect: true});
		}
	}

	render() {
		let left = this.state.leftFileArray.length;
		let right = this.state.rightFileArray.length;

		return (
            <div>
				<div className="cf">
					<UploadList fileUpload={(fileArray) => this.setState({leftFileArray: fileArray})} />
					<UploadList fileUpload={(fileArray) => this.setState({rightFileArray: fileArray})} />
				</div>
				{
					this.state.redirect ?
					<Redirect to="/dj-controller" /> :
					<a
						onClick={this.handleStart.bind(this)}
						className={"start-btn" + (left && right ? '' : ' disable')}>
						Start playing
					</a>
				}
            </div>
		);
	}
}
