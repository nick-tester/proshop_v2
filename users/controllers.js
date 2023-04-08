const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("./assets/models/User");
const generateToken = require("./assets/utils/generateToken");

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

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    } else {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }

});

const registerUser = asyncHandler(async (req, res) => {
    const registerData = req.body;

    res.json(registerData);
});

module.exports = { authUser, registerUser, getUserProfile };