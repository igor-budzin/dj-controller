import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import ListItem from './listItem';

export default class UploadList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadFiles: []
		};
	}

	handleRemove(preview) {
		const newFiles = this.state.uploadFiles.filter((file) => {
			return file.preview !== preview;
		});
		this.setState({
			uploadFiles: newFiles
		}, () => {
			this.props.fileUpload(this.state.uploadFiles);
		});
	}

	onDrop(acceptedFiles, rejectedFiles) {
		const files = [...this.state.uploadFiles, ...acceptedFiles];
		this.setState({
			uploadFiles: files
		}, () => {
			this.props.fileUpload(this.state.uploadFiles);
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.uploadFiles.length !== nextState.uploadFiles.length;
	}

	render() {
		const _handleRemove = this.handleRemove.bind(this);
		return (
			<div className="upload-list">
				<Dropzone className="drop-zone" onDrop={this.onDrop.bind(this)} accept="audio/mp3">
					<span>drag & drop</span>
					<p>or click here</p>
				</Dropzone>
				{
					this.state.uploadFiles.map((file) => {
						return (
							<ListItem
								key={file.preview}
								preview={file.preview}
								onRemove={_handleRemove}>
								{file.name}
							</ListItem>
						)
					})
				}
			</div>
		);
	}
}
