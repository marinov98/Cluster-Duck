// Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Utility
import { authenticate } from "./utils/auth";

// Components
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import DuckNavbar from "./components/Navbar.js";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UserProfile from "./components/profile/UserProfile";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Leaderboard from "./components/Leaderboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      users: [],
      posts: []
    };
  }

  fecthData = async () => {
    try {
      // get all users and posts to pass down to other components
      const usersResponse = await axios.get(
        "https://cluster-duck-server.herokuapp.com/api/users/"
      );
      this.setState({ users: usersResponse.data });

      const postsResponse = await axios.get(
        "https://cluster-duck-server.herokuapp.com/api/posts/"
      );
      this.setState({ posts: postsResponse.data });
    } catch (err) {
      console.error(err);
    }
  };

  refreshToken = async () => {
    if (typeof Storage === "undefined")
      throw new Error("Browser does not support local storage!");

    try {
      if (localStorage["accessToken"]) {
        console.log("a refresh is being attempted...");
        const token = localStorage["accessToken"];

        const { email } = jwt_decode(token);

        const currentTime = Date.now() / 1000 - 60; // current time in seconds minue 1 minute

        // pull user from db
        const response = await axios.get(
          `https://cluster-duck-server.herokuapp.com/api/users/user/${email}`
        );

        // check if token has expired and if a user contains a refresh token
        if (
          userInfo.exp < currentTime &&
          response.data.refreshToken &&
          response.data.refreshToken !== ""
        ) {
          const {
            data: { newToken }
          } = await axios.post(
            "https://cluster-duck-server.herokuapp.com/api/auth/token",
            { refreshToken: response.data.refreshToken }
          );

          // remove old token and replace with new one
          if (newToken) {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", newToken);

            // set axios headers
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("a refresh just occured...");
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = () => {
    // check if token needs to be refreshed every 15 minutes
    this.interval = setInterval(() => this.refreshToken(), 900000);
  };

  getAuth = authInfo => {
    if (authInfo) this.setState({ auth: authInfo });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    let should = false;

    if (this.state.auth !== nextState.auth) should = true;
    else if (this.state.users !== nextState.users) should = true;
    else if (this.state.posts !== nextState) should = true;

    return should;
  };

  render() {
    const isAuth = authenticate();
    return (
      <Router>
        <ProtectedRoute
          path="/"
          getAuth={this.getAuth}
          component={DuckNavbar}
          auth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/profile/:email"
          auth={isAuth}
          component={UserProfile}
        />
        <ProtectedRoute
          exact
          path="/leaderboard"
          auth={isAuth}
          component={Leaderboard}
        />
        <Route exact path="/login">
          <Login getAuth={this.getAuth} auth={isAuth} />
        </Route>
        <Route exact path="/register">
          <Register auth={isAuth} />
        </Route>
      </Router>
    );
  }
}

export default App;
