import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, cartRemoveItem } from "../redux/actions/cartActions";
import Message from "../components/Message";

const CartPage = () => {
    const { id: productID } = useParams();
    const { search } = useLocation();

    const dispatch = useDispatch();
    const navTo = useNavigate();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qty = search ? +search.split("=")[1] : 1;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [productID, qty, dispatch]);

    const checkoutHandler = () => {
        navTo("/login?redirect=shipping");
    };

    const removeItemHandler = id => {
        dispatch(cartRemoveItem(id));
    };

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty!
                        <Link to="/"> Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => {
                            const { product, image, name, price, qty, countInStock } = item;
                            return (
                                <ListGroupItem key={product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={image} alt={name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${product}`}>{name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            £{price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={e => dispatch(addToCart(product, +e.target.value))}>
                                                {[...Array(+countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => removeItemHandler(product)}
                                            ><FaTrash color="red" /></Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) item{cartItems.length > 1 && "s"}</h2>
                            £{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button onClick={checkoutHandler} className="btn-block" disabled={cartItems.length === 0}>checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
};

export default CartPage;