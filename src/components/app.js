import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UploadContainer from './uploader/uploadContainer';
import ControllerContainer from './controller/controllerContainer';
import NotFoundContainer from './NotFoundContainer';
import '../assets/styles/main.scss';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leftAudioFiles: [],
			rightAudioFiles: []
		};
	}

	render() {
		return (
			<div className="app">
                <Switch>
                    <Route
						path='/upload'
						render={() =>
							<UploadContainer
								leftAudioFiles={(audioFiles) => this.setState({leftAudioFiles: audioFiles})}
								rightAudioFiles={(audioFiles) => this.setState({rightAudioFiles: audioFiles})}
							/>}
					/>
                    <Route
						path='/dj-controller'
						render={() =>
							<ControllerContainer
								
							/>}
					/>
					<Route path='/' exact={true} render={() => <Redirect to="/upload" />} />
					<Route path='*' exact={true} component={NotFoundContainer} />
                </Switch>
			</div>
		);
	}
}
