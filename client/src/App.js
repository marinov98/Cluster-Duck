import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import DuckNavbar from "./components/Navbar.js";
import UserProfile from "./components/profile/UserProfile.js";
import "bootstrap/dist/css/bootstrap.min.css";


const backendPort = "localhost:3000";

const axios = require('axios').default;

const userId = "5e264d7302caf6abc735d32d";

class App extends Component {
  constructor(props){
    super(props);
    // TEMPORARY UNTIL GETUSERINFO WORKS
    this.state = {
      user: {
        userId: "5e264d7302caf6abc735d32d",
        username: "joshuaaaa",
        email: "joshwinton@joshwinton.com",
        firstName: "Josh",
        lastName: "Winton",
      }
    };
  }

  getUserInfo() {
    axios.get(`${backendPort}/api/user/${this.state.userId}`)
    .then((res) => {
      console.log(res);
    });
  }

  componentDidMount(){
    this.getUserInfo();
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <DuckNavbar loggedIn={true} />
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <UserProfile />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
