import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const navTo = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: updateLoading, success, error: errorLoading, userInfo: userInfoUpdate } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navTo("/user/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(userInfo.name);
                setEmail(userInfo.email);
            }
        }
    }, [dispatch, navTo, userInfo, user, success]);

    const submitHandler = e => {
        e.preventDefault();

        if (password && (password !== confirmPassword)) {
            setMessage("Passwords do not match!")
        }

        dispatch(updateUserProfile({ name, email, password }));
    };

    return <>
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Your profile has been updated!</Message>}
                {loading && <Loading />}
                {updateLoading && <Loading />}
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
                    <Button type="submit" variant="primary">update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>my orders</h2>
            </Col>
        </Row>
    </>
};

export default ProfilePage;