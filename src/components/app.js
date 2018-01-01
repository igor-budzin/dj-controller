import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import uploadContainer from './upload/uploadContainer';
import controllerContainer from './controller/controllerContainer';
import '../assets/styles/main.scss';


export default class App extends Component {

	render() {
		return (
			<div className="app">
                <Switch>
                    <Route path='/upload' component={uploadContainer}/>
                    <Route path='/dj-controller' component={controllerContainer}/>
                </Switch>
			</div>
		);
	}

}
