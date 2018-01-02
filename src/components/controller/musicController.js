import React, {Component} from 'react';
import {PlaybackControls, VolumeSlider, MuteToggleButton, ProgressBar, TimeMarker} from 'react-player-controls';

export default class MusicController extends Component {
	constructor() {
		super();
		this.state = {
			isPlayable: true,
			isPlaying: true,
			hasPrevious: false,
			hasNext: true,
			isVolume: true,
			volume: 0.8,
			isMuted: false,
			totalTime: 260,
			currentTime: 140
		};
	}

	render() {
		return (
			<div className={"music-controller " + this.props.side}>
				<div className="title">
					<span>The Killers - Somebody told me</span>
					<TimeMarker
						totalTime={this.state.totalTime}
						currentTime={this.state.currentTime}
						markerSeparator={' / '}
						firstMarkerType={this.state.firstMarkerType}
						secondMarkerType={this.state.secondMarkerType}
					/>
				</div>
				<ProgressBar
					totalTime={this.state.totalTime}
					currentTime={this.state.currentTime}
					isSeekable={true}
					onSeek={time => this.setState(() => ({ currentTime: time }))}
					onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
					onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
					onIntent={time => this.setState(() => ({ lastIntent: time }))}
				/>
				<div className="volume-bar">
					<MuteToggleButton
						isEnabled={true}
						isMuted={this.state.isMuted}
						onMuteChange={isMuted => this.setState({isMuted: isMuted, isVolume: !isMuted})}
					/>
					<VolumeSlider
						isEnabled={this.state.isVolume}
						volume={this.state.volume}
						onVolumeChange={volume => this.setState({ ...this.state, volume })}
					/>
				</div>
				<PlaybackControls
					isPlayable={this.state.isPlayable}
					isPlaying={this.state.isPlaying}
					showPrevious={true}
					hasPrevious={this.state.hasPrevious}
					showNext={true}
					hasNext={this.state.hasNext}
					onPlaybackChange={isPlaying => this.setState({ ...this.state, isPlaying })}
					onPrevious={() => alert('Go to previous')}
					onNext={() => alert('Go to next')}
				/>
			</div>
		);
	}
}
