require("dotenv").config({ path: "../CONFIG.env" });
const express = require("express");
const server = express();
const Product = require("../models/Product");
const connectDB = require("../connectDB");
const port = process.env.PRODUCT_PORT || 4001;

connectDB();

server.use(express.json());

server.get("/all", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

server.get("/single/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.json(product);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

server.listen(port, () => {
    console.log(`Product server started running on port: ${port}`);
});