/* eslint-disable */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartActions";


const ShippingPage = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "");
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
    const [postcode, setPostcode] = useState(shippingAddress ? shippingAddress.postcode : "");
    const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : "");

    const navto = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLogin);

    React.useEffect(() => {
        if (!userInfo) {
            navto("/");
        }
    }, [navto, userInfo]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postcode, country }));
        navto("/payment");
    };

    return <FormContainer>
        <CheckoutSteps step1 step2 />
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