const asyncHandler = require("express-async-handler");
const Order = require("./assets/models/Order");

const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    };
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error("Order not found");
    };
});

const getOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    if (orders) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error("No orders found")
    }
});

module.exports = { createOrder, getOrderById, getOrdersByUserId };