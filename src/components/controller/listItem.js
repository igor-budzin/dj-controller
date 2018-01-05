import React, {Component} from 'react';

export default class ListItem extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
            <div className="item">
				<span>{this.props.children}</span>
			</div>
		);
	}
}
