import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Card, Button, Image, Form } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductDetailsPage = () => {
    const [qty, setQty] = useState(0);
    const [product, setProduct] = useState({
        image: "",
        name: "",
        description: "",
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0,
    });

    const { image, name, rating, numReviews, price, countInStock, description } = product;

    const productId = useParams().id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/products/single/${productId}`);

                setProduct(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <>
            <Link to={-1} className="btn btn-light my-3">Go Back</Link>
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
                            <Rating value={rating} text={`${numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: £{price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {description}
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
        </>
    )
};

export default ProductDetailsPage;