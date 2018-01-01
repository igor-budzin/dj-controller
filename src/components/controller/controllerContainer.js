import React, {Component} from 'react';
import MainMusicController from './mainMusicController';
import MusicController from './musicController';

export default class ControllerContainer extends Component {
	render() {
		return (
			<div>
				<MusicController />
				<MainMusicController />
				<MusicController />
			</div>
		);
	}
}
