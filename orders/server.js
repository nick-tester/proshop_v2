const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./assets/connectDB");
const { createOrder, getOrderById } = require("./controllers");
const protect = require("./middlewares/protect");

config();

connectDB("Order");

const server = express();

server.use(express.json());

server.post("/create", protect, createOrder);

server.get("/get/:id", protect, getOrderById);

const port = process.env.ORDER_PORT || 5003;
server.listen(port, () => console.log(`Order server running in ${process.env.NODE_ENV} mode on port ${port}...`));