import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import {Redirect, browserHistory, Route, Router} from "react-router";
import Login from './login';
import App from './App';

const Root = () => (
  <Router history={browserHistory}>
     <div>
        <Route path="/login" component={Login}/>
        <Route path="/app/home" component={App}/>
        <Redirect from="/" to="/login"/>
     </div>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
