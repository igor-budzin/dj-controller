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
			hasNext: false,
			isVolume: true,
			volume: 0.8,
			isMuted: false,
			totalTime: 260,
			currentTime: 140,
			playListBuffer: [],
			currentIndex: 0
		};

		this.audioController = null;
	}

	playSong() {
		this.setState({isPlaying: true});
		if(this.audioController === null) {
			this.audioController = new Howl({
				src: [this.state.playListBuffer[this.state.currentIndex]]
			});
		}
		this.audioController.play();
	}

	pauseSong() {
		this.setState({isPlaying: false});
		this.audioController.pause();
	}

	stopSong() {
		this.setState({isPlaying: false});
		this.audioController.stop();
	}

	nextSong() {
		this.setState({currentIndex: this.state.currentIndex + 1}, () => {
			this.audioController = new Howl({
				src: [this.state.playListBuffer[this.state.currentIndex]]
			});
			this.setState({isPlaying: true});
			this.audioController.play();

			if(this.props.playList.length - 1 === this.state.currentIndex) {
				this.setState({hasNext: false});
			}
		});
	}

	prevSong() {

	}

	handlePlayPause() {
		if(this.state.isPlaying) this.pauseSong();
		else this.playSong();
	}

	handleNext() {
		this.stopSong();
		this.nextSong();
	}

	componentDidUpdate() {
		if(this.audioController !== null) {
			this.audioController.on('end', () => {
				this.stopSong();
				if(this.props.playList.length - 1 !== this.state.currentIndex) {
					this.nextSong();
				}
			});
		}
	}

	componentDidMount() {
		const _this = this;

		this.props.playList.forEach((file, index) => {
			const reader = new FileReader();
			reader.onload = () => {
				_this.setState({playListBuffer: [...this.state.playListBuffer, reader.result]});
				console.log(this.state.playListBuffer);
			}
			reader.readAsDataURL(this.props.playList[index]);
		});

		if(this.props.playList.length > 1) {
			this.setState({hasNext: true});
		}
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
					onPlaybackChange={this.handlePlayPause.bind(this)}
					onPrevious={() => alert('Go to previous')}
					onNext={this.handleNext.bind(this)}
				/>
			</div>
		);
	}
}
