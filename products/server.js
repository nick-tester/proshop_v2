require("dotenv").config();
const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("./assets/models/Product");
const connectDB = require("./assets/connectDB");
const { notFound, errorCatcher } = require("./assets/middlewares/errorHandlers");
const port = process.env.PRODUCT_PORT || 4001;

const server = express();
connectDB("Product");

server.use(express.json());

server.get("/all", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

server.get("/single/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new Error("Product not found!");
    }

    res.json(product);
}));

server.use(notFound);

server.use(errorCatcher);

server.listen(port, () => {
    console.log(`Product server running in ${process.env.NODE_ENV} mode on port: ${port}`);
});