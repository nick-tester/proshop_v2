import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { registerUser } from "../redux/actions/userActions";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const location = useLocation();
    const redirect = location && location.search ? location.search.split("=")[1] : null;

    const navTo = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navTo("/");
        }
    }, [navTo, userInfo]);

    const submitHandler = e => {
        e.preventDefault();
        if (name && email && password) {
            if (password === confirmPassword) {
                dispatch(registerUser(name, email, password))
            } else {
                setMessage("Passwords do not match!")
            };
        };
    };

    return <FormContainer>
        <h4>Register Form</h4>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter firstname surname"
                    value={name}
                    onChange={e => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="password2">
                <Form.Label>Cofirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">register</Button>
        </Form>
        <Row className="py-3">
            <Col>
                already registered? <Link to={redirect ? `/user/login?redirect=${redirect}` : "/user/login"}>login</Link>
            </Col>
        </Row>
    </FormContainer>
};

export default RegisterPage;