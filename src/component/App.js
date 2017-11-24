import React, { Component } from 'react';
import { logout } from '../helpers/auth';
import { browserHistory } from 'react-router';

const appTokenKey = "appToken";

export default class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: JSON.parse(localStorage.getItem("firebaseUser"));
    // };

    // console.log("User: ", this.state.user);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout().then(function () {
      localStorage.removeItem(appTokenKey);
      // this.props.history.push('/login');
      browserHistory.push('/login');
      console.log("User signed out from firebase.");
    });
  }

  render() {
    return <Home handleLogout={this.handleLogout}/>;
  }
}

const Home = ({handleLogout}) => (
  <div className="container">
    <p style={{ textAlign: 'center' }}>Welcome!</p>
    <button type="button" className="btn btn-primary btn-block"
      onClick={handleLogout}>
    Sign Out
    </button>
  </div>
);