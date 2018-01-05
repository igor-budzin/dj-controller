import React, {Component} from 'react';
import {PlaybackControls, VolumeSlider, MuteToggleButton, ProgressBar, TimeMarker} from 'react-player-controls';


export default class MusicController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			songName: '',
			isPlayable: true,
			isPlaying: false,
			hasPrevious: false,
			hasNext: false,
			isVolume: true,
			volume: 0.8,
			isMuted: false,
			totalTime: 0,
			currentTime: 0,
			playListBuffer: [],
			currentIndex: 0
		};

		this.timer = null;
		this.audioController = null;
	}

	handleVolume(volume) {
		this.setState({volume: volume}, () => {
			if(this.audioController !== null) {
				this.audioController.volume(this.state.volume);
			}
		});
	}

	handleMute(isMuted) {
		isMuted ? this.audioController.mute(true) :	this.audioController.mute(false);
		this.setState({isMuted: isMuted, isVolume: !isMuted});
	}

	firstInit() {
		this.audioController = new Howl({
			src: [this.state.playListBuffer[this.state.currentIndex].audioData]
		});

		this.setState({
			totalTime: Math.floor(this.audioController.duration()),
			songName: this.state.playListBuffer[this.state.currentIndex].name,
			hasNext: this.state.currentIndex !== this.props.playList.length - 1 ? true : false
		});

	}

	playSong() {
		this.setState({isPlaying: true});
		this.audioController = new Howl({
			src: [this.state.playListBuffer[this.state.currentIndex].audioData]
		});
		this.audioController.play();
		this.audioController.once('load', () => {
			this.setState({
				totalTime: Math.floor(this.audioController.duration()),
				songName: this.state.playListBuffer[this.state.currentIndex].name,
				hasNext: this.state.currentIndex !== this.props.playList.length - 1 ? true : false,
				hasPrevious: (this.state.currentIndex - 1) >= 0 ? true : false
			});
		});
		this.timer = setInterval(() => {
			if(this.audioController.playing()) {
				this.setState({currentTime:  Math.floor(this.audioController.seek())});
			}
		}, 1000);
	}

	pauseSong() {
		this.setState({isPlaying: false});
		this.audioController.pause();
		clearInterval(this.timer);
	}

	stopSong() {
		this.setState({isPlaying: false});
		this.audioController.stop();
		this.audioController = new Howl({
			src: [this.state.playListBuffer[this.state.currentIndex]]
		});
		this.audioController.play();
	}

	handlePlayPause() {
		if(this.state.isPlaying) this.pauseSong();
		else this.playSong();
	}

	handlePrevBtn() {
		this.audioController.stop();
		this.setState({currentIndex: this.state.currentIndex - 1}, () => {
			this.playSong();
		});
	}
	
	handleNextBtn() {
		this.audioController.stop();
		this.setState({currentIndex: this.state.currentIndex + 1}, () => {
			this.playSong();
		});
	}

	componentWillMount() {
		const _this = this;

		this.props.playList.forEach((file, index) => {
			const reader = new FileReader();
			reader.onload = () => {
				let bufferItem = {
					name: file.name.slice(0, -4),
					audioData: reader.result
				};
				setTimeout(() => {
					_this.setState({playListBuffer: [...this.state.playListBuffer, bufferItem]}, () => {
						this.audioController = new Howl({
							src: [this.state.playListBuffer[this.state.currentIndex].audioData]
						});
						if(this.state.playListBuffer.length === this.props.playList.length) {
							this.firstInit();
						}
					});
				}, 0);
			}
			reader.readAsDataURL(this.props.playList[index]);
		});
	}

	render() {
		return (
			<div className={"music-controller " + this.props.side}>
				<div className="title">
					<span>{this.state.songName}</span>
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
					onSeek={time => this.setState({ currentTime: time }, () => {
						this.audioController.seek(this.state.currentTime)
					})}
					onSeekStart={time => this.setState({ lastSeekStart: time })}
					onSeekEnd={time => this.setState({ lastSeekEnd: time })}
					onIntent={time => this.setState({ lastIntent: time })}
				/>
				<div className="volume-bar">
					<MuteToggleButton
						isEnabled={true}
						isMuted={this.state.isMuted}
						onMuteChange={this.handleMute.bind(this)}
					/>
					<VolumeSlider
						isEnabled={this.state.isVolume}
						volume={this.state.volume}
						onVolumeChange={this.handleVolume.bind(this)}
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
					onPrevious={this.handlePrevBtn.bind(this)}
					onNext={this.handleNextBtn.bind(this)}
				/>
			</div>
		);
	}
}
