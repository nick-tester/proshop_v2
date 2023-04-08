const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("./assets/models/User");
const generateToken = require("./assets/utils/generateToken");

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

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Unauthorized, access denied!");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const registerData = req.body;

    res.json(registerData);
});

module.exports = { getUsers, getUserByID, authUser, registerUser };