/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loading from "../components/Loading";
import CheckoutSteps from "../components/CheckoutSteps";
import addDecimals from "../assets/utils/addDecimals";
import { getOrderDetails } from "../redux/actions/orderActions";


const OrderPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, ...rest } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [id, dispatch]);

    return loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> : (
        <>
            <h1>Order no. {id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="address-box">
                            <h3 className="address-title">Shipping</h3>
                            <p className="address-line">
                                <span className="address-line--0">Address:</span>
                                <span className="address-line--1">{rest.shippingAddress.address},</span>
                                <span className="address-line--2">{rest.shippingAddress.city},</span>
                                <span className="address-line--3">{rest.shippingAddress.postcode},</span>
                                <span className="address-line--4">{rest.shippingAddress.country}</span>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item className="payment-method-box">
                            <h3 className="payment-method-title">Payment Method</h3>
                            <p className="payment-method-text">
                                <span className="payment-method-text--1">Method: </span>
                                <span className="payment-method-text--2">{rest.paymentMethod}</span>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {rest.orderItems.length === 0 ? <Message>Your cart is empty!</Message> : (
                                <ListGroup variant="flush">
                                    {rest.orderItems.map((item, index) => {
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
                                <Col>£{addDecimals(rest.itemsPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>£{addDecimals(rest.shippingPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>£{addDecimals(rest.taxPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>£{addDecimals(rest.totalPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
};

export default OrderPage;