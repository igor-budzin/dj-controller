import React, {Component} from 'react';

export default class ListItem extends Component {

	shouldComponentUpdate(nextProps) {
		return this.props.currentClass !== nextProps.currentClass;
	}

	render() {
		return (
            <div
				className={"item " + this.props.currentClass}
				onClick={this.props.pickSong.bind(null, this.props.id)}>
				<span>{this.props.children}</span>
			</div>
		);
	}
}
