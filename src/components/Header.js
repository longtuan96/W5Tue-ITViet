import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Header = () => {
  return (
    <div>
      <Navbar bg={"dark"} variant={"dark"}>
        <Navbar.Brand className="mr-auto">
          <img src={logo} alt="CoderSchool" width="50px" />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} exact to="/jobs">
            Jobs
          </Nav.Link>
          <Nav.Link as={Link} exact to="/login">
            Login
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
