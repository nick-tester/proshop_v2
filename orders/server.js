const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./assets/connectDB");
const { errorCatcher, notFound } = require("./middlewares/errorHandlers");
const server_routes = require("./server_routes");

config();

connectDB("Order");

const server = express();

server.use(express.json());

server.use("/", server_routes);

server.use(notFound);
server.use(errorCatcher);

const port = process.env.ORDER_PORT || 5003;
server.listen(port, () => console.log(`Order server running in ${process.env.NODE_ENV} mode on port ${port}...`));