import React from 'react';
import '../css/login.css';

export const Login = ({handleGoogleLogin}) => (
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