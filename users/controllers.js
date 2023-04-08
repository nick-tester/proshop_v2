const asyncHandler = require("express-async-handler");
const User = require("./assets/models/User");

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new Error("User not found!");
    }

    res.json(user);
});

module.exports = { getUsers, getUserByID };