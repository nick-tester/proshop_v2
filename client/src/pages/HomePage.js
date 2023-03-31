import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("/products/all");

                setProducts(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    return <>
        <h4>Home Page</h4>
        <Row>
            {products.map(product => {
                return <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                    <Product product={product} />
                </Col>
            })}
        </Row>
    </>
};

const Product = ({ product }) => {
    const { _id, image, name, rating, numReviews, price } = product;
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <span>{rating} stars from {numReviews} review</span>
                </Card.Text>
                <Card.Text as="h3" className="h3-price">£{price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default HomePage