import React, {Component} from 'react';
import MainMusicController from './mainMusicController';
import MusicController from './musicController';
import {Redirect} from "react-router-dom";
import Howler from 'howler';

export default class ControllerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			leftAduioController: null,
			rightAudioController: null
		};

	}

	handleBack() {
		this.setState({redirect: true});
	}

	handleLeftCtrl(ctrl) {
		this.setState({leftAudioController: ctrl});
	}

	handleRightCtrl(ctrl) {
		this.setState({rightAudioController: ctrl});
	}

	render() {
		return (
			<div>
				<div className="cf">
					<MusicController side="left" playList={this.props.leftAudioFiles} audioController={this.handleLeftCtrl.bind(this)} />
					<MainMusicController leftAudioController={this.state.leftAudioController} rightAudioController={this.state.rightAudioController} />
					<MusicController side="right" playList={this.props.rightAudioFiles} audioController={this.handleRightCtrl.bind(this)} />
				</div>
				{
					this.state.redirect ?
					<Redirect to="/upload" /> :
					<a
						onClick={this.handleBack.bind(this)}
						className="start-btn">
						Upload new playlist
					</a>
				}
			</div>
		);
	}
}
