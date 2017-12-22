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
    console.log(e.target.getAttribute("bgcolor"));
    e.target.setAttribute("bgcolor", currMood);
    // alert(e.target);
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
    this.handleLogout = undefined;
    this.firebaseRef.off();
  }

  render() {
    if (!this.state.loaded) return <SplashScreen />;

    console.log(this.state.user);
    return (
      <Home
        updateMood={this.updateCurrentMood}
        handleLogout={this.handleLogout}
        user={this.state.user}
        colorHandler={this.changeCellColor}
      />
    );
  }
}

const SplashScreen = () => (
  <p style={{ textAlign: "center" }}>Loading user data...</p>
);
