import React, {Component} from 'react';
import UploadList from './uploadList';

export default class UploadContainer extends Component {

	render() {
		return (
            <div>
                <UploadList />
                <UploadList />
            </div>
		);
	}

}
