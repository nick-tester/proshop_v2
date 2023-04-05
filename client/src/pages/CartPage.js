import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { addToCart } from "../redux/actions/cartActions";
import Message from "../components/Message";

const CartPage = () => {
    const { id } = useParams();
    const { search } = useLocation();

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qty = search ? +search.split("=")[1] : 1;
    const productID = id ? id : undefined;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [productID, qty, dispatch]);

    return (
        <>
            <h1>cart page</h1><hr />
            {cartItems.map(item => {
                return <div key={item.product}>
                    <h4>{item.name}</h4>
                    <p>QTY: {item.qty}</p>
                </div>
            })}
        </>
    )
};

export default CartPage;