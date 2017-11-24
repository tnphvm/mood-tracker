import React, { Component } from 'react'
import { loginWithGoogle } from "../helpers/auth";
import { firebaseAuth } from "../config/firebaseConfig";
import { Login } from '../component/Login'
import { browserHistory } from 'react-router';

// const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.authListener = this.authListener.bind(this);
  }

  handleGoogleLogin() {
    loginWithGoogle()
    .catch(function (error) {
      console.log(error);
      this.setState({
        loaded: true
      });
    });

    this.setState({
      loaded: false
    });
  }

  authListener() {
    this.firebaseListener = firebaseAuth().onAuthStateChanged(user => {
      console.log("I'm called");
      if (user) {
        console.log("User signed in: ", JSON.stringify(user));

        localStorage.setItem(appTokenKey, user.uid);
        browserHistory.push('/app/home');
      }
      else {
        this.setState({
          loaded: true
        });
      }
    });
  }

  componentWillMount() {
    console.log('Mounting');
    
    // Check if user has signed in before
    if (localStorage.getItem(appTokenKey)) {
      browserHistory.push('/app/home');
      return;
    }

    this.authListener();
  }

  componentWillUnmount() {
    this.handleGoogleLogin = undefined;
    this.firebaseListener && this.firebaseListener();
    this.authListener = undefined;
  }

  render() {
    console.log("Rendering");
    if (!this.state.loaded)
      return (<SplashScreen />);

    return (<Login handleGoogleLogin={this.handleGoogleLogin} />);
  }
}

const SplashScreen = () => (<p style={{ textAlign: 'center' }}>Loading...</p>);