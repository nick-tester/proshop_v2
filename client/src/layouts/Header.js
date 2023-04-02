import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {

    return <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Proshop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                        {/* {profile ? (
                            <NavDropdown title={profile.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item>Signout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/signin">
                                <Nav.Link><FaUser /> sign-in</Nav.Link>
                            </LinkContainer>
                        )} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>;
};

export default Header;