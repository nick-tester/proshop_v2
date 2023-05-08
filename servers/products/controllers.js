const asyncHandler = require("express-async-handler");
const Product = require("./assets/models/Product");

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new Error("Product not found!");
    }

    res.json(product);
});

module.exports = { getProducts, getProductByID };