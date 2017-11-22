import React, { Component } from 'react'
import './css/login.css';
import { loginWithGoogle } from "./helpers/auth";
import { firebaseAuth } from "./config/firebaseConfig";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class Login extends Component {
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

    return (<LoginPage handleGoogleLogin={this.handleGoogleLogin} />);
  }
}

const SplashScreen = () => (<p>Loading...</p>);
const LoginPage = ({handleGoogleLogin}) => (
  <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-5" id="login-mod">
        <h2>Login</h2>
        <button type="button" className="btn btn-danger btn-block" onClick={handleGoogleLogin}>
          <span className="fa fa-google fa-fw"></span> 
          Sign in with Google
        </button>
        <button type="button" className="btn btn-primary btn-block">
          <span className="fa fa-facebook fa-fw"></span>
          Sign in with Facebook
        </button>
      </div>
    </div>
  </div>
);