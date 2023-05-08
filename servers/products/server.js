require("dotenv").config();
const express = require("express");
const connectDB = require("./assets/connectDB");
const { notFound, errorCatcher } = require("./assets/middlewares/errorHandlers");
const { getProducts, getProductByID } = require("./controllers");
const port = process.env.PRODUCT_PORT || 4001;

const server = express();
connectDB("Product");

server.use(express.json());

server.get("/all", getProducts);

server.get("/single/:id", getProductByID);

server.use(notFound);

server.use(errorCatcher);

server.listen(port, () => {
    console.log(`Product server running in ${process.env.NODE_ENV} mode on port: ${port}...`);
});