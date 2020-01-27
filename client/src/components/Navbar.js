import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, Button } from "reactstrap";
import { logoutUser } from "./../utils/auth";

class LogOut extends Component {
  handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      this.props.logoutUser();
      this.props.getAuth({ authenticated: false });
    }
  };

  render() {
    return (
      <Button color="primary" onClick={this.handleLogout}>
        Log Out
      </Button>
    );
  }
}

export default function DuckNavbar(props) {
  return (
    <Nav>
      <Navbar light expand="md">
        <NavbarBrand href="/">
          ClusterDuck
          <span role="img" aria-label="duck">
            🦆
          </span>
        </NavbarBrand>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/leaderboard">Leaderboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/chat">Chat</NavLink>
        </NavItem>
        <LogOut getAuth={props.getAuth} logoutUser={logoutUser} />
      </Navbar>
    </Nav>
  );
}
