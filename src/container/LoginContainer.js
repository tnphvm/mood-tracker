import React, { Component } from 'react'
import { loginWithGoogle, loginWithFb } from "../helpers/auth";
import { firebaseAuth, database } from '../config/firebaseConfig';
import { Login } from '../component/Login'
import { browserHistory } from 'react-router';

const appTokenKey = "appToken";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };

    this.firebaseRef = database.ref('users');
    this.handleLogin = this.handleLogin.bind(this);
    this.authListener = this.authListener.bind(this);
  }

  handleLogin(e) {
    let provider = e.target.id;

    if (provider === 'googleBtn')  {
      loginWithGoogle()
      .catch(function (error) {
        console.log(error);
        this.setState({
          loaded: true
        });
      });
    }
    else if (provider === 'fbBtn') {
      loginWithFb()
      .catch(function (error) {
        console.log(error);
        this.setState({
          loaded: true
        });
      });
    }

    this.setState({
      loaded: false
    });
  }

  addUser(user) {
    let photoURL = user.photoURL;
    if (user.providerData[0].providerId === 'facebook.com')
      photoURL = "https://graph.facebook.com/" + user.providerData[0].uid
        + "/picture?height=500";

    this.firebaseRef.child(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      avatar: photoURL,
      verified: user.emailVerified
    });
  }

  authListener() {
    this.firebaseListener = firebaseAuth().onAuthStateChanged(user => {
      console.log("I'm called");
      if (user) {
        console.log("User signed in: ", JSON.stringify(user));

        localStorage.setItem(appTokenKey, user.uid);
        this.addUser(user);
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
    this.firebaseRef.off();
  }

  render() {
    console.log("Rendering");
    if (!this.state.loaded)
      return (<SplashScreen />);

    return (<Login handleLogin={this.handleLogin} />);
  }
}

const SplashScreen = () => (<p style={{ textAlign: 'center' }}>Loading...</p>);