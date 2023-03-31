import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
    const productId = useParams().id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/products/single/${productId}`);

                console.log(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h4> ProductPage component  </h4>
        </>
    )
};

export default ProductDetailsPage;