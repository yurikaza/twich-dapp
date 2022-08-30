import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

declare let window: any;

interface State {
  userName: string;
  category: string;
}

interface Props {}

export class UserNavbar extends React.Component<Props, State> {
  render(): React.ReactNode {
    return (
      <header>
        {window.ethereum.selectedAddress === undefined ? (
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/profile">profile</Link>
                  </Nav.Link>
                  <Link to="/profile/createLiveStream">
                    <Nav.Link>createLiveStream</Nav.Link>
                  </Link>
                  <Link to="/allUsers">
                    <Nav.Link>allUsers</Nav.Link>
                  </Link>
                  <Link to="/createUserName">
                    <Nav.Link>createUserName</Nav.Link>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/profile">profile</Link>
                  </Nav.Link>
                  <Link to="/profile/createLiveStream">
                    <Nav.Link>createLiveStream</Nav.Link>
                  </Link>
                  <Link to="/allUsers">
                    <Nav.Link>allUsers</Nav.Link>
                  </Link>
                  <Link to="/createUserName">
                    <Nav.Link>createUserName</Nav.Link>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </header>
    );
  }
}
