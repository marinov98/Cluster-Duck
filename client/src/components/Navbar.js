import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default function DuckNavbar() {
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
      </Nav>
    </Navbar>
  );
}
