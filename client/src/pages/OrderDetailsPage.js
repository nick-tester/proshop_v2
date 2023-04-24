/* eslint-disable */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Message from "../components/Message";
import Loading from "../components/Loading";
import addDecimals from "../assets/utils/addDecimals";
import { getOrderDetails } from "../redux/actions/orderActions";


const OrderDetailsPage = () => {
    const orderiIdParam = useParams().id;

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    useEffect(() => {
        if (!order || order._id !== orderiIdParam) {
            dispatch(getOrderDetails(orderiIdParam));
        };
    }, [orderiIdParam, order, dispatch]);

    if (loading) {
        return <Loading />
    };

    if (error) {
        return <Message variant="danger">{error}</Message>
    };

    const {
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
        user,
        paymentMethod,
        shippingAddress,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = order;

    return <Wrapper>
        <h1>Order no. {orderiIdParam}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item className="address-box">
                        <h3 className="address-title">Shipping</h3>
                        <span className="address-line">Address: </span>
                        <span>{user.name}</span>
                        <span className="address-line">
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </span>
                        <span className="address-line">{shippingAddress.address},</span>
                        <span className="address-line">{shippingAddress.city},</span>
                        <span className="address-line">{shippingAddress.postcode},</span>
                        <span className="address-line">{shippingAddress.country}</span>
                        {isDelivered ? <Message variant="success">Delivered on {deliveredAt}</Message> : <Message variant="danger">not yet delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <span>Method: </span>
                        <span className="payment-method">{paymentMethod}</span>
                        {isPaid ? <Message variant="success">Paid on {paidAt}</Message> : <Message variant="danger">not paid</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {orderItems.length === 0 ? <Message>Your cart is empty!</Message> : (
                            <ListGroup variant="flush">
                                {orderItems.map((item, index) => {
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
                            <Col>£{addDecimals(itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>£{addDecimals(shippingPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>£{addDecimals(taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>£{addDecimals(totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
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