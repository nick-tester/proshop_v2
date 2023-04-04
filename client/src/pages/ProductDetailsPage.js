import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductDetailsPage = () => {
    const [qty, setQty] = useState(1);
    const [readMore, setReadMore] = useState(false);
    const { id: productID } = useParams();

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;

    const { image, name, rating, numReviews, price, brand, description = "", countInStock } = product;

    useEffect(() => {
        dispatch(detailsProduct(productID));
    }, [productID, dispatch]);

    return (
        <>
            <Link to={-1} className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={image} alt={name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Brand: {brand}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={rating} text={`${numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: £{price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {readMore ? description : description.substring(description.length - 50, -0)}
                                <Link onClick={() => setReadMore(!readMore)} style={{ color: "blue" }}> read {readMore ? "less" : "more"}</Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>
                                            <strong>£{price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty: </Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={e => setQty(e.target.value)}
                                                >
                                                    {[...Array(countInStock).keys()].map(x => {
                                                        return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    })}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={countInStock < 1}
                                        onClick={() => console.log("Clicked!")}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
};

export default ProductDetailsPage;