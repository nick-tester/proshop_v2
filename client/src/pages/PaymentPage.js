/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartActions";


const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("paypal");

    const navto = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!userInfo) {
            navto("/user/login");
        };
        if (!shippingAddress) {
            navto("/shipping");
        };
    }, [navto, userInfo, shippingAddress]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navto("/placeorder");
    };

    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type="radio"
                        label="PayPal/Credit Card"
                        id="PayPal"
                        name="paymentMethod"
                        value="paypal"
                        checked
                        onChange={e => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                    <Form.Check
                        type="radio"
                        label="Stripe"
                        id="stripe"
                        name="paymentMethod"
                        value="stripe"
                        onChange={e => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
};

export default PaymentPage;