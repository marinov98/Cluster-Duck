import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./components/auth/Login.js"
import Register from "./components/auth/Register.js"
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
