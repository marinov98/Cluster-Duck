import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const DuckNavbar = props => {
  if (props.loggedIn) {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">
          ClusterDuck
          <span role="img" aria-label="duck">
            🦆
          </span>
        </NavbarBrand>
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
          <NavItem>
            <NavLink href="#">Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  } else {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">
          ClusterDuck
          <span role="img" aria-label="duck">
            🦆
          </span>
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
};

export default DuckNavbar;
