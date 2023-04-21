/* eslint-disable */
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";


const PlaceOrderPage = () => {
    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;

    return <Wrapper>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item className="address-box">
                        <h3 className="address-title">Shipping</h3>
                        <p className="address-line">
                            <span className="address-line--0">Address:</span>
                            <span className="address-line--1">{shippingAddress.address},</span>
                            <span className="address-line--2">{shippingAddress.city},</span>
                            <span className="address-line--3">{shippingAddress.postcode},</span>
                            <span className="address-line--4">{shippingAddress.country}</span>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="payment-method-box">
                        <h3 className="payment-method-title">Payment Method</h3>
                        <p className="payment-method-text">
                            <span className="payment-method-text--1">Method: </span>
                            <span className="payment-method-text--2">{paymentMethod}</span>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {cartItems.length === 0 ? <Message>Your cart is empty!</Message> : (
                            <ListGroup variant="flush">
                                {cartItems.map((item, index) => {
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
                {/* ORDER SUMMARY */}
            </Col>
        </Row>
    </Wrapper>
};

const Wrapper = styled.div`
    .address {
        
        &-box {}
        
        &-title {}

        &-line {
            > * {
                display: block;
            }
            
            &--0 {
                font-weight: 700;
                text-transform: uppercase;
                text-decoration: underline;
            }
        }
    }

    .payment-method {
        &-text {
            &--1 {
                font-weight: 700;
            }
            
            &--2 {
                text-transform: capitalize;
            }
        }
    }
`;

export default PlaceOrderPage;