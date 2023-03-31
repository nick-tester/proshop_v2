require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PRODUCT_PORT || 4001;
const products = require("./assets/products");

server.use(express.json());

server.get("/all", (req, res) => {
    res.send(products);
});

server.get("/single/:id", (req, res) => {
    const productId = req.params.id;

    const product = products.find(p => p._id === productId);

    res.send(product);
});

server.listen(port, () => {
    console.log(`Product server started running on port: ${port}`);
});