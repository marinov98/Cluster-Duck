import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./components/auth/Login.js"
import Register from "./components/auth/Register.js"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap"
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
    <Switch>
      <Route path="/login">
        <Navbar light expand="md">
          <NavbarBrand href="/">ClusterDuck 🦆</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/leaderboard">Leaderboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/chat">Chat</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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
