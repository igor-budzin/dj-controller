import React, {Component} from 'react';
import {PlaybackControls, VolumeSlider, MuteToggleButton, ProgressBar, TimeMarker} from 'react-player-controls';
import Howler from 'howler';

export default class MusicController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPlayable: true,
			isPlaying: false,
			hasPrevious: false,
			hasNext: true,
			isVolume: true,
			volume: 0.8,
			isMuted: false,
			totalTime: 260,
			currentTime: 140,
			playList: []
		};

		this.audioController = null;
	}

	handlePlay() {
		console.log(this.audioController);
		if(this.state.isPlaying) {
			this.audioController.pause();
			this.setState({isPlaying: false});
		}
		else {
			this.audioController.play(this.audioController);
			this.setState({isPlaying: true});
		}
	}

	handleNext() {
		console.log("ds");
		// this.audioController.stop();
		// this.audioController.next(1);
	}

	componentDidMount() {
		this.setState({
			playList: this.props.playList
		}, () => {
			let tempArr = [];
			this.state.playList.forEach((file, index) => {
				const reader = new FileReader();
				reader.onload = () => {
					tempArr.push(reader.result);
					this.audioController = new Howl({
						src: tempArr
					});
					console.log(tempArr);
				}
				reader.readAsDataURL(this.state.playList[index]);
			})


		});
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
					onPlaybackChange={this.handlePlay.bind(this)}
					onPrevious={() => alert('Go to previous')}
					onNext={this.handleNext.bind(this)}
				/>
			</div>
		);
	}
}
