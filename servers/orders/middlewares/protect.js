const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../assets/models/User");

config();

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized, access denied!")
    }

    if (token && token.startsWith("Bearer")) {
        try {
            const newToken = token.split(" ")[1];
            const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            console.error(err);
            res.status(404);
            throw new Error("Unauthorized, access denied!");
        }
    }

});

module.exports = protect;