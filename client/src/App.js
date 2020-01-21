import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import DuckNavbar from "./components/Navbar.js";
import ProtectedRoute from "./components/protected/ProtectedRoute";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";


const backendPort = "localhost:3000";

const axios = require('axios').default;

const userId = "5e264d7302caf6abc735d32d";

class App extends Component {
  constructor(props){
    super(props);
    // TEMPORARY UNTIL GETUSERINFO WORKS
    this.state = {
      auth: {},
      users: [],
      posts: [],
      href: "/"
    };
  }

  fecthData = async () => {
    try {
      // get all users and posts to pass down to other components
      const usersResponse = await axios.get("/api/users/");
      this.setState({ users: usersResponse.data });

      const postsResponse = await axios.get("/api/posts/");
      this.setState({ posts: postsResponse.data });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = () => {
    const res = authenticate();
    if (!res.authenticated)
      this.setState({
        href: "/login"
      });
    // redirect to login if authentication is unsuccessful
    else {
      this.setState({ auth: res });
      this.fecthData();
    }
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    let should = false;

    if (this.state.auth !== nextState.auth) should = true;
    else if (this.state.users !== nextState.users) should = true;
    else if (this.state.posts !== nextState) should = true;

  componentDidMount(){
    this.getUserInfo();
  }

  render(){
    return (
      <Router>
        <ProtectedRoute path="/" component={DuckNavbar} auth={this.state.auth} />
        <Route exact path="/login">
          <Login auth={this.state.auth} />
        </Route>
        <Route exact path="/register">
          <Register auth={this.state.auth} />
        </Route>
      </Router>
    );
  }
}

export default App;
