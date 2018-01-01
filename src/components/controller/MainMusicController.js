import React, {Component} from 'react';
import {PlayButton, PauseButton, VolumeSlider, MuteToggleButton} from 'react-player-controls';

export default class MainMusicController extends Component {
	constructor() {
		super();
		this.state = {
			isPlaying: false,
			volume: 0.8,
			isVolume: true,
			isMuted: false
		};
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
					onVolumeChange={volume => this.setState({...this.state, volume})}
				/>
				<MuteToggleButton
					isEnabled={true}
					isMuted={this.state.isMuted}
					onMuteChange={isMuted => {this.setState({isMuted: isMuted, isVolume: !isMuted})}}
				/>
			</div>
		);
	}
}
