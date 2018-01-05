import React, {Component} from 'react';
import MainMusicController from './mainMusicController';
import MusicController from './musicController';
import Howler from 'howler';

export default class ControllerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<MusicController side="left" playList={this.props.leftAudioFiles} />
				<MainMusicController />
				<MusicController side="right" playList={this.props.rightAudioFiles} />
			</div>
		);
	}
}
