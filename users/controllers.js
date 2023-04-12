const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("./assets/models/User");
const generateToken = require("./assets/utils/generateToken");

// @desc    Login user
// @route   POST /api/v1/users/auth
// @access  Public
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
        throw new Error("Invalid credentials, access denied!");
    }
});

// @desc    Get user profile
// @route   GET /api/v1/users/auth/profile
// @access  Private
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

// @desc    Update user profile
// @route   PUT /api/v1/users/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    } else {
        user.name = req.body.name || user.name;

        if (req.body.email) {
            const emailExist = await User.findOne({ email: req.body.email });

            if (emailExist) {
                res.status(401)
                throw new Error("This email is already taken!");
            } else {
                user.email = req.body.email;
            }
        }

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        };

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    }
});

// @desc    Register user
// @route   POST /api/v1/users/auth/profile
// @access  Public
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

module.exports = { authUser, registerUser, getUserProfile, updateUserProfile };