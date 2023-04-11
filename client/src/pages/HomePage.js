import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const { userInfo } = useSelector(state => state.userLogin);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch, userInfo]);

    return <>
        <h4>Home Page</h4>
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