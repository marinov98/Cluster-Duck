import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, Button } from "reactstrap";
import { logoutUser } from "./../../utils/auth";

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

export default function DuckNavbar({
  getAuth,
  auth: {
    user: { email }
  }
}) {
  return (
    <div>
      <Navbar
        style={{
          zIndex: "999999",
          width: "100%",
          position: "fixed",
          borderBottom: "2px solid lightgrey"
        }}
        color="light"
        light
        expand="md"
      >
        <NavbarBrand href="/">
          ClusterDuck
          <span role="img" aria-label="duck">
            🦆
          </span>
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href={`/profile/${email}`}>Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/chat">Chat</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/feed">Feed</NavLink>
          </NavItem>
          <LogOut getAuth={getAuth} logoutUser={logoutUser} />
        </Nav>
      </Navbar>
    </div>
  );
}
