import React, { Component } from "react";
import { logout } from "../helpers/auth";
import { browserHistory } from "react-router";
import { database } from "../config/firebaseConfig";
import { Home } from "../component/Home";

const appTokenKey = "appToken";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      user: null,
      currMood: ""
    };
  }

  // Maybe not the best practice, but quick solution
  // Ref: https://stackoverflow.com/questions/46487031/handlers-inside-a-component-invoking-eachothers-code-by-mistake
  updateCurrentMood = color => e => {
    this.setState({
      currMood: color
    });
  };

  changeCellColor = e => {
    let currMood = this.state.currMood;
    e.target.setAttribute("bgcolor", currMood);
  };

  verifyUser = () => {
    this.firebaseRef = database.ref(
      "users/" + localStorage.getItem(appTokenKey)
    );
    this.firebaseRef.on(
      "value",
      dataSnapshot => {
        if (dataSnapshot.val()) {
          let userObj = dataSnapshot.val();
          this.setState({
            user: userObj,
            loaded: true
          });
        }
      },
      () => {
        alert("User not authorized.");
        browserHistory.push("/login");
      }
    );
  };

  componentWillMount() {
    console.log("mounting");
    this.verifyUser();
  }

  handleLogout = () => {
    logout().then(function() {
      localStorage.removeItem(appTokenKey);
      browserHistory.push("/login");
      console.log("User signed out from firebase.");
    });
  };

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    if (!this.state.loaded) return <SplashScreen />;

    return (
      <div>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            <span className="fa fa-user" />
          </button>
          <div class="dropdown-menu">
            <h3 style={{ textAlign: "center" }}>
              {this.state.user.displayName}
            </h3>
            <img
              src={this.state.user.avatar}
              alt={this.state.user.displayName}
              id="prof-pic"
            />
            <button
              type="button"
              className="btn btn-danger btn-block"
              style={{ borderRadius: 0 }}
              onClick={this.handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="container h-100">
          <Home
            state={this}
            updateMood={this.updateCurrentMood}
            handleLogout={this.handleLogout}
            user={this.state.user}
            colorHandler={this.changeCellColor}
          />
        </div>
      </div>
    );
  }
}

const SplashScreen = () => (
  <p style={{ textAlign: "center" }}>Loading user data...</p>
);
