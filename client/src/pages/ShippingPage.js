/* eslint-disable */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";


const ShippingPage = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("");

    const navto = useNavigate();

    const { userInfo } = useSelector(state => state.userLogin);

    React.useEffect(() => {
        if (!userInfo) {
            navto("/");
        }
    }, [navto, userInfo]);

    const submitHandler = e => {
        e.preventDefault();
        console.log({ address, city, postcode, country });
    };

    return <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    required
                    onChange={e => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    required
                    onChange={e => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="postcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your postcode"
                    value={postcode}
                    required
                    onChange={e => setPostcode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    required
                    onChange={e => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
};

export default ShippingPage;