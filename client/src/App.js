// Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// Utility
import { authenticate } from "./utils/auth";

// Components
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import DuckNavbar from "./components/Navbar.js";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

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
      const usersResponse = await axios.get("/api/users/");
      this.setState({users: usersResponse.data});

      const postsResponse = await axios.get("/api/posts/");
      this.setState({posts: postsResponse});

    }
    catch(err) {
     console.error(err) 
    }

  }

  componentDidMount = () => {
    const res = authenticate();
    if (!res.authenticated)
      window.location.href = "/login"; // redirect to login if authentication is unsuccessful
    else {
      this.setState({ auth: res.user });
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    let should = false;

    if (this.state.auth !== nextState.auth)
      should = true;
    else if (this.state.users !== nextState.users)
      should = true;
    else if (this.state.posts !== nextState)
      should = true;

    return should;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <DuckNavbar />
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
