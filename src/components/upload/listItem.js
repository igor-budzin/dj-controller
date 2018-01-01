import React, {Component} from 'react';

export default class ListItem extends Component {

	render() {
		return (
            <div className="item">
				<span>{this.props.children}</span>
				<div className="options">
					<a
                        href="#" 
                        className="remove"
                        onClick={this.props.onRemove.bind(null, this.props.preview)}>
                    </a>
				</div>
			</div>
		);
	}

}
