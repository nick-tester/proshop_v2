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
    const { name, email, password } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
        res.status(400);
        throw new Error("This email is already taken.");
    }

    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    });

    res.status(201)
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    });
});

module.exports = { authUser, registerUser, getUserProfile };