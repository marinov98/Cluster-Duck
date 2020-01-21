import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { logoutUser } from "./../utils/auth";

export default function DuckNavbar(props) {
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
          <Button onClick={logoutUser(props.history)}>Log Out</Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
