import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import DuckNavbar from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  
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
        </Switch>
      </Router>
    );
  }
}

export default App;
