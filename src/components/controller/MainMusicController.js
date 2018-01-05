import React, {Component} from 'react';
import {PlayButton, PauseButton, VolumeSlider, MuteToggleButton} from 'react-player-controls';

export default class MainMusicController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPlaying: false,
			volume: 0.8,
			isVolume: true,
			isMuted: false
		};
	}

	handleMute(isMuted) {
		isMuted ? Howler.mute(true) : Howler.mute(false);
		this.setState({isMuted: isMuted, isVolume: !isMuted});
	}

	handleVolume(volume) {
		this.setState({volume: volume}, () => {
			Howler.volume(this.state.volume);
		});
	}

	render() {
		return (
			<div className="main-music-controller">
				{
					this.state.isPlaying ?
					<PauseButton onClick={() => this.setState({isPlaying: false})} /> :
					<PlayButton isEnabled={true} onClick={() => this.setState({isPlaying: true})} />
				}
				<VolumeSlider
					isEnabled={this.state.isVolume}
					volume={this.state.volume}
					onVolumeChange={this.handleVolume.bind(this)}
				/>
				<MuteToggleButton
					isEnabled={true}
					isMuted={this.state.isMuted}
					onMuteChange={this.handleMute.bind(this)}
				/>
			</div>
		);
	}
}
