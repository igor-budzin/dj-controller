import React, {Component} from 'react';
import {PlaybackControls, VolumeSlider, MuteToggleButton, ProgressBar, TimeMarker} from 'react-player-controls';
import Slider from 'react-rangeslider';
import UploadList from './uploadList';

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
			currentIndex: 0,
			rate: 1.0,
			loader: true
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

	handleRate(value) {
		this.setState({rate: parseFloat(value.toFixed(2), 10)}, () => {
			this.audioController.rate(value);
		})
	}

	firstInit() {
		this.audioController = new Howl({
			src: [this.state.playListBuffer[this.state.currentIndex].audioData],
			html5: true,
			format: ['mp3']
		});

		this.props.audioController(this.audioController);

		this.audioController.on('load', () => {
			this.setState({
				totalTime: Math.floor(this.audioController.duration()),
				songName: this.state.playListBuffer[this.state.currentIndex].name,
				hasNext: this.state.currentIndex !== this.props.playList.length - 1 ? true : false,
				loader: false
			});
		});
	}

	playSong() {
		this.setState({isPlaying: true, isPaused: false});
		this.audioController = new Howl({
			src: [this.state.playListBuffer[this.state.currentIndex].audioData],
			html5: true,
			format: ['mp3']
		});
		this.props.audioController(this.audioController);
		this.audioController.on('load', () => {
			this.setState({
				totalTime: Math.round(this.audioController.duration()),
				songName: this.state.playListBuffer[this.state.currentIndex].name,
				hasNext: this.state.currentIndex !== this.props.playList.length - 1 ? true : false,
				hasPrevious: this.state.currentIndex !== 0 ? true : false,
				loader: false
			});
		});

		this.audioController.seek(this.state.currentTime);
		this.audioController.rate(this.state.rate);
		this.audioController.play();
		this.audioController.on('end', this.handleEnd.bind(this));

		this.timer = setInterval(() => {
			if(this.audioController.playing()) {
				this.setState({
					currentTime:  Math.round(this.audioController.seek()),
					loader: false
				});
			}
		}, 1000);
	}

	pauseSong() {
		this.setState({isPlaying: false});
		this.audioController.pause();
		clearInterval(this.timer);
	}

	handleStop() {
		this.setState({
			isPlaying: false,
			currentTime: 0
		});
		this.audioController.stop();
		clearInterval(this.timer);
	}

	handlePlayPause() {
		if(this.state.isPlaying) this.pauseSong();
		else this.playSong();
	}

	handlePrevBtn() {
		this.audioController.stop();
		this.setState({
			currentIndex: this.state.currentIndex - 1,
			currentTime: 0,
			loader: true
		}, () => {
			this.playSong();
		});
	}

	handleNextBtn() {
		this.audioController.stop();
		this.setState({
			currentIndex: this.state.currentIndex + 1,
			currentTime: 0,
			loader: true
		}, () => {
			this.playSong();
		});
	}

	pickSong(index) {
		this.audioController.stop();
		this.setState({
			currentIndex: index,
			currentTime: 0,
			loader: true
		}, () => {
			this.playSong();
		});
	}

	handleEnd() {
		if(this.props.playList.length !== this.state.currentIndex + 1) {
			this.setState({
				currentIndex: this.state.currentIndex + 1,
				currentTime: 0,
				loader: true
			}, () => {
				this.playSong();
			});
		}
	}

	componentWillMount() {
		const _this = this;

		this.props.playList.forEach((file, index) => {
			let bufferItem = {
				name: file.name.slice(0, -4),
				audioData: file.preview
			};
			setTimeout(() => {
				_this.setState({playListBuffer: [...this.state.playListBuffer, bufferItem]}, () => {
					if(this.state.playListBuffer.length === this.props.playList.length) {
						this.firstInit();
					}
				});
			}, 0);
		});
	}

	render() {
		return (
			<div className={"music-controller " + this.props.side}>
				<div>
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
					<div className="slider">
						<Slider
							min={0.5}
							max={4.0}
							step={0.05}
							value={this.state.rate}
							onChange={this.handleRate.bind(this)}
						/>
					</div>
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
					<div className="play-controls-wrap">
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
					<div className="stop-button" onClick={this.handleStop.bind(this)}></div>
				</div>
				{
					this.state.playListBuffer.length === this.props.playList.length ?
					<UploadList pickSong={this.pickSong.bind(this)} currentIndex={this.state.currentIndex} files={this.state.playListBuffer} /> : ''
				}
				<div className={"loader-wrap" + (this.state.loader ? '' : ' none')}>
					<div className="loading-dots">
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
						<div className="loading-dots__dot"></div>
					</div>
				</div>
			</div>
		);
	}
}
