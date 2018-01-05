import React, {Component} from 'react';

export default class ListItem extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
            <div className="item" onClick={this.props.pickSong.bind(null, this.props.id)}>
				<span>{this.props.children}</span>
			</div>
		);
	}
}
