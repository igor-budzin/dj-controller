import React, {Component} from 'react';
import ListItem from './listItem';

export default class UploadList extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div className="upload-list">
				{
					this.props.files.map((file, index) => {
						return (
							<ListItem
								pickSong={this.props.pickSong}
								currentClass={this.props.currentIndex === index ? 'current' : ''}
								id={index} key={file.name + index}>
								{file.name}
							</ListItem>
						)
					})
				}
			</div>
		);
	}
}
