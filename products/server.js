require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PRODUCT_PORT || 4001;
const products = require("./products");

server.use(express.json());

server.get("/getdata", (req, res) => {
    res.json(products);
});

server.listen(port, () => {
    console.log(`Product server started running on port: ${port}`);
});