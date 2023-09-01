import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading, Message, Rating } from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";


const HomePage = () => {
    const { data: products, isLoading: loading, isError: error } = useGetProductsQuery();

    return <>
        <h2>Latest Cool Gadgets</h2>
        {loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> : (
            <Row>
                {products.map(product => {
                    return <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                        <Product product={product} />
                    </Col>
                })}+
            </Row>
        )}
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
                    <Card.Title as="div" className="product-title">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div" className="mb-2">
                    <Rating value={rating} text={numReviews} />
                </Card.Text>
                <Card.Text as="h3" className="h3-price">£{price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default HomePage