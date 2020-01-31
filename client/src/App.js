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
import DuckNavbar from "./components/navbar/Navbar.js";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UserProfile from "./components/profile/UserProfile";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Feed from "./components/feed/Feed";
import Post from "./components/post/Post";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      users: [],
      posts: []
    };
  }

  refreshToken = async () => {
    if (typeof Storage === "undefined")
      throw new Error("Browser does not support local storage!");

    try {
      if (localStorage["accessToken"]) {
        const token = localStorage["accessToken"];

        const { email } = jwt_decode(token);

        // pull user from db
        const response = await axios.get(`/api/users/user/${email}`);

        // check if token has expired and if a user contains a refresh token
        if (response.data.refreshToken && response.data.refreshToken !== "") {
          const {
            data: { newToken }
          } = await axios.post("/api/auth/token", {
            refreshToken: response.data.refreshToken
          });

          // remove old token and replace with new one
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            // set axios headers
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = async () => {
    // check if token needs to be refreshed every 2 minutes
    try {
      setInterval(async () => {
        await this.refreshToken();
      }, 120000);
    } catch (err) {
      console.error(err);
    }
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
          path="/post/:postid"
          auth={isAuth}
          component={Post}
        />
        <ProtectedRoute
          exact
          path="/leaderboard"
          auth={isAuth}
          component={Leaderboard}
        />
        <ProtectedRoute exact path="/" auth={isAuth} component={Feed} />
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
