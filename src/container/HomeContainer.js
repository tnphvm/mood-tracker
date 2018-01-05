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
    let date = e.target.getAttribute("id");

    e.target.setAttribute("bgcolor", currMood);
    this.saveChanges(date, currMood);
  };

  getMonth(monthNum) {
    if (monthNum < 1 || monthNum > 12) return -1;

    let months = {
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "Jun",
      "7": "Jul",
      "8": "Aug",
      "9": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    };

    return months[monthNum];
  }

  saveChanges = (date, cellColor) => {
    let currDate = date.split("-");
    let month = currDate[0];
    let day = currDate[1];

    if (!cellColor) cellColor = null;
    month = this.getMonth(month);
    if (month === -1) return;

    this.firebaseRef = database.ref("coloredDates");
    this.firebaseRef.child(month + "-" + this.state.user.uid).update({
      [day]: cellColor
    });
  };

  verifyUser = () => {
    let key = localStorage.getItem(appTokenKey);
    this.firebaseRef = database.ref("users/" + key);

    this.firebaseRef.once(
      "value",
      dataSnapshot => {
        if (dataSnapshot.val()) {
          let userObj = dataSnapshot.val();
          userObj["uid"] = key;

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

    console.log(this.state.user.uid);

    return (
      <div>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle btn-prof"
            type="button"
            data-toggle="dropdown"
          >
            <span className="fa fa-user" />
          </button>
          <div className="dropdown-menu">
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
