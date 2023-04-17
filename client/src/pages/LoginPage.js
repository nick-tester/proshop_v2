import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../redux/actions/userActions";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const query = useLocation();
    const redirect = query ? query.search.split("=")[1] : null;

    const navTo = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navTo(`/${redirect ? redirect : "user/profile"}`);
        }
    }, [navTo, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginUser(email, password))
        }
        if (!email || !password) {
            setMessage("Please enter email/password.")
        }
    };

    return <FormContainer>
        <h4>Login Details</h4>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
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
            <Button type="submit" variant="primary">login</Button>
        </Form>
        <Row className="py-3">
            <Col>
                New customer? <Link to={redirect ? `/user/register?redirect=${redirect}` : "/user/register"}>register</Link>
            </Col>
        </Row>
    </FormContainer>
};

export default LoginPage;