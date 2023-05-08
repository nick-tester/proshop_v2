const express = require("express");
const protect = require("./middlewares/protect");
const {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrderToPaid
} = require("./server_controllers");

const Router = express.Router();

Router.post("/create", protect, createOrder);

Router.get("/get/:id", protect, getOrderById);

Router.get("/user", protect, getOrdersByUserId);

Router.put("/order/:id/pay", protect, updateOrderToPaid);

module.exports = Router;