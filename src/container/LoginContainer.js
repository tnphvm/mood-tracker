import React, { Component } from 'react'
import { loginWithGoogle } from "../helpers/auth";
import { firebaseAuth } from "../config/firebaseConfig";
import { Login } from '../component/Login'

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: false
    };

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin() {
    loginWithGoogle()
    .catch(function (error) {
      alert(error);
      localStorage.removeItem(firebaseAuthKey);
    });

    localStorage.setItem(firebaseAuthKey, "1");
  }

  componentWillMount() {
    if (localStorage.getItem(firebaseAuthKey) == '1')
      localStorage.removeItem(firebaseAuthKey);
    
    // Check for token and redirect if one exists
    if (localStorage.getItem(appTokenKey)) {
      this.props.history.push('/app/home');
      return;
    }

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        console.log("User signed in: ", JSON.stringify(user));

        localStorage.removeItem(firebaseAuthKey);
        localStorage.setItem(appTokenKey, user.uid);

        this.props.history.push('/app/home');
      }
    });
  }

  render() {
    console.log(firebaseAuthKey + " = " + localStorage.getItem(firebaseAuthKey));
    if (localStorage.getItem(firebaseAuthKey) == '1')
      return (<SplashScreen />);

    return (<Login handleGoogleLogin={this.handleGoogleLogin} />);
  }
}

const SplashScreen = () => (<p>Loading...</p>);