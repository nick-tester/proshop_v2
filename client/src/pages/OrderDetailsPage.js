/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loading from "../components/Loading";
import addDecimals from "../assets/utils/addDecimals";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";


const OrderDetailsPage = () => {
    const [sdkReady, setSdkReady] = useState(false);
    const orderiIdParam = useParams().id;

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/v1/orders/config/paypal");

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
        }

        if (!order || order._id !== orderiIdParam || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderiIdParam));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        };
    }, [orderiIdParam, order, dispatch, successPay]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderiIdParam, paymentResult));
    };

    if (loading) {
        return <Loading />
    };

    if (error) {
        return <Message variant="danger">{error}</Message>
    };

    return <Wrapper>
        <h1>Order no. {orderiIdParam}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item className="address-box">
                        <h3 className="address-title">Shipping</h3>
                        <span className="address-line">Address: </span>
                        <span>{order.user.name}</span>
                        <span className="address-line">
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </span>
                        <span className="address-line">{order.shippingAddress.address},</span>
                        <span className="address-line">{order.shippingAddress.city},</span>
                        <span className="address-line">{order.shippingAddress.postcode},</span>
                        <span className="address-line">{order.shippingAddress.country}</span>
                        {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">not yet delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <span>Method: </span>
                        <span className="payment-method">{order.paymentMethod}</span>
                        {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">not paid</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {order.orderItems.length === 0 ? <Message>Your cart is empty!</Message> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => {
                                    return <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>£{addDecimals(order.itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>£{addDecimals(order.shippingPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>£{addDecimals(order.taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>£{addDecimals(order.totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loading />}
                            {!sdkReady ? <Loading /> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                            )}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Col>
        </Row>
    </Wrapper>
};

const Wrapper = styled.div`
    .address-line {
        display: block;
    }

    .payment-method {
        text-transform: capitalize;
    }
`;

export default OrderDetailsPage;