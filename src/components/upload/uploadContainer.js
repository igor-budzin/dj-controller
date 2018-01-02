import React, {Component} from 'react';
import UploadList from './uploadList';
import {Redirect} from "react-router-dom";

export default class UploadContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false
		};
	}

	handleStart() {
		console.log("Start ...");

		

		console.log("Redirect ...");
		this.setState({redirect: true});
	}

	render() {
		return (
            <div>
				<div className="cf">
					<UploadList />
					<UploadList />
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
