import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import { Redirect, browserHistory, Route, Router } from 'react-router';
import LoginContainer from './container/LoginContainer';
import HomeContainer from './container/HomeContainer';

const Root = () => (
  <Router history={browserHistory}>
     <div>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/app/home" component={HomeContainer}/>
        <Redirect from="/" to="/login"/>
     </div>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
