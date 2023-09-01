import React from "react";
// import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../redux/actions/userActions";
import Logo from "../assets/css/logo.png";

const Header = () => {
    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;

    // const navto = useNavigate();
    // const dispatch = useDispatch();

    // const logoutHandler = () => {
    //     dispatch(logoutUser());
    //     // window.location.reload(false);
    //     navto("/");

    return <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={Logo} alt="logo" />
                        Proshop
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                        {/* {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/user/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/user/login">
                                <Nav.Link><FaUser /> login </Nav.Link>
                            </LinkContainer>
                        )} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>;
};

export default Header;